class GamesDB {
	constructor(playerData) {
		this.playerData = playerData;
		this.loaded = false;
		this.games = [];
		this.fillingDB = 0;

		for (let i = 0; i <= kMaxGameLevels;++i) {
			this.games.push([]);
		}
	}

	dumpPokerGamesInLevel(level) {
	}

	createPracticePokerGames() {
	}

	loadPokerGames() {
		console.log("GamesDB.loadPokerGames()");
		let games = this.games;
		let playerData = this.playerData;
		return new Promise(function(resolve,reject) {
			// Get open games from cloud
			PokerCloud.getOpenGames(playerData.playerId)
				.then(function(data) {
					if (data != null) {
						let newGames = [];
						console.log("getOpenGames returned " + data.length + " games.");
						data.forEach(function(game) {
							if (game.level >= 0 && game.level <= kMaxGameLevels) {
								games[game.level].push(game);
								newGames.push(game.gameNo);
							} else {
								console.log("Invalid level received: " + game.level);
								game.dump();
							}
						});
						// Get hands of open games from cloud
						PokerCloud.getHandsFromGames(newGames)
							.then(function(data) {
								if (data != null) {
									data.forEach(function(hand) {
										if (hand.gameLevel >=0 && hand.gameLevel <= kMaxGameLevels) {
											games.forEach(function(game) {
												if (game.gameNo == hand.gameNo) {
													game.hands[hand.handNo] = hand;
												}
											});
										} else {
											console.log("Invalid level received: " + hand.gameLevel);
											hand.dump();
										}
									});
								} else {
									console.log("No hands from open games.");
								}
								resolve(games);
							})
							.catch(function(err) {
								console.log("ERR: loadPokerGames():",err);
								reject(err);
							});
					} else {
						console.log("No open games from cloud.");
						resolve(null);
					}
				})
				.catch(function(err) {
					console.log("ERR: loadPokerGames():",err);
					reject(err);
				});
		});
	}

	fillPokerGamesInLevel(level,maxGamesToOpen) {
		let games = this.games;
		let playerData = this.playerData;
		let myself = this;
		let gamesOpened = 0;

		myself.fillingDB++;

		console.log("Too few open games in level ",level,". Need ",maxGamesToOpen," more.");
		PokerCloud.getOtherOpenGames(this.playerData.playerId,level,maxGamesToOpen)
			.then(function(data) {

				if (data != null) {
					console.log("getOtherOpenGames returned ",data.length," games.");
					let newGames = [];
					data.forEach(function(game) {
						if (game.level >= 0 && game.level <= kMaxGameLevels) {
							games[game.level].push(game);
							newGames.push(game.gameNo);
						} else {
							console.log("Invalid level received: " + game.level);
							game.dump();
						}
					});

					// Get hands of new games from cloud
					PokerCloud.getHandsFromGames(newGames)
						.then(function(data) {
							if (data != null) {
								data.forEach(function(hand) {
									if (hand.gameLevel >=0 && hand.gameLevel <= kMaxGameLevels) {
										games.forEach(function(game) {
											if (game.gameNo == hand.gameNo) {
												game.hands[hand.handNo] = hand;
											}
										});
									} else {
										console.log("Invalid level received: " + hand.gameLevel);
										hand.dump();
									}
								});
							} else {
								console.log("No hands from open games.");
							}
							myself.fillingDB--;
						})
						.catch(function(err) {
							console.log("ERR: getHandsFromGames():",err);
							myself.fillingDB--;
						});

				// No other games from cloud, create new ones
				} else {
					console.log("getOtherOpenGames returned 0 games, creating new ones...");
					let lastGame = new GameData();
					PokerCloud.getLastGame(lastGame)
						.then(function(data) {
							let gameNo = (data == null) ? 1 : data.gameNo + 1;
							for (let i = 0; i < maxGamesToOpen; ++i) {
								let newGame = new GameData(gameNo+i);
								newGame.inviter = playerData.playerId;
								newGame.level = level;
								newGame.playerId = playerData.playerId;
								newGame.theme = playerData.theme;
								myself.fillingDB++;
								PokerCloud.createNewGame(newGame)
									.then(function(data) {
										newGame.gameId = data.objectId;
										newGame.createdAt = data.createdAt;
										newGame.updatedAt = data.updatedAt;
										games[level].push(newGame);
										myself.fillingDB--;
									})
									.catch(function(err) {
										console.log("ERR: createNewGame():",err);
										myself.fillingDB--;
									});
							}
							myself.fillingDB--;
						})
						.catch(function(err) {
							console.log("ERR: getLastGame():",err);
							myself.fillingDB--;
						});
				}
			})
			.catch(function(err) {
				console.log("ERR: getOtherOpenGames():",err);
				myself.fillingDB = false;
			});
	}

	fillPokerGames(gamesDB) {
		console.log("GamesDB.fillPokerGames()");
		for (let level = 0; level <= kMaxGameLevels; ++level) {
			if (gamesDB.fillingDB) {
				console.log("Still busy filling up the database...");
				break;
			}
			if (!gamesDB.playerData.isLevelEntitled(level)) {
				continue;
			}
			let openGames = gamesDB.countOpenGamesInLevel(level);
			console.log(openGames + " open games found in level " + level);
			if (openGames <= kGamesReorderLevel) {
				let maxGamesToOpen = kMaxOpenGamesPerLevel - openGames;
				gamesDB.fillPokerGamesInLevel(level,maxGamesToOpen);
			}
		}

		console.log("Refilling database in",kRetryFillPokerGames,"ms");
		setTimeout(gamesDB.fillPokerGames,kRetryFillPokerGames,gamesDB);
	}

	countOpenGamesInLevel(level) {
		let count = 0;
		this.games[level].forEach(function(game) {
			let isOpen = false;
			if (game.hands != null) {
				for (let h = 0; h < game.hands.length; ++h) {
					let hand = game.hands[h];
					if (hand == null) {
						isOpen = true;
						break;
					}
				}
			} else {
				isOpen = true;
			}
			if (isOpen) {
				count++;
			}
		});
		return count;
	}

	managePokerGames() {
		if (!this.fillingDB) {
			this.fillPokerGames();
		}
		setTimeout(this.managePokerGames(),1000*kRetryFillPokerGames);
	}

	saveAllPokerGames() {
	}

	savePokerGamesInLevel(level) {
	}

	downloadPhotos() {
	}

	createNewPracticeGame() {
	}

	addNewGame(pokerGameData) {
	}

	takeGameHand(playerData,gameNo,handNo) {
	}

	autoPlayOtherHands(gameNo,fill,completion) {
	}

	autoPlayOneHand(gameNo,handNo,completion) {
	}

	updateWatched(gameNo,handNo) {
	}

	updateGoldExchanged(gameNo,handNo) {
	}

	updateArrangedCards(gameNo,handNo,arrangedCards) {
	}

	updateSubmitDate(gameNo,handNo,submitDate) {
	}

	updateWinner(gameNo,winner) {
	}

	updateAwardDate(gameNo,awardDate) {
	}

	updateState(gameNo,handNo,state) {
	}

	updateMessage(gameNo,handNo,message) {
	}

	updateBet(gameNo,handNo,bet) {
	}

	updateFolded(gameNo,handNo,folded) {
	}

	updateStarCibt(gameNo,handNo,starCount) {
	}

	updateAllImages(image) {
	}

	updateAllMyData(playerData) {
	}

	myHandNoAtGame(gameNo) {
	}

	myBetAtGame(gameNo) {
	}

	didFoldInGame(gameNo) {
	}

	gameHandRoundNo(gameNo,handNo) {
	}

	gameSelectedTheme(gameNo,handNo) {
	}

	gameHandBet(gameNo,handNo) {
	}

	gameDidFold(gameNo,handNo) {
	}

	gameHandSubmitDate(gameNo,handNo) {
	}

	gameHandOpponents(gameNo,handNo) {
	}

	myArrangedCardsAtGame(gameNo) {
	}

	myMessageAtGame(gameNo) {
	}

	arrangedCardsAtGame(gameNo,handNo) {
	}

	messageAtGame(gameNo,handNo) {
	}

	gameObjectID(gameNo) {
	}

	gameLevel(gameNo) {
	}

	gameHandValueForKey(gameNo,handNo,key) {
	}

	gameHandPlayerData(gameNo,handNo) {
	}

	latestSubmitDate() {
	}

}

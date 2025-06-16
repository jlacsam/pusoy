class GamesView {
	constructor (db) {

		this.gamesDB = db;
		this.gamesView = document.createElement('table');
		this.gamesView.classList.add('gamesView');

		for (let i = 0; i <= kMaxGameLevels; ++i) {
			let tr0 = document.createElement('tr');
			this.gamesView.appendChild(tr0);

			let td0 = document.createElement('td');
			tr0.appendChild(td0);

			let table1 = document.createElement('table');
			table1.id = 'level' + i;
			table1.classList.add('level');
			td0.appendChild(table1);

			let tr1 = document.createElement('tr');
			table1.appendChild(tr1);

			let th1 = document.createElement('th');
			tr1.appendChild(th1);

			let table2 = document.createElement('table');
			table2.classList.add('header');
			th1.appendChild(table2);

			let tr2_1 = document.createElement('tr');
			table2.appendChild(tr2_1);

			let td2_1_1 = document.createElement('td');
			td2_1_1.align = 'left';
			tr2_1.appendChild(td2_1_1);

			let p2 = document.createElement('p');
			p2.classList.add('levelHeader');
			td2_1_1.appendChild(p2);

			let levelTitle = i == 0 ? "Practice Games " : "Level " + i + " ";
			let text2_1 = document.createTextNode(levelTitle);
			p2.appendChild(text2_1);

			let em2 = document.createElement('em');
			p2.appendChild(em2);

			let starRating = this.ratingToString(0);
			let text2_2 = document.createTextNode(starRating);
			em2.appendChild(text2_2);

			let td2_1_2 = document.createElement('td');
			td2_1_2.classList.add('buttons');
			tr2_1.appendChild(td2_1_2);

			let img2_1 = document.createElement('img');
			img2_1.classList.add('activity');
			td2_1_2.appendChild(img2_1);

			let img2_2 = document.createElement('img');
			img2_2.classList.add('padlock');
			td2_1_2.appendChild(img2_2);

			let img2_3 = document.createElement('img');
			img2_3.classList.add('leaderboard');
			td2_1_2.appendChild(img2_3);

			let tr1_2 = document.createElement('tr');
			table1.appendChild(tr1_2);

			let td1_2_1 = document.createElement('td');
			td1_2_1.id = 'level_' + i + '_games';
			tr1_2.appendChild(td1_2_1);
		}

		this.container = document.getElementById('gamesDiv');
		this.container.appendChild(this.gamesView);
	}

	showPokerGames(callback) {
		for (let i = 0; i <= kMaxGameLevels; ++i) {
			this.showPokerGamesInLevel(i,callback);
		}
	}

	showPokerGamesInLevel(level,callback) {
		let container = document.getElementById('level_'+level+'_games');
		let table = document.createElement('table');
		table.classList.add('games');
		container.appendChild(table);

		for (let i = 0; i < this.gamesDB.games[level].length; ++i) {
			let tr = document.createElement('tr');
			tr.classList.add('game');
			table.appendChild(tr);
			let td1 = document.createElement('td');
			td1.classList.add('gameNo');
			td1.classList.add(GamesView.getColorForHandType(
				this.gamesDB.games[level][i].bestHand));
			tr.appendChild(td1);
			let p1 = document.createElement('p');
			p1.classList.add('gameLabel');
			td1.appendChild(p1);
			let text1 = document.createTextNode('GAME');
			p1.appendChild(text1);
			let p2 = document.createElement('p');
			p2.classList.add('gameNo');
			td1.appendChild(p2);
			let gameNo = this.gamesDB.games[level][i].gameNo;
			let text2 = document.createTextNode(gameNo);
			p2.appendChild(text2);
			let p3 = document.createElement('p');
			p3.classList.add('timeLeft');
			td1.appendChild(p3);
			let text3 = document.createTextNode('3d left');
			text3.id = 'timeleft_' + gameNo;
			p3.appendChild(text3);

			for (let j = 0; j < 4; ++j) {
				let td2 = document.createElement('td');
				td2.id = 'cell_' + gameNo + '_' + j;
				tr.appendChild(td2);
				let div2 = document.createElement('div');
				div2.id = 'hand_' + gameNo + '_' + j;
				div2.addEventListener('click',function() {
					callback(gameNo,j);
					});
				td2.appendChild(div2);
			}

			let td3 = document.createElement('td');
			td3.id = 'pot_' + gameNo;
			td3.classList.add('potOfMetal');
			td3.classList.add(GamesView.getPotOfMetalForHandType(
				this.gamesDB.games[level][i].bestHand));
			tr.appendChild(td3);
		}
	}

	showPokerHands() {
		for (let i = 0; i <= kMaxGameLevels; ++i) {
			for (let j = 0; j < this.gamesDB.games[i].length; ++j) {
				for (let k = 0; k < 4; ++k) {
					let gameNo = this.gamesDB.games[i][j].gameNo;
					let poker = new Poker();
					poker.shuffleDeck(gameNo);
					poker.distributeCards();
					poker.selectHand(k,k);
					let player = poker.players[k];
					this.showPokerHandInLevel(i,gameNo,k,player.cards);
				}
			}
		}
	}

	showPokerHandInLevel(level,gameNo,handNo,cards) {
		let cell = document.getElementById('cell_' + gameNo + '_' + handNo);
		switch (cards[0].value) {
			case 11:
				cell.classList.add('gameHandJack');
				break;
			case 12:
				cell.classList.add('gameHandQueen');
				break;
			case 13:
				cell.classList.add('gameHandKing');
				break;
			default:
				cell.classList.add('gameHandPlain');
				break;
		}

		let container = document.getElementById('hand_' + gameNo + '_' + handNo);
		container.classList.add('hand');
		for (let i = 0; i < 3; ++i) {
			let div = document.createElement('div');
			div.classList.add('card' + (i+1).toString());
			container.appendChild(div);
			let cv = document.createTextNode(cards[i].getCardLabel());
			div.appendChild(cv);
			let br = document.createElement('br');
			div.appendChild(br);
			let cs = document.createTextNode(cards[i].getSuitSymbol());
			div.appendChild(cs);
			if (cards[i].suit == CardSuit.Spades || cards[i].suit == CardSuit.Clubs) {
				div.classList.add('black');
			} else {
				div.classList.add('red');
			}
		}

		if (cards[0].value <= 10) {
			this.drawFirstCardInHand(container,cards[0]);
		}
	}

	drawFirstCardInHand(container,card) {
		let div = document.createElement('div');
		div.classList.add('cardFace');
		if (card.suit == CardSuit.Spades || card.suit == CardSuit.Clubs) {
			div.classList.add('black');
		} else {
			div.classList.add('red');
		}
		let table = document.createElement('table');
		table.classList.add('cardFace');
		div.appendChild(table);

		let tr, td, cs;
		let suitSymbol = card.getSuitSymbol();
		switch (card.value) {
			case 1: // 1x1
				tr = document.createElement('tr');
				table.appendChild(tr);
				td = document.createElement('td');
				td.classList.add('cardFace');
				tr.appendChild(td);
				cs = document.createTextNode(suitSymbol);
				td.appendChild(cs);
				break;
			case 2: // 3x1, middle empty
				for (let i = 0; i < 3; ++i) {
					tr = document.createElement('tr');
					table.appendChild(tr);
					td = document.createElement('td');
					td.classList.add('cardFace');
					tr.appendChild(td);
					if (i != 1) {
						cs = document.createTextNode(suitSymbol);
						td.appendChild(cs);
					}
				}
				break;
			case 3: // 3x1
				for (let i = 0; i < 3; ++i) {
					tr = document.createElement('tr');
					table.appendChild(tr);
					td = document.createElement('td');
					td.classList.add('cardFace');
					tr.appendChild(td);
					cs = document.createTextNode(suitSymbol);
					td.appendChild(cs);
				}
				break;
			case 4: // 3x3, middles empty
				for (let i = 0; i < 3; ++i) {
					tr = document.createElement('tr');
					table.appendChild(tr);
					for (let j = 0; j < 3; ++j) {
						td = document.createElement('td');
						td.classList.add('cardFace');
						tr.appendChild(td);
						if ((i==0&&j==0) || (i==0&&j==2) || (i==2&&j==0) || (i==2&&j==2)) {
							cs = document.createTextNode(suitSymbol);
							td.appendChild(cs);
						}
					}
				}
				break;
			case 5: // 3x3, middles empty except center
				for (let i = 0; i < 3; ++i) {
					tr = document.createElement('tr');
					table.appendChild(tr);
					for (let j = 0; j < 3; ++j) {
						td = document.createElement('td');
						td.classList.add('cardFace');
						tr.appendChild(td);
						if ((i==0&&j==0) || (i==0&&j==2) || (i==2&&j==0) || (i==2&&j==2) || (i==1&&j==1)) {
							cs = document.createTextNode(suitSymbol);
							td.appendChild(cs);
						}
					}
				}
				break;
			case 6: // 3x3, middle column empty
				for (let i = 0; i < 3; ++i) {
					tr = document.createElement('tr');
					table.appendChild(tr);
					for (let j = 0; j < 3; ++j) {
						td = document.createElement('td');
						td.classList.add('cardFace');
						tr.appendChild(td);
						if (j==0 || j==2) {
							cs = document.createTextNode(suitSymbol);
							td.appendChild(cs);
						}
					}
				}
				break;
			case 7: // 5x3
				for (let i = 0; i < 5; ++i) {
					tr = document.createElement('tr');
					tr.classList.add('card_7_8');
					table.appendChild(tr);
					for (let j = 0; j < 3; ++j) {
						td = document.createElement('td');
						td.classList.add('cardFace');
						tr.appendChild(td);
						if (((i==0||i==2||i==4)&&(j==0||j==2))||(i==1&&j==1)) {
							cs = document.createTextNode(suitSymbol);
							td.appendChild(cs);
						}
					}
				}
				break;
			case 8: // 5x3
				for (let i = 0; i < 5; ++i) {
					tr = document.createElement('tr');
					tr.classList.add('card_7_8');
					table.appendChild(tr);
					for (let j = 0; j < 3; ++j) {
						td = document.createElement('td');
						td.classList.add('cardFace');
						tr.appendChild(td);
						if (((i==0||i==2||i==4)&&(j==0||j==2))||((i==1||i==3)&&j==1)) {
							cs = document.createTextNode(suitSymbol);
							td.appendChild(cs);
						}
					}
				}
				break;
			case 9: // 4x1,1x1,4x1
				tr = document.createElement('tr');
				table.appendChild(tr);
				for (let i = 0; i < 3; ++i) {
					td = document.createElement('td');
					tr.appendChild(td);
					if (i==0||i==2) {
						let subtable = document.createElement('table');
						td.appendChild(subtable);
						for (let j = 0; j < 4; ++j) {
							let subtr = document.createElement('tr');
							subtr.classList.add('card_9_10');
							subtable.appendChild(subtr);
							let subtd = document.createElement('td');
							subtd.classList.add('cardFace');
							subtr.appendChild(subtd);
							cs = document.createTextNode(suitSymbol);
							subtd.appendChild(cs);
						}
					} else {
						cs = document.createTextNode(suitSymbol);
						td.appendChild(cs);
					}
				}
				break;
			case 10: // 4x1,2x1,4x1
			default:
				tr = document.createElement('tr');
				table.appendChild(tr);
				for (let i = 0; i < 3; ++i) {
					td = document.createElement('td');
					tr.appendChild(td);
					if (i==0||i==2) {
						let subtable = document.createElement('table');
						td.appendChild(subtable);
						for (let j = 0; j < 4; ++j) {
							let subtr = document.createElement('tr');
							subtr.classList.add('card_9_10');
							subtable.appendChild(subtr);
							let subtd = document.createElement('td');
							subtd.classList.add('cardFace');
							subtr.appendChild(subtd);
							cs = document.createTextNode(suitSymbol);
							subtd.appendChild(cs);
						}
					} else {
						let subtable = document.createElement('table');
						td.appendChild(subtable);
						for (let j = 0; j < 3; ++j) {
							let subtr = document.createElement('tr');
							subtable.appendChild(subtr);
							let subtd = document.createElement('td');
							subtd.classList.add('cardFace');
							subtr.appendChild(subtd);
							if (j!=1) {
								cs = document.createTextNode(suitSymbol);
								subtd.appendChild(cs);
							}
						}
					}
				}
				break;
		}
		container.appendChild(div);
	}

	ratingToString(rating) {
		if (rating > kLevelGoal) {
			return kStarSymbol + " x" + rating;
		} else if (rating == kLevelGoal) {
			return kStarSymbol.repeat(rating);
		} else if (rating == 0) {
			return kHollowStarSymbol.repeat(kLevelGoal);
		} else {
			return kStarSymbol.repeat(rating) +
				kHollowStarSymbol.repeat(kLevelGoal - rating);
		}
	}

	static getPotOfMetalForHandType(handType) {
		switch (handType) {
			case kRoyalFlush:
			case kStraightFlush:
				return 'potOfGold';
			case kFourOfAKind:
				return 'potOfSilver';
			case kFullHouse:
				return 'potOfBronze';
			case kFlush:
				return 'potOfSteel';
			default:
				return 'potOfClay';
		}
	}

	static getColorForHandType(handType) {
		switch (handType) {
			case kRoyalFlush:
			case kStraightFlush:
				return 'gold';
			case kFourOfAKind:
				return 'silver';
			case kFullHouse:
				return 'bronze';
			case kFlush:
				return 'steel';
			default:
				return 'clay';
		}
	}

	static openGameHand() {
		alert("clicked cell at: " + this.cellIndex + ", " + this.parentNode.rowIndex);
	}

	static maxOpenGamesPerLevel() {
		return kMaxOpenGamesPerLevel;
	}

	setPokerGames(value) {

	}

	reapplyThemeToCells() {

	}

	scrollToDefaultPosition() {

	}

	getPopableVisibleHands() {

	}

	popOnePlayedHand() {

	}

	setRatingForHeaderView(section,rating) {

	}

	showActivityIndicatorForHeaderView(section) {

	}

	hideActivityIndicatorForHeaderView(section) {

	}

	showAdvisoryAtRandom() {

	}

	animateAdvisory() {

	}

	animateStarsInLevel(level) {

	}

	animateStarsOfSelectedCell() {

	}

	animateCountdowns() {

	}

	getGameNoOfSelectedCell() {

	}

	getGameCellViewOfGameNo(gameNo) {

	}

	unlockLevel(level) {

	}

	addNewGame(level) {

	}

	joinOpenGames(level,maxGames) {

	}

	updateOpenGames() {

	}

	updateOpenHand(oneHand) {

	}

	updateFoldedGames() {

	}

	updateFoldedHand(oneHand) {

	}

	getNumberOfSectionsInTableView(tableView) {

	}

	getNumberOfRowsInSection(section) {

	}

	getTitleForHeaderInSection(section) {

	}

	getCellForRowAtIndexPath(indexPath) {

	}

	getViewForHeaderInSection(section) {

	}

	didSelectRowAtIndexPath(indexPath) {

	}

	redisplaySelectedCell() {

	}

	redisplayCellForGameNo(gameNo) {

	}

	reloadData() {

	}

	onCellContentViewPointerDown(event) {

	}

	onCellContentViewPointerUp() {

	}

	onCellContentViewTimeExpired() {

	}

	onHeaderContentViewNewGamePointerUp() {

	}

	onHeaderContentViewPointerDown() {

	}

	onHeaderContentViewLeaderboardPointerUp() {

	}

	onHeaderContentViewUnlockPointerUp() {

	}
}

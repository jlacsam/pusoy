const kMaxQueryResults = 1000;

class PokerCloud {
	constructor () {
	}

	static getLastGame(gameData) {
		return new Promise(function(resolve,reject) {
			let Game = Parse.Object.extend('Games');
			let game = new Parse.Query(Game);

			game.descending('gameNo');
			game.first()
				.then((data) => {
					if (data == undefined) {
						resolve(null);
					} else {
						gameData.objectId = data.id;
						gameData.gameNo = data.get('gameNo');
						gameData.awardDate = data.get('awardDate');
						gameData.bestHand = data.get('bestHand');
						gameData.bestRoyalty = data.get('bestRoyalty');
						gameData.createdAt = data.get('createdAt');
						gameData.hasWinner = data.get('hasWinner');
						gameData.inviter = data.get('inviter');
						gameData.joined = data.get('joined');
						gameData.level = data.get('level');
						gameData.matchDate = data.get('matchDate');
						gameData.playerId = data.get('playerId');
						gameData.playerCount = data.get('playerCount');
						gameData.theme = data.get('theme');
						gameData.theme = data.get('updatedAt');
						gameData.winner = data.get('winner');
						resolve(gameData);
					}
				}, (error) => {
					reject(err);
				});
		});
	}

	static createNewGame(gameData) {
		return new Promise(function(resolve,reject) {
			let Game = Parse.Object.extend('Games');
			let game = new Game();

			game.set('gameNo',gameData.gameNo);
			game.set('awardDate',gameData.awardDate);
			game.set('bestHand',gameData.bestHand);
			game.set('bestRoyalty',gameData.bestRoyalty);
			game.set('hands',gameData.hands);
			game.set('hasWinner',gameData.hasWinner);
			game.set('inviter',gameData.inviter);
			game.set('joined',gameData.joined);
			game.set('level',gameData.level);
			game.set('matchDate',gameData.matchDate);
			game.set('playerId',gameData.playerId);
			game.set('playerCount',0);
			game.set('theme',gameData.theme);
			game.set('winner',gameData.winner);

			game.save()
				.then((data) => {
					gameData.gameId = data.id;
					gameData.createdAt = data.get('createdAt'); 
					gameData.updatedAt = data.get('updatedAt');
					resolve(gameData);
				}, (error) => {
					reject(err);
				});
		});
	}

	static createNewTournamentGameForLevel(playerData,level) {

	}

	static takeGameHand(handData) {
		return new Promise(function(resolve,reject) {
			let Hand = Parse.Object.extend('Hands');
			let hand = new Hand();
			let submitDate = new Date();

			hand.set('arrangedCards',handData.arrangedCards);	// 2
			hand.set('avatar',handData.avatar);
			hand.set('bet',handData.bet);
			hand.set('country',handData.country);					// 5
			hand.set('email',handData.email);
			hand.set('fbId',handData.fbId);
			hand.set('fbName',handData.fbName);
			hand.set('gameHand',handData.gameHand);				// 10
			hand.set('gameLevel',handData.gameLevel);
			hand.set('gameNo',handData.gameNo);
			hand.set('handNo',handData.handNo);
			hand.set('message',handData.message);
			hand.set('playerId',handData.playerId);				// 15
			hand.set('playerLevel',handData.playerLevel);
			hand.set('starCount',handData.starCount);
			hand.set('submitDate',submitDate);
			hand.set('theme',handData.theme);
			hand.set('username',handData.username);				// 20
			hand.set('validHand',handData.validHand);
			hand.set('version',handData.version);

			hand.save()
				.then((data) => {
					handData.objectId = data.id;
					handData.gameHand = data.get('gameHand');
					handData.createdAt = data.get('createdAt');
					handData.submitDate = data.get('submitDate');
					handData.updatedAt = data.get('updatedAt');
					resolve(handData);
				}, (error) => {
					reject(error);
				});
			});
	}

	static getOpenGames(playerId) {
		return new Promise(function(resolve,reject) {
			let oneWeekAgo = new Date(Date.now() - 1000 * kGameOpenWindow);
			let Games = Parse.Object.extend('Games');
			let games = new Parse.Query(Games);

			// All open games I played from a week ago
			games.equalTo('playerId',playerId);
			games.greaterThanOrEqualTo('createdAt',oneWeekAgo);
			games.equalTo('hasWinner',false);
			games.ascending('level');
			games.addAscending('gameNo');
			games.limit(kMaxOpenGamesPerQuery);

			games.find()
				.then((results) => {
					if (results.length == 0) {
						resolve(null);
					} else {
						let openGames = [];
						results.forEach(function(data) {
							let openGame = new GameData(data);
							openGames.push(openGame);
						});
						resolve(openGames);
					}
				}, (error) => {
					reject(error);
				});
			});
	}

	static getHandsOfOpenGames(playerId) {
		return new Promise(function(resolve,reject) {
			let oneWeekAgo = new Date(Date.now() - 1000 * kGameOpenWindow);
			let Games = Parse.Object.extend('Games');
			let games = new Parse.Query(Games);

			// All open games I played from a week ago
			games.equalTo('playerId',playerId);
			games.greaterThanOrEqualTo('createdAt',oneWeekAgo);
			games.equalTo('hasWinner',false);
			games.ascending('gameNo');

			let Hands = Parse.Object.extend('Hands');
			let openHands = new Parse.Query(Hands);
			openHands.matchesKeyInQuery('gameNo','gameNo',games);
			openHands.ascending('gameLevel');
			openHands.addAscending('gameNo');
			openHands.addAscending('handNo');
			openHands.limit(kMaxHandsPerQuery);

			openHands.find()
				.then((results) => {
					if (results.length == 0) {
						resolve(null);
					} else {
						let hands = [];
						results.forEach(function(data) {
							let hand = new HandData(data);
							hands.push(hand);
						});
						resolve(hands);
					}
				}, (error) => {
					reject(error);
				});
		});
	}

	static getOtherOpenGames(playerId,level,limit) {
		return new Promise(function(resolve,reject) {
			let Hands = Parse.Object.extend("Hands");
			let hands = new Parse.Query(Hands);
			let oneWeekAgo = new Date(Date.now() - 1000 * kGameOpenWindow);

			// All hands I've played in the level from one week ago
			hands.equalTo('playerId',playerId);
			hands.lessThanOrEqualTo('gameLevel',level);
			hands.greaterThanOrEqualTo('submitDate',oneWeekAgo);
			hands.ascending('gameNo');

			let Games = Parse.Object.extend("Games");
			let games = new Parse.Query(Games);

			// All open games I haven't played from a week ago
			games.lessThanOrEqualTo('gameLevel','==',level);
			games.doesNotMatchKeyInQuery('gameNo','gameNo',hands);
			games.greaterThanOrEqualTo('createdAt',oneWeekAgo);
			games.equalTo('hasWinner',false);
			games.equalTo('joined',false);
			games.ascending('gameNo');
			games.limit(limit); 

			games.find()
				.then((results) => {
					if (results.length == 0) {
						resolve(null);
					} else {
						let openGames = [];
						results.forEach(function(data) {
							let openGame = new GameData(data);
							openGames.push(openGame);
						});
						resolve(openGames);
					}
				}, (error) => {
					reject(error);
				});
		});
	}

	static getOtherOpenGamesHands(playerId,level,limit) {
		return new Promise(function(resolve,reject) {
			let Hands = Parse.Object.extend("Hands");
			let myHands = new Parse.Query(Hands);
			let oneWeekAgo = new Date(Date.now() - 1000 * kGameOpenWindow);

			// All hands I've played in the level from one week ago
			myHands.equalTo('playerId',playerId);
			myHands.equalTo('gameLevel',level);
			myHands.greaterThanOrEqualTo('submitDate',oneWeekAgo);
			myHands.descending('submitDate');

			let Games = Parse.Object.extend("Games");
			let games = new Parse.Query(Games);

			// All open games I haven't played from a week ago
			games.equaltTo('gameLevel','==',level);
			games.notEqualTo('playerId',playerId);
			games.doesNotMatchQuery('gameNo',myHands);
			games.greaterThanOrEqualTo('createdAt',oneWeekAgo);
			games.equalTo('hasWinner',false);
			games.ascending('gameNo');

			let openHands = new Parse.Query(Hands);
			openHands.matchesKeyInQuery('gameNo','gameNo',games);
			openHands.equalTo('gameLevel',level);
			openHands.descending('submitDate');
			openHands.limit(kMaxOpenGamesPerQuery);

			openHands.find()
				.then((results) => {
					resolve(results);
				}, (error) => {
					reject(error);
				});
		});
	}

	static getHandsFromGames(games) {
		return new Promise(function(resolve,reject) {
			let Hands = Parse.Object.extend("Hands");
			let hands = new Parse.Query(Hands);
			let oneWeekAgo = new Date(Date.now() - 1000 * kGameOpenWindow);

			hands.containedIn('gameNo',games);
			hands.greaterThan('submitDate',oneWeekAgo);
			hands.descending('submitDate');
			hands.limit(kMaxQueryResults);

			hands.find()
				.then((results) => {
					if (results.length == 0) {
						resolve(null);
					} else {
						let handData = [];
						results.forEach(function(data) {
							let hand = new HandData(data);
							handData.push(hand);
						});
						resolve(handData);
					}
				}, (error) => {
					reject(error);
				});
		});
	}

	static fetchHandsFromGameHands(gameHands) {
		return new Promise(function(resolve,reject) {
			let Hands = Parse.Object.extend("Hands");
			let hands = new Parse.Query(Hands);

			hands.containedIn('gameHand',gameHands);
			hands.descending('submitDate');
			hands.limit(16*kMaxQueryResults);

			hands.find()
				.then((results) => {
					resolve(results);
				}, (error) => {
					reject(error);
				});
		});
	}

	static fetchFoldedHandsFromGames(games) {
		return new Promise(function(resolve,reject) {
			let Hands = Parse.Object.extend("Hands");
			let hands = new Parse.Query(Hands);

			hands.containedIn('gameNo',games);
			hands.exists('folded');
			hands.ascending('submitDate');
			hands.limit(kMaxQueryResults);

			hands.find()
				.then((results) => {
					resolve(results);
				}, (error) => {
					reject(error);
				});
		});
	}

	static updateGameHasWinner(objectId) {
		return new Promise(function(resolve,reject) {
			let Games = Parse.Object.extend('Games');
			let query = new Parse.Query(Games);

			query.get(objectId)
				.then((game) => {
					game.set('hasWinner',true);
					game.set('awardDate',Date.now());
					game.save()
						.then((saved) => {
							resolve(saved);
						}, (error) => {
							reject(error);
						});
				}, (error) => {
					if (error.code === Parse.Error.OBJECT_NOT_FOUND) {
						resolve(null);
					} else {
						reject(error);
					}
				});
		});
	}

	static updateFolded(playerData,gameNo,handNo,folded,bet) {

	}

	static fetchMonies() {

	}

	static fetchBestHands(friends) {
		let cutOff = PokerCloud.getSundayOfThisWeek();
		return new Promise(function(resolve,reject) {
			let Hands = Parse.Object.extend('Hands');
			let hands = new Parse.Query(Hands);

			hands.exists('starCount');
			hands.greaterThanOrEqualTo('submitDate',cutOff);
			hands.descending('starCount');
			hands.addDescending('submitDate');
			hands.limit(25);

			hands.find()
				.then((results) => {
					resolve(results);
				}, (error) => {
					reject(error);
				});
		});
	}

	static subscribeToGame(gameNo) {

	}

	static unsubscribeToGame(gameNo) {

	}

	static pushToChannel(displayName,gameNo) {

	}

	static countUniqueGames(hands) {

	}

	static debugAutoPlayHands(playerData) {

	}

	static debugAutoPlayOneHand() {

	}

	static debugCreateEightNewGamesPerLevel(playerData) {

	}

	static debugUpdateGameHandKeys() {

	}

	static debugUpdateGameLevelKeys() {

	}

	static debugUpdateValidHands() {

	}

	static debugExpireInvalidHands() {

	}

	static debugCorrectInvalidHands() {

	}
}

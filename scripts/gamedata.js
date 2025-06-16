/* 	In-Cloud Data Structure:

	{
		"players" : { [
			{
				"playerId" : "1234567890",				// objectId
				"avatar" : "avatar.png",
				"birthday" : "1980-01-01",
				"country" : "PH",
				"createdAt" : "2020-11-10 10:06:42Z",
				"displayName" : "Blah blah",
				"email" : "helluva@gmail.com",
				"fbID" : "blah",
				"fbName" : "Helluva",
				"gamesOpened" : 0,
				"gamesPlayed" : 0,
				"gamesWon" : [ 0,0,0,0,0,0,0,0,0 ],
				"gender" : "MFLGBTQ",
				"goldCoins" : 100,
				"lastSignin" : "2020-11-10 05:05:05Z",
				"level" : 1,
				"profile" : "profile.png",
				"specialGames" : [ 0,0,0,0,0,0,0,0,0 ],
				"theme" : 17,
				"updatedAt" : "2020-11-10 10:07:11Z",
				"username" : "kiwete"
			},
			...
		] },
		"games" : { [
			{
				"gameId" : "asdfghjkl",					// objectId
				"gameNo" : 0,
				"awardDate" : "2020-10-27 18:05:18Z",
				"bestHand" : 13,
				"bestRoyalty" : 32,
				"createdAt" : "2020-10-27 18:00:01Z",
				"hands" : ["objectId",...],
				"hasWinner" : false,
				"indexNo" : 1,
				"inviter" : "Player X",
				"joined" : false,
				"level" : 0,
				"matchDate" : "2020-10-27 18:09:01Z",
				"playerId" : "qwerty",
				"playerCount" : 0,
				"theme" : 17,
				"updatedAt" : "2020-11-10 10:07:11Z"
				"winner" : "No winner yet"
			},
			...
		] },
		"hands" : { [
			{
				"arrangedCards" : "1H,2H,3H,4C,5C,6C,7C,8C,9D,10D,11D,12D,13D",
				"avatar" : "avatar.png",
				"bet" : 0,
				"country" : "PH",
				"email" : "helluva@gmail.com",
				"fbID" : "helluva@gmail.com",
				"fbName" : "Helluva",
				"gameHand" : "0-0",
				"gameLevel" : 0,
				"gameNo" : 0,
				"handNo" : 0,
				"message" : "blah",
				"playerLevel" : 1,
				"starCount" : 0,
				"submitDate" : "2020-10-27 18:10:32Z",
				"theme" : 17,
				"username" : "blah",
				"validHand" : true,
				"version" : "1.0",
			},
			...
		] }
	}
*/

class GameData {
	constructor (data) {
		if (data == undefined || typeof(data) == 'number') {
			this.gameId = '';
			this.gameNo = typeof(data) == 'number' ? data : 0;
			this.awardDate = null;
			if (typeof(data) == 'number') {
				this.bestHand = Poker.findBestHandInGame(data);
				this.bestRoyalty = Poker.findRoyaltyInGame(data);
			} else {
				this.bestHand = kHighCard;
				this.bestRoyalty = kNoRoyalty;
			}
			this.createdAt = new Date();
			this.hands = null;
			this.hasWinner = false;
			this.inviter = '';
			this.joined = false;
			this.level = PlayerLevel.Level1;
			this.matchDate = null;
			this.playerId = null;
			this.playerCount = 0;
			this.theme = Themes.PokerTable;
			this.updatedAt = null;
			this.winner = null;
		} else {
			this.gameId = data.id;
			this.gameNo = data.get('gameNo');
			this.awardDate = data.get('awardDate');
			this.bestHand = data.get('bestHand');
			this.bestRoyalty = data.get('bestRoyalty');
			this.createdAt = data.get('createdAt');
			this.hands = data.get('hands');
			this.hasWinner = data.get('hasWinner');
			this.inviter = data.get('inviter');
			this.joined = data.get('joined');
			this.level = data.get('level');
			this.matchDate = data.get('matchDate');
			this.playerId = data.get('playerId');
			this.playerCount = data.get('playerCount');
			this.theme = data.get('theme');
			this.updatedAt = data.get('updatedAt');
			this.winner = data.get('winner');
		}
	}

	dump() {
		console.log(this);
	}

	occupants(playerID) {
	}

	static pokerGameDataStructToDictionary(pokerGameData) {
	}
}

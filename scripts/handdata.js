const PlayerState = {
	NotPlayed : 0,
	HasPlayed : 1
}

const PlayerAction = {
	None : 0,
	Called : 1,
	Folded : 2
}

class HandData {
	constructor(data) {
		if (data == undefined) {
			// Database fields in Hands table
			this.handId = ''; 						// 1 - objectId
			this.arrangedCards = null;				// 2
			this.avatar = '';
			this.bet = 0;
			this.country = '';						// 5
			this.createdAt = Date.now();			// 6
			this.email = '';
			this.fbId = '';
			this.fbName = '';
			this.gameHand = '';						// 10
			this.gameLevel = 0;						// 11
			this.gameNo = 0;
			this.handNo = 0;
			this.message = '';
			this.playerId = '';						// 15
			this.playerLevel = PlayerLevel.Level1;
			this.starCount = 0;
			this.submitDate = Date.now();
			this.theme = Theme.PokerTable;
			this.username = '';						// 20
			this.updatedAt = Date.now();
			this.validHand = false;
			this.version = kVersionNo;
		} else {
			this.handId = data.id;			// 1 - objectId
			this.arrangedCards = data.get('arrangedCards');// 2
			this.avatar = data.get('avatar');
			this.bet = data.get('bet');
			this.country = data.get('country');			// 5
			this.createdAt = data.get('createdAt');		// 6
			this.email = data.get('email');
			this.fbId = data.get('fbId');
			this.fbName = data.get('dbName');
			this.gameHand = data.get('gameHand');			// 10
			this.gameLevel = data.get('gameLevel');		// 11
			this.gameNo = data.get('gameNo');
			this.handNo = data.get('handNo');
			this.message = data.get('message');
			this.playerId = data.get('playerId');			// 15
			this.playerLevel = data.get('playerLevel');
			this.starCount = data.get('starCount');
			this.submitDate = data.get('submitDate');
			this.theme = data.get('theme');
			this.username = data.get('username');			// 20
			this.updatedAt = data.get('updatedAt');
			this.validHand = data.get('validHand');
			this.version = data.get('versionNo');
		}

		// In-memory only fields
		this.action = PlayerAction.None;
		this.occupied = false;
		this.score = 0;
		this.state = PlayerState.NotPlayed;
		this.watched = false;
	}

	dump() {
		console.log(this);
	}
}

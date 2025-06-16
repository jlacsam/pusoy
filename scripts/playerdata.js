const PlayerLevel = {
	Practice : 0,
	Level1 : 1,
	Level2 : 2,
	Level3 : 3,
	Level4 : 4,
	Level5 : 5,
	Level6 : 6,
	Level7 : 7,
	Level8 : 8,
}

class PlayerData {
	constructor (data) {
		if (typeof(data) == 'string') {

			this.playerId = data;				// 1
			this.avatar = null;
			this.birthday = null;
			this.country = null;
			this.createdAt = null;				// 5
			this.displayName = null;
			this.email = null;
			this.fbID = null;
			this.fbName = null;
			this.gamesOpened = 0;				// 10
			this.gamesPlayed = 0;
			this.gamesWon = [];
			this.gender = null;
			this.goldCoins = 0;
			this.lastSignin = null;				// 15
			this.level = PlayerLevel.Practice;
			this.profile = null;
			this.specialGames = [];
			this.theme = Themes.PokerTable;
			this.username = null;				// 20
			this.updatedAt = null;

			for (let i = 0; i <= kMaxGameLevels;++i) {
				this.gamesWon.push(0);
				this.specialGames.push(0);
			}

		} else if (typeof(data) == 'object') {

			this.playerId = data.playerId;		// 1
			this.avatar = data.avatar;
			this.birthday = data.birthday;
			this.country = data.country;
			this.createdAt = data.createdAt;	// 5
			this.displayName = data.displayName;
			this.email = data.email;
			this.fbID = data.fbID;
			this.fbName = data.fbName;
			this.gamesOpened = data.gamesOpened;// 10
			this.gamesPlayed = data.gamesPlayed;
			this.gamesWon = data.gamesWon;
			this.gender = data.gender;
			this.goldCoins = data.goldCoins;
			this.lastSignin = data.lastSignin;	// 15
			this.level = PlayerLevel.Practice;
			this.profile = data.profile;
			this.specialGames = data.specialGames;
			this.theme = Themes.PokerTable;
			this.username = data.username;		// 20
			this.updatedAt = data.updatedAt;
		}
	}

	static createPlayerData(playerData) {
		return new Promise(function(resolve,reject) {
			let Player = Parse.Object.extend("Players");
			let player = new Player();
			let signin = new Date();

			player.set('avatar',kDefaultAvatar);			// 2
			player.set('birthday','');
			player.set('country','');
			player.set('displayName',playerData.username);	// 6
			player.set('email','');
			player.set('fbID','');
			player.set('fbName','');
			player.set('gamesOpened',0);					// 10
			player.set('gamesPlayed',0);
			player.set('gamesWon',playerData.gamesWon);
			player.set('gender','');
			player.set('goldCoins',0);
			player.set('lastSignin',signin);				// 15
			player.set('level',PlayerLevel.Practice);
			player.set('profile',null);
			player.set('specialGames',playerData.specialGames);
			player.set('theme',Themes.PokerTable);
			player.set('username',playerData.username);		// 20

			player.save()
				.then((data) => {
					playerData.playerId = data.id;						// 1
					playerData.avatar = data.get('avatar');
					playerData.birthday = data.get('birthday');
					playerData.country = data.get('country');
					playerData.createdAt = data.get('createdAt');		// 5
					playerData.displayName = data.get('displayName');
					playerData.email = data.get('email');
					playerData.fbID = data.get('fbID');
					playerData.fbName = data.get('fbName');
					playerData.gamesOpened = data.get('gamesOpened');	// 10
					playerData.gamesPlayed = data.get('gamesPlayed');
					playerData.gamesWon = data.get('gamesWon');
					playerData.gender = data.get('gender');
					playerData.goldCoins = data.get('goldCoins');
					playerData.lastSignin = data.get('lastSignin');		// 15
					playerData.level = data.get('level');
					playerData.profile = data.get('profile');
					playerData.specialGames = data.get('specialGames');
					playerData.theme = data.get('theme');
					playerData.username = data.get('username');			// 20
					playerData.updatedAt = data.get('updatedAt');
					resolve(playerData);
				}, (error) => {
					reject(error);
				});
			});
	}

	static fetchPlayerData(playerData) {
		return new Promise(function(resolve,reject) {
			let Player = Parse.Object.extend("Players");
			let player = new Parse.Query(Player);

			player.equalTo("objectId",playerData.playerId);
			player.first()
				.then((data) => {
					if (data == undefined) {
						resolve(null);
					} else {
						playerData.avatar = data.get('avatar');				// 2
						playerData.birthday = data.get('birthday');
						playerData.country = data.get('country');
						playerData.createdAt = data.get('createdAt');		// 5
						playerData.displayName = data.get('displayName');
						playerData.email = data.get('email');
						playerData.fbID = data.get('fbID');
						playerData.fbName = data.get('fbName');
						playerData.gamesOpened = data.get('gamesOpened');	// 10
						playerData.gamesPlayed = data.get('gamesPlayed');
						playerData.gamesWon = data.get('gamesWon');
						playerData.gender = data.get('gender');
						playerData.goldCoins = data.get('goldCoins');
						playerData.lastSignin = data.get('lastSignin');		// 15
						playerData.level = data.get('level');
						playerData.profile = data.get('profile');
						playerData.specialGames = data.get('specialGames');
						playerData.theme = data.get('theme');
						playerData.username = data.get('username');			// 20
						playerData.updatedAt = data.get('updatedAt');
						resolve(playerData);
					}
				}, (error) => {
					if (error.code === Parse.Error.OBJECT_NOT_FOUND) {
						resolve(null);
					} else {
						reject(error);
					}
				});
		});
	}

	savePlayerData() {
		let data = {
			playerId : this.playerId,
			fbID : this.fbID,
			email : this.email,
			username : this.username,
			fbName : this.fbName,
			country : this.country,
			gender : this.gender,
			birthday : this.birthday,
			gender : this.gender,
			birthday : this.birthday,
			avatar : this.avatar,
			goldCoins : this.goldCoins,
			gamesPlayed : this.gamesPlayed,
			gamesOpened : this.gamesOpened,
			level : this.level,
			theme : this.selectedTheme,
			gamesWon : this.gamesWon,
			lastUsed : this.lastUsed,
			specialGames : this.specialGames
		};
		if (this.playerID != null) {
			if (this.playerID.length > 0) {
				
			}
		}
	}

	static randomPlayer() {
		let d = new Date(milliseconds);
		Math.seedrandom(d.toString());

		let randomQueue = [ 256, 256, 256 ];
		let index = 0;
		do {
			index = Math.floor(Opponents.length * Math.random());
		} while (index == randomQueue[0] || index == randomQueue[1] || index == randomQueue[2]);

		randomQueue.shift();
		randomQueue.unshift(index);

		let opponent = Opponents[index];
		let playerData = new PlayerData();
		playerData.playerID = opponent.PlayerID;
		playerData.username = opponent.DisplayName;
		playerData.avatar = opponent.Avatar;
		playerData.country = opponent.Country;
		playerData.selectedTheme = Math.floor(Themes.length * Math.random());
	}

	dump() {
		console.log(this);
	}

	useDefaultPhoto() {
		let photo = this.bestAvailablePhoto();
		return photo == kDefaultAvatar;
	}

	gamesWonInLevel(level) {
		return this.gamesWon[level];
	}

	setGameWonInLevel(level,value) {
		this.gamesWon[level] = value;
	}

	incrementGamesWonInLevel(level) {
		this.gamesWon[level]++;
	}

	incrementGamesPlayed() {
		this.gamesPlayed++;
	}

	incrementGamesOpened() {
		this.gamesOpened++;
	}

	gamesWonString() {
		return this.gamesWon.toString();
	}

	specialGamesString() {
		return this.specialGames.toString();
	}

	bestAvailablePhoto() {
		let rootPath = 'localhost';
		let fileName = 'FB-' + this.fbID + '.jpg';
		let filePath = rootPath + fileName;

		// If FB photo exists, retun filePath

		fileName = 'GC-' + this.playerID + '.jpg';
		filePath = rootPath + fileName;

		// If GC photo exists, return filePath

		return this.avatar;
	}

	bestDisplayName() {
		if (this.fbName != null && this.fbName.length > 0) {
			return this.fbName;
		} else if (this.displayName != null && this.displayName.length > 0) {
			return this.displayName;
		} else {
			return this.username;
		}
	}

	loadPlayerDataWithCreate() {
		if (this.loadPlayerData()) {
			return true;
		} else {
			if (this.createPlayerData()) {
				return this.loadPlayerData();
			} else {
				return false;
			}
		}
	}

	entitleLevel(level) {
		if (level > kMaxRegularLevels && level <= kMaxGameLevels) {
			this.specialGames[level-(kMaxRegularLevels+1)] = true;
		}
	}

	isLevelEntitled(level) {
		if (level <= 1) {
			return true;
		} else if (level != kBestMiddleLevelIndex) {
			return (this.gamesWon[level-1] >= kLevelGoal);
		} else if (level > kMaxRegularLevels && level <= kMaxGameLevels) {
			return this.specialGames[level-(kMaxRegularLevels+1)];
		} else {
			return false;
		}
	}

	downloadPhotos() {
	}
}

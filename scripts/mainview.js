const AlertContext = {
	NotLoggedOn : 1,
	InsufficientGoldCoins : 2,
	UnlockBestMiddleLevel : 3,
	NotAuthorizedForPayments : 4,
	UnableToContactStore : 5,
	NoMoneyToPlay : 6,
	DataIsCorrupted : 7,
	CallOrFold : 8,
	CantCall : 9,
	UnableToFetchData : 10
}

class MainView extends PIXI.Container {
	constructor(playerId) {
		super();
		this.gameMode = GameMode.Play;
		this.animateController = true;
		this.terminate = false;
		this.updateCredits1 = 0;
		this.updateCredits2 = 0;
		this.alertContext = 0;

		this.viewAlert = null;
		this.viewTournament = null;
		this.viewStore = null;
		this.viewTrophy = null;
		this.viewSettings = null;

		this.playerId = playerId;
		this.playerData = new PlayerData(playerId);
		this.gamesDB = null;
	}

	main() {
		Math.seedrandom(Date.now());
		app.stop();
		let playerData = this.playerData;
		let canvas = document.getElementById('playView');
		canvas.addEventListener('animationend',this.processPlayView);

		PlayerData.fetchPlayerData(playerData).then(function(data) {
			if (data == null) {
				playerData.username = Utilities.randomUsername(6);
            console.log("About to call PlayerData.createPlayerData() with:",playerData);
				PlayerData.createPlayerData(playerData)
					.then(function(data) {
						console.log("Created playerdata for " + this.playerData.username);
						playerData.dump();
						gamesDB = new GamesDB(playerData);
						gamesDB.loadPokerGames()
						.then(function(data) {
							gamesDB.fillPokerGames(gamesDB);
						})
						.catch(function(err) {
							console.log("GamesDB.loadPokerGames():",err);
						});
					})
					.catch(function(err) {
						console.log("ERR: createPlayerData(): ",err);
					});
			} else {
				console.log("Fetched playerdata for " + playerData.username);
				data.dump();
				gamesDB = new GamesDB(playerData);
				gamesDB.loadPokerGames()
					.then(function(data) {
	//					gamesDB.fillPokerGames(gamesDB);
						gamesView = new GamesView(gamesDB);
						gamesView.showPokerGames(mainView.showPlayView);
						gamesView.showPokerHands();
					})
					.catch(function(err) {
						console.log("gamesDB.loadPokerGames():",err);
					});
			}
		})
		.catch(function(err) {
			console.log("ERR: fetchPlayerData(): ",err);
		});
	}

	showPlayView(gameNo,handNo) {
		let canvas = document.getElementById('playView');
		canvas.classList.add('show');

		let poker = new Poker();
		poker.shuffleDeck(gameNo);
		poker.distributeCards();

		app.start();
		playView = new PlayView(poker.packs[handNo]);
		playView.gameNo = gameNo;
		playView.handNo = handNo;
		playView.draw(rendererRect);
		playView.setOnHidePlayView(mainView.hidePlayView);
		app.stage.addChild(playView);
		playView.animateAll();
	}

	hidePlayView() {
		playView.willShow = false;
		let canvas = document.getElementById('playView');
		canvas.classList.add('hide');
	}

	processPlayView() {
		let canvas = document.getElementById('playView');
		if (playView.willShow) {

			canvas.style.left = '0px';
			canvas.classList.remove('show'); 
			canvas.classList.remove('hide');

		} else {

			canvas.style.left = window.innerWidth.toString() + 'px';
			canvas.classList.remove('show'); 
			canvas.classList.remove('hide'); 
			app.stop();

			let arrangedCards = null;
			if (Poker.isValidHand(playView.arrangedCards)) {
				arrangedCards = playView.getArrangedCards();
			}

			playView.destroy();
			app.stage.removeChild(playView);
			console.log(arrangedCards);
		}
	}
}


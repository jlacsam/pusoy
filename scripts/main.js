let rendererType = "WebGL"
if (!PIXI.utils.isWebGLSupported()){
    rendererType = "canvas"
}
PIXI.utils.sayHello(rendererType);

const rendererRect = { x:0, y:0, width:window.innerWidth, height:window.innerHeight };
const app = new PIXI.Application({
	antialias:true,
	autostart:false,
	view:document.getElementById('playView'),
	transparent:true,
	resolution:1
});

const loader = PIXI.Loader.shared;
const symbolFillRatio = Utilities.getSymbolFillRatio();

var _PlayerId = 'DdAIfLaRZh';
const mainView = new MainView(_PlayerId);

//var _PlayerData = new PlayerData(_PlayerId);
var gamesDB = null;
var gamesView = null;
var playView = null;
var _style = document.createElement('style');
_style.type = 'text/css';
_style.innerHTML = '@keyframes hidePlayView { to { left:'+window.innerWidth+'px; } }'; 

document.documentElement.appendChild(_style);
document.body.appendChild(app.view);
document.addEventListener('DOMContentLoaded', function() {
	loader
		.add('images/flags.json')
		.add([
			'images/anonymous.png',
			'images/appicon.png',
			'images/fblogo.png',
			'images/googleg.png',
			'images/leaderboard.png',
			'images/live.png',
			'images/padlock.png',
			'images/tiny_gold_coin.png',
			'images/unlock.png'
		])
		.add([
			'images/backside.png',
			'images/card_shadow.png',
			'images/frontside.png',
			'images/jack_club.png',
			'images/jack_diamond.png',
			'images/jack_heart.png',
			'images/jack_spade.png',
			'images/king_club.png',
			'images/king_diamond.png',
			'images/king_heart.png',
			'images/king_spade.png',
			'images/queen_club.png',
			'images/queen_diamond.png',
			'images/queen_heart.png',
			'images/queen_spade.png'
		])
		.load((load,resources) => {});

		loader.onProgress.add(() => {});
		loader.onError.add(() => {});
		loader.onLoad.add(() => {});
		loader.onComplete.add(() => { main() });

	app.renderer.view.style.position = "fixed";
	app.renderer.view.style.left = rendererRect.width.toString() + "px";
	app.renderer.view.style.top = "0px"; 
	app.renderer.view.style.display = "block";
	app.renderer.autoDensity = true;
	app.renderer.resize(rendererRect.width,rendererRect.height);
});

function main() {

	mainView.main();
	return;
/*
	Math.seedrandom(Date.now());
	app.stop();
	let canvas = document.getElementById('playView');
	canvas.addEventListener('animationend',processPlayView);

	PlayerData.fetchPlayerData(_PlayerData).then(function(data) {
		if (data == null) {
			_PlayerData.username = Utilities.randomUsername(6);
			PlayerData.createPlayerData(_PlayerData)
				.then(function(data) {
					console.log("Created playerdata for " + _PlayerData.username);
					_PlayerData.dump();
					_GamesDB = new GamesDB(_PlayerData);
					_GamesDB.loadPokerGames()
						.then(function(data) {
							_GamesDB.fillPokerGames(_GamesDB);
						})
						.catch(function(err) {
							console.log("GamesDB.loadPokerGames():",err);
						});
				})
				.catch(function(err) {
					console.log("ERR: createPlayerData(): ",err);
				});
		} else {
			console.log("Fetched playerdata for " + _PlayerData.username);
			data.dump();
			_GamesDB = new GamesDB(_PlayerData);
			_GamesDB.loadPokerGames()
				.then(function(data) {
//					_GamesDB.fillPokerGames(_GamesDB);
					_GamesView = new GamesView(_GamesDB);
					_GamesView.showPokerGames();
					_GamesView.showPokerHands();
				})
				.catch(function(err) {
					console.log("GamesDB.loadPokerGames():",err);
				});
		}
	})
	.catch(function(err) {
		console.log("ERR: fetchPlayerData(): ",err);
	});
}

function showPlayView(gameNo,handNo) {
	let canvas = document.getElementById('playView');
	canvas.classList.add('show');

	let poker = new Poker();
	poker.shuffleDeck(gameNo);
	poker.distributeCards();

	app.start();
	_PlayView = new PlayView(poker.packs[handNo]);
	_PlayView.gameNo = gameNo;
	_PlayView.handNo = handNo;
	_PlayView.draw(rendererRect);
	app.stage.addChild(_PlayView);
	_PlayView.animateAll();
}

function hidePlayView() {
	_PlayView.willShow = false;
	let canvas = document.getElementById('playView');
	canvas.classList.add('hide');
}

function processPlayView() {
	let canvas = document.getElementById('playView');
	if (_PlayView.willShow) {

		canvas.style.left = '0px';
		canvas.classList.remove('show'); 
		canvas.classList.remove('hide');

	} else {

		canvas.style.left = window.innerWidth.toString() + 'px';
		canvas.classList.remove('show'); 
		canvas.classList.remove('hide'); 
		app.stop();

		let arrangedCards = null;
		if (Poker.isValidHand(_PlayView.arrangedCards)) {
			arrangedCards = _PlayView.getArrangedCards();
		}

		_PlayView.destroy();
		app.stage.removeChild(_PlayView);
		console.log(arrangedCards);
	}
*/
}








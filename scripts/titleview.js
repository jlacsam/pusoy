const kImageBorder = 2;
const kFlagWidth = 32;
const kFlagHeight = 26;
const kDescriptionSize = 18;
const kGoldCoinSize = 44;
const kGoldCoinOffset = 5;
const kCoinFontSize = 24;
const kStripesThickness = 3;

class TitleView extends PIXI.Container {
	constructor (frame,compressed = false) {
		super();
		this.textColor = ThemeStyles[Themes.PokerTable].TitleFgColor;
		this.backColor = PIXI.utils.string2hex(ThemeStyles[Themes.PokerTable].TitleBgColor);
		this.frame = frame;
		this.compressed = compressed;

		this.gameNo = 0;
		this.handNo = 0;
		this.roundNo = 0;
		this.coins = 0;
		this.hideCoins = false;
		this.gameState = GameState.Playing;
		this.theme = Themes.PokerTable;
		this.opponentName = null;
		this.winnerName = null;
		this.country = null;

		this.background = new PIXI.Graphics();    
		this.background.beginFill(this.backColor);
		this.background.drawRect(0,0,frame.width,frame.height);
		this.background.endFill(); 
		this.background.x = 0;
		this.background.y = 0;
		this.addChild(this.background);

		this.playerImage = new PIXI.Sprite(loader.resources['images/anonymous.png'].texture);
		this.countryImage = new PIXI.Sprite(loader.resources['images/flags.json'].textures['Philippines']);
		this.descFontStyle = new PIXI.TextStyle({ fontFamily:'Helvetica',
			fontSize:kDescriptionSize,fill:this.textColor });
		this.coinFontStyle = new PIXI.TextStyle({ fontFamily:'Helvetica',
			fontSize:kCoinFontSize,fill:'gold' });
		this.coinLabel = new PIXI.Text("0",this.coinFontStyle);

		if (compressed) {

			this.playerImage.position.set(0,0);
			this.playerImage.width = frame.height;
			this.playerImage.height = frame.height;
			this.countryImage.x = frame.height + kImageBorder;
			this.countryImage.y = frame.height / 4;
			this.countryImage.height = frame.height / 2;
			this.countryImage.width = 0.75 * frame.height;

			this.description = new PIXI.Text("You are playing round 1 of 3 against RandomPlayer.",
				this.descFontStyle);
			this.description.x = this.countryImage.x + this.countryImage.width + kImageBorder;
			this.description.y = (frame.height - this.description.height) / 2;

		} else {
			this.description = new PIXI.Text("You are playing round 1 of 3\nagainst RandomPlayer.",
				this.descFontStyle);

			let w = frame.height - kBarHeight - 2 * kImageBorder;
			let h = w;

			this.playerImage.x = kImageBorder;
			this.playerImage.y = kImageBorder;
			this.playerImage.width = w;
			this.playerImage.height = h;

			let x = kImageBorder + w - kFlagWidth + 1;
			let y = kImageBorder + w - kFlagHeight;

			this.countryImage.x = x;
			this.countryImage.y = y;
			this.countryImage.width = kFlagWidth;
			this.countryImage.height = kFlagHeight;

			y = (frame.height - kBarHeight - this.description.height) / 2;
			x = 2 * kImageBorder + w + y;
			this.description.x = x;
			this.description.y = y;
		}

		this.coinLabel.x = frame.width - this.coinLabel.width - kGoldCoinOffset;
		this.coinLabel.y = frame.height - this.coinLabel.height - kBarHeight;

		this.addChild(this.playerImage);
		this.addChild(this.countryImage);
		this.addChild(this.description);
		this.addChild(this.coinLabel);

		this.bar = new PIXI.Graphics();
		this.bar.beginFill(0xF0F0F0);
		this.bar.drawRect(0,frame.height-kBarHeight,frame.width,kBarHeight);
		this.addChild(this.bar);

		this.stopDescriptionAnimation = false;
	}

	inferStateFromMode(mode) {
		switch (mode) {
			case GameMode.Watch:
			case GameMode.Replay:
				this.gameState = GameState.AboutToWatch;
				break;
			case GameMode.Play:
			default:
				this.gameState = GameState.Playing;
				break;
		}
	}

	updateTitleInfo(opponent,game,hand,round,theme) {
		this.gameNo = game;
		this.handNo = hand + 1;
		this.roundNo = round;
		this.opponentName = opponent;
		this.theme = theme;
	}

	updateDescription() {
		let temp = null;

		switch (this.gameState) {
			case GameState.Playing:
				if (this.roundNo == 0) {
					temp = "You are the first to play game " + this.gameNo;
				} else {
					temp = "You are playing game " + this.gameNo + " against " + this.opponentName + ".";
				}
				break;

			case GameState.AboutToWatch:
				temp = PIXI.utils.isMobile ? "Tap " : "Click ";
				tempk += "to watch " + this.opponentName + "\nplay hand " +
					this.handNo + " of " + this.gameNo + ".";
				break;

			case GameState.Watching:
				temp = "You are watching " + this.opponentName + "\nplay hand " +
					this.handNo + " of " + this.gameNo + " on " + ThemeStyles[this.theme] + " theme.";
				break;

			case GameState.Watched:
				temp = "You watched " + this.opponentName + "\nplay hand " +
					this.handNo + " of " + this.gameNo + " on " + ThemeStyles[this.theme] + " theme.";
				break;

			case GameState.Matching:
				temp = "And the winner of\nround " + this.roundNo + " game " + this.gameNo + " is ...";
				break;

			case GameState.Matched:
				temp = "And the winner of\nround " + this.roundNo + " game " +
					this.gameNo + " is " + this.winnerName + ".";
				break;

			case GameState.Awarding:
				temp = "And the winner of\ngame " + this.gameNo + " is ...";
				break;

			case GameState.Awarded:
				temp = "And the winner of\ngame " + this.gameNo + " is " + this.winnerName + ".";
				break;

			default:
				temp = null;
				break;
		}

		try { this.removeChild(this.description); } catch(err) {}
		this.description = new PIXI.Text(temp,this.descFontStyle);
		this.description.alpha = 1;
		this.description.x = this.frame.height - kBarHeight;
		this.description.y = (this.frame.height - kBarHeight - 2 * this.description.height) / 2;
		this.addChild(this.description);
	}

	setCoins(value) {
		try { this.removeChild(this.coinLabel); } catch(err) {}
		this.coinLabel = new PIXI.Text("$" + value,this.coinFontStyle);
		this.coinLabel.alpha = 1;
		this.coinLabel.x = frame.width - 3 * (kGoldCoinSize + kGoldCoinOffset);
		this.coinLabel.y = frame.height - this.coinLabel.height - kBarHeight;
		this.addChild(this.coinLabel);
	}

	setPlayerImageFromFile(filePath) {
	}

	setCountry(country) {
		try { this.removeChild(this.countryImage); } catch(err) {}
		this.countryImage = new PIXI.Sprite(loader.resources['images/flags.json'].textures[country]);
		this.countryImage.x = kImageBorder + w - kFlagWidth + 1;
		this.countryImage.y = kImageBorder + w - kFlagHeight;
		this.countryImage.width = kFlagWidth;
		this.countryImage.height = kFlagHeight;
		this.addChild(this.countryImage);
	}

	setHideCoins(hide) {
		this.hideCoins = hide;
		this.coinLabel.visible = hide;
	}

	animateMyScore() {
		let target1 = { position:undefined, rotation:undefined, alpha:0 };
		let target2 = { position:undefined, rotation:undefined, alpha:1 };
		for (let i = 0; i < 3; ++i) {
			let delay = i * 200;
			animate(this.coinLabel,100,delay,target1,AnimationOption.Linear,
				animate,this.coinLabel,100,0,target2,AnimationOption.Linear);
		}
	}

	animateDescription() {
		let target1 = { position:undefined, rotation:undefined, alpha:0 };
		let target2 = { position:undefined, rotation:undefined, alpha:1 };
		animate(this.coinLabel,350,0,target1,AnimationOption.Linear,
			animate,this.coinLabel,350,0,target2,AnimationOption.Linear);
		if (this.description != null && !this.stopDescriptionAnimation) {
			setTimeout(this.animateDescription,700);
		}
	}

	startDescriptionAnimation() {
		this.stopDescriptionAnimation = false;
		this.animateDescription();
	}

	stopDescriptionAnimation() {
		this.stopDescriptionAnimation = true;
	}
}

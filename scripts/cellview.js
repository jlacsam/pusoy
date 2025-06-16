const kStarFontSize = 16;
const kSmallFontSize = 16;
const kBigFontSize = 36;
const kPotMoneyFontSize = 24;
const kFlagWidth = 32;
const kFlagHeight = 26;
const kGameNoWidth = 80;
const kWatchPlaySize = 64;
const kTextMargin = 6;
const kMessageSize = 26;

class CellView extends PIXI.Container {
	constructor(frame) {
		super();
		this.playerID = null;
		this.pokerGameData = null;
		this.textColor = 'black';
		this.backColor = 'white';
		this.selected = -1;
		this.frame = frame;
		this.gameNo = 0;
		this.winner = "nobody";
		this.viewAdviser = null;

		this.background = new PIXI.Graphics();
		this.background.beginFill(this.backColor);
		this.background.drawRect(0,0,kGameNoWidth,frame.height);
		this.background.endFill();
		this.background.x = 0;
		this.background.y = 0;
		this.addChild(this.background);

		this.highlight = new PIXI.Graphics();
		this.highlight.beginFill(0xFFFFFF);
		this.highlight.drawRect(0,0,frame.width,frame.height);
		this.highlight.endFill();
		this.highlight.x = 0;
		this.highlight.y = 0;
		this.highlight.alpha = 0;
		this.addChild(this.highlight);

		this.labelGameFontStyle = new PIXI.TextStyle({
			fontFamily:'Helvetica',fontSize:kSmallFontSize,fill:this.textColor });
		this.labelGame = new PIXI.Text("GAME",this.labelGameFontStyle);
		this.labelTimeLeft = new PIXI.Text("-",this.labelGameFontStyle);

		this.labelGameNoFontStyle = new PIXI.TextStyle({
			fontFamily:'Helvetica',fontSize:kBigFontSize,fill:this.textColor });
		this.labelGameNo = new PIXI.Text(this.gameNo,this.labelGameNoFontStyle);

		let totalHeight = this.labelGame.height + this.labelGameNo.height + this.labelTimeLeft.height;
		this.labelGame.x = (kGameNoWidth - this.labelGame.width) / 2;
		this.labelGame.y = (frame.height - totalHeight) / 2;
		this.labelGameNo.x = (kGameNoWidth - this.labelGameNo.width) / 2;
		this.labelGameNo.y = this.labelGame.y + this.labelGame.height;
		this.labelTimeLeft.x = (kGameNoWidth - this.labelTimeLeft.width) / 2;
		this.labelTimeLeft.y = this.labelGameNo.y + this.labelGameNo.height;

		this.addChild(this.labelGame);
		this.addChild(this.labelGameNo);
		this.addChild(this.labelTimeLeft);
	}

	draw() {
		if (this.pokerGameData == null) {
			console.log("Poker game data is empty. Nothing to draw.");
			return;
		}

		this.gameNo = this.pokerGameData.gameNo;
		this.winner = this.pokerGameData.winner;

		// Update GameNo
		try { this.removeChild(this.labelGameNo); } catch(err) {}
		this.labelGameNoFontStyle = new PIXI.TextStyle({
			fontFamily:'Helvetica',fontSize:kBigFontSize,fill:this.textColor });
		this.labelGameNo = new PIXI.Text(this.gameNo,this.labelGameNoFontStyle);
		this.labelGameNo.y = this.labelGame.y + this.labelGame.height;
		if (this.labelGameNo.width < kGameNoWidth) {
			this.labelGameNo.x = (kGameNoWidth - this.labelGameNo.width) / 2;
		} else {
			this.labelGameNo.x = 0;
			this.labelGameNo.width = kGameNoWidth;
		}
		this.addChild(this.labelGameNo);

		// Update text color of labelTimeLeft
		this.labelTimeLeft.style.fill = this.textColor;

		// Determine the cards of each hand
		let poker = new Poker();
		poker.shuffleDeck(this.gameNo);
		poker.distributeCards();

		let isGamePlayedByMe = false;
	}

	drawCheckered() {

	}

	drawCards(cards) {

	}

	drawSuitValue(suit,value,reference) {

	}

	setPointerUp(f) {

	}

	setPointerDown(f) {

	}

	getLevel() {

	}

	getGameNo() {

	}

	hideHighlight() {

	}

	getProfilePic(player) {

	}

	getFontSizeOfHandType(handType) {

	}

	potOfMetal(handType) {

	}

	animateAdvisory() {

	}

	setPokerGameDict(value) {

	}

	updateTimeLeft() {

	}

	rotate() {

	}
}

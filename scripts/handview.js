const kProfilePicWidth        = 100.0;
const kProfilePicHeight       = 100.0;
const kCountryFlagWidth       = 48.0;
const kCountryFlagHeight      = 40.5;
const kLabelFontSize          = 17.0;
const kScoreFontSize          = 34.0;
const kMessageFontSize        = 14.0;
const kWhiteFlagFontSize      = 34.0;
const kMessageLines           = 2.0;
const kProfilePicMargin       = 12.0;
const kProfilePicBorder       = 6.0;
const kMatchHandInfoFontSize  = 36.0;
const kHandTypeOffsetStart    = 36.0;
const kHandTypeOffsetUp       = 18.0;
const kHandTypeOffsetDown     = 125.0;
const kMessageWidth           = 248.0;

class HandView extends PIXI.Container {
	constructor (frame) {
		super();
		this.cardViews = null;
		this.unitAndle = kUnitAngle;
		this.distanceBetweenRows = 0.5;
		this.drawBorder = false;
		this.scoreLabels = [];
		this.handTypeLabels = [];

		// Inherited properties
		this.x = frame.x;
		this.y = frame.y;
		this.width = frame.width;
		this.height = frame.height;
		this.interactive = false;
		this.buttonmode = false;

		let fontStyle = new PIXI.TextStyle({ fontFamily : 'Arial', fontSize : kScoreFontSize, fill : 'white'});
		for (let i = 0; i < 3; ++i) {
			let scoreString = new PIXI.Text("+99",fontStyle);
			this.addChild(scoreString);
			this.scoreLabels.push(scoreString);
		}

		fontStyle = new PIXI.TextStyle({ fontFamily : 'Arial', fontSize : kMatchHandInfoFontSize, fill : 'white'});
		for (let i = 0; i < 3; ++i) {
			let handTypeString = "Straight flush";
			this.addChild(handTypeString);
			this.handTypeLabels.push(handTypeString);
		}

		this.viewScroll = new PIXI.Container();
		this.viewScroll.x = 0;
		this.viewScroll.y = 0;
		this.viewScroll.width = frame.width;
		this.viewScroll.height = frame.height;
		this.addChild(this.viewScroll);

		this.imageProfile = new PIXI.Sprite(loader.resource[/*todo*/].texture);
		this.x = kProfilePicMargin;
		this.y = kProfilePicMargin;
		this.width = kProfilePicWidth;
		this.height = kProfilePicHeight;
		this.visible = true;
		this.addChild(this.imageProfile);
	}

	setPlayer(player) {
	}

	getHomeFromRowCol(row,col,angle,distance) {
		let cardSize = CardView.preferredCardSize();
		let anchor = this.getAnchorPointFromRow(row,distance);
		let effectiveAngle = 
	}
}

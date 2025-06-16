const kCardWidth = 240;
const kCardHeight = 358;
const kShadowWidth = 280;
const kShadowHeight = 398;
const kOuterMargin = 12;
const kInnerMargin = 20;
const kImageMargin = 15;
const kSpacer = 0;
const kValueFontSize = 38;
const kSmallSymbolFontSize = 19;
const kSymbolFontSize = 38;

const CardCorner = {
	TopRight    : 0,
	TopLeft     : 1,
	BottomLeft  : 2,
	BottomRight : 3
};

class CardView extends PIXI.Container {
	constructor (cardSuit,cardValue) {
		super();
		this.card = new Card(cardSuit,cardValue);
		this.cardID = this.card.cardID;
		this.suit = cardSuit;
		this.value = cardValue;
		this.altvalue = this.card.altvalue;
		this.label = this.card.label;
		this.home = { x:0, y:0 };
		this.restAngle = 0.0;
		this.flareAngle = 0.0;
		this.flareHome = { x:0, y:0 };
		this.pack = 0;
		this.index = 0;
		this.slot = 0;
		this.row = 0;
		this.col = 0;
		this.facingUp = true;
		this.frame = CardView.preferredCardRect();
		this.fontColor = cardSuit == CardSuit.Clubs || cardSuit == CardSuit.Spades ? 'black' : 'red';
		this.fontStyle = new PIXI.TextStyle(
			{ fontFamily : 'Helvetica', fontSize : kValueFontSize, fill : this.fontColor });
		this.smallSymbolFontStyle = new PIXI.TextStyle(
			{ fontFamily : 'Helvetica', fontSize : kSmallSymbolFontSize/symbolFillRatio, fill : this.fontColor });
		this.symbolFontStyle = new PIXI.TextStyle(
			{ fontFamily : 'Helvetica', fontSize : kSymbolFontSize/symbolFillRatio, fill : this.fontColor });
		this.suitSymbol = this.getSuitSymbol(cardSuit);
		this.center = { x:this.frame.width/2.0, y:this.frame.height/2.0 };
		this.dragAnchor = new PIXI.Point(0,0);
		this.dragPoint = new PIXI.Point(0,0);

		// Inherited properties
		this.alpha = 1;
		this.rotation = 0.0;
		this.x = this.frame.x;
		this.y = this.frame.y;
		this.width = this.frame.width;
		this.height = this.frame.height;
		this.pivot.x = this.frame.width/2;
		this.pivot.y = this.frame.height/2;
		this.interactive = true;
		this.buttonmode = true;
	}

	showProperties() {
		console.log(this.cardID + ":x=" + this.x + ",y=" + this.y + ",width=" + this.width + 
			",height=" + this.height + ",pivot.x=" + this.pivot.x + ",pivot.y=" + this.pivot.y);
		console.log("\tslot=" + this.slot);
		console.log("\thome=" + this.home.x + "," + this.home.y);
	}

	setDragStart(f) {
		this.on('pointerdown',f);
	}

	setDragEnd(f) {
		this.on('pointerup',f);
		this.on('pointerupoutside',f);
	}

	setDragMove(f) {
		this.on('pointermove',f);
	}

	setScale(factor) {
		this.width = factor * this.frame.width;
		this.height = factor * this.frame.height;
	}

	static getScaleFactor() {
		let idealWidth = 2.5 * kCardWidth;
		let wRatio = window.innerWidth / idealWidth;
		let idealHeight = 2.5 * kCardHeight;
		let hRatio =  window.innerHeight / idealHeight;
		if (PIXI.utils.isMobile.apple.phone || PIXI.utils.isMobile.android.phone) {
			return wRatio < hRatio ? wRatio : hRatio;
		} else {
			if (wRatio > 1 && hRatio > 1) {
				return 1;
			} else {
				return wRatio < hRatio ? wRatio : hRatio;
			}
		}
	}

	static preferredCardSize() {
		return { width : kCardWidth, height : kCardHeight };
	}

	static preferredCardRect() {
		return { x : 0, y : 0, width : kCardWidth, height : kCardHeight };
	}

	static preferredShadowSize() {
		return { width : kShadowWidth, height : kShadowHeight };
	}

	static preferredShadowRect() {
		return { x:0, y:0, width : kShadowWidth, height : kShadowHeight };
	}

	static effectiveCardSize() {
		let scaleFactor = CardView.getScaleFactor();
		return { width : scaleFactor * kCardWidth, height : scaleFactor * kCardHeight };
	}

	static effectiveCardRect() {
		let scaleFactor = CardView.getScaleFactor();
		return { x : 0, y : 0, width : scaleFactor * kCardWidth, height : scaleFactor * kCardHeight };
	}

	sortedHand(hand,usealt) {
	}

	setCenter(point) {
		this.x = point.x;
		this.y = point.y;
	}

	draw() {
		let img = this.facingUp ? 'images/frontside.png' : 'images/backside.png';
		let background = new PIXI.Sprite(loader.resources[img].texture);
		background.x = 0;
		background.y = 0;
		background.visible = true;
		this.addChild(background);

		switch (this.value) {
			case 1:
				this.drawAce();
				break;
			case 2:
				this.drawTwo();
				break;
			case 3:
				this.drawThree();
				break;
			case 4:
				this.drawFour();
				break;
			case 5:
				this.drawFive();
				break;
			case 6:
				this.drawSix();
				break;
			case 7:
				this.drawSeven();
				break;
			case 8:
				this.drawEight();
				break;
			case 9:
				this.drawNine();
				break;
			case 10:
				this.drawTen();
				break;
			case 11:
				this.drawJack();
				break;
			case 12:
				this.drawQueen();
				break;
			case 13:
				this.drawKing();
				break;
			default:
				break;
		}  
	}

	getSuitSymbol() {
		switch (this.suit) {
			case CardSuit.Spades:
				return SuitSymbol.Spade;
			case CardSuit.Clubs:
				return SuitSymbol.Club;
			case CardSuit.Hearts:
				return SuitSymbol.Heart;
			case CardSuit.Diamonds:
			default:
				return SuitSymbol.Diamond;
		}
	}

	getSuitImage() {
		let royalty;
		switch (this.value) {
			case 11:
				royalty= "jack";
				break;
			case 12:
				royalty= "queen";
				break;
			case 13:
			default:
				royalty= "king";
				break;
		}

		let suitName;
		switch (this.suit) {
			case CardSuit.Spades:
				suitName = "spade";
				break;
			case CardSuit.Clubs:
				suitName = "club";
				break;
			case CardSuit.Hearts:
				suitName = "heart";
				break;
			case CardSuit.Diamonds:
			default:
				suitName = "diamond";
				break;
		}

		return 'images/' + royalty + '_' + suitName + '.png';
	}

	getCardCornerPoint(corner) {
		let w = width / 2.0;
		let h = height / 2.0;
		let r = Math.sqrt(w * w + h * h);
		let alpha = Math.acos(h/r);
		let cornerPoint = { x:0, y:0 };
		let centerPoint = { x:width/2.0, y:height/2.0 };
		let angle = this.rotation;

		switch (corner) {
			case CardCorner.TopRight:
				cornerPoint.x = centerPoint.x + r * Math.sin(alpha + angle);
				cornerPoint.y = centerPoint.y - r * Math.cos(alpha + angle);
				break;
			case CardCorner.TopLeft:
				cornerPoint.x = centerPoint.x - r * Math.sin(alpha - angle);
				cornerPoint.y = centerPoint.y - r * Math.cos(alpha - angle);
				break;
			case CardCorner.BottomLeft:
				cornerPoint.x = centerPoint.x - r * Math.sin(alpha + angle);
				cornerPoint.y = centerPoint.y + r * Math.cos(alpha + angle);
				break;
			case CardCorner.BottomRight:
			default:
				cornerPoint.x = centerPoint.x + r * Math.sin(alpha - angle);
				cornerPoint.y = centerPoint.y + r * Math.cos(alpha - angle);
				break;
		}

		return cornerPoint;
	}

	drawValueAndSymbol() {
		// Draw card value at upper left
		let text1 = new PIXI.Text(this.label,this.fontStyle);
		text1.x = kOuterMargin;
		text1.y = kOuterMargin;
		this.addChild(text1);

		// Draw symbol at upper left
		let symbol1 = new PIXI.Text(this.suitSymbol,this.smallSymbolFontStyle);
		let pixels = app.renderer.plugins.extract.pixels(symbol1);
		let symbolFrame = Utilities.getMarginFrame(pixels,symbol1.width,symbol1.height);
		symbol1.x = kOuterMargin + (text1.width - symbol1.width) / 2.0;
		symbol1.y = kOuterMargin + text1.height + kSpacer - symbolFrame.y;
		this.addChild(symbol1);

		// Draw card value at lower right
		let text2 = new PIXI.Text(this.label,this.fontStyle);
		text2.x = this.frame.width - kOuterMargin - text2.width/2.0;
		text2.y  = this.frame.height - kOuterMargin - text2.height/2.0;
		text2.anchor.set(0.5,0.5);
		text2.rotation = Math.PI;
		this.addChild(text2);

		// Draw symbol at lower right
		let symbol2 = new PIXI.Text(this.suitSymbol,this.smallSymbolFontStyle);
		symbol2.x = this.frame.width - kOuterMargin - symbol2.width/2.0 - (text2.width - symbol2.width)/2.0;
		symbol2.y  = this.frame.height - kOuterMargin - kSpacer - symbol2.height/2.0 
			- text2.height + symbolFrame.y;
		symbol2.anchor.set(0.5,0.5);
		symbol2.rotation = Math.PI;
		this.addChild(symbol2);
	}

	drawAce() {
		this.drawValueAndSymbol();
		let symbol = new PIXI.Text(this.suitSymbol,this.symbolFontStyle);
		symbol.x = this.center.x - symbol.width / 2.0;
		symbol.y = this.center.y - symbol.height / 2.0;
		this.addChild(symbol);
	}

	drawTwo() {
		this.drawValueAndSymbol();

		let symbol = new PIXI.Text(this.suitSymbol,this.symbolFontStyle);
		symbol.x = this.center.x - symbol.width / 2.0;
		symbol.y = (this.frame.height - 2.0*kInnerMargin)/3.0 + kInnerMargin - symbol.height/2.0;
		this.addChild(symbol);

		symbol = new PIXI.Text(this.suitSymbol,this.symbolFontStyle);
		symbol.x = this.center.x - symbol.width / 2.0;
		symbol.y = 2.0*(this.frame.height - 2.0*kInnerMargin)/3.0 + kInnerMargin - symbol.height/2.0;
		this.addChild(symbol);
	}

	drawThree() {
		this.drawValueAndSymbol();

		let rowHeight = (this.frame.height - 2.0*kInnerMargin)/4.0;
		let symbol, i;

		for (i = 1; i <= 3; i++) {
			symbol = new PIXI.Text(this.suitSymbol,this.symbolFontStyle);
			symbol.x = this.center.x - symbol.width / 2.0;
			symbol.y = i*rowHeight + kInnerMargin - symbol.height/2.0;
			this.addChild(symbol);
		}
	}

	drawFour() {
		this.drawValueAndSymbol();

		let colWidth = (this.frame.width - 2.0*kInnerMargin)/3.0;
		let rowHeight = (this.frame.height - 2.0*kInnerMargin)/3.0;

		let symbol, i, j;
		for (i = 1; i <= 2; i++) {
			for (j = 1; j <= 2; j++) {
				symbol = new PIXI.Text(this.suitSymbol,this.symbolFontStyle);
				symbol.x = i*colWidth + kInnerMargin - symbol.width/2.0
				symbol.y = j*rowHeight + kInnerMargin - symbol.height/2.0;
				this.addChild(symbol);
			}
		}
	}

	drawFive() {
		this.drawValueAndSymbol();

		let colWidth = (this.frame.width - 2.0*kInnerMargin)/4.0;
		let rowHeight = (this.frame.height - 2.0*kInnerMargin)/4.0;

		let symbol, i, j;
		for (i = 1; i <= 3; i++) {
			for (j = 1; j <= 3; j++) {
				if (i != 2 && j != 2) {
					symbol = new PIXI.Text(this.suitSymbol,this.symbolFontStyle);
					symbol.x = i*colWidth + kInnerMargin - symbol.width/2.0
					symbol.y = j*rowHeight + kInnerMargin - symbol.height/2.0;
					this.addChild(symbol);
				}
			}
		}

		symbol = new PIXI.Text(this.suitSymbol,this.symbolFontStyle);
		symbol.x = this.center.x - symbol.width/2.0
		symbol.y = this.center.y - symbol.height/2.0;
		this.addChild(symbol);
	}

	drawSix() {
		this.drawValueAndSymbol();

		let colWidth = (this.frame.width - 2.0*kInnerMargin)/3.0;
		let rowHeight = (this.frame.height - 2.0*kInnerMargin)/4.0;

		let symbol, i, j;
		for (i = 1; i <= 2; i++) {
			for (j = 1; j <= 3; j++) {
				symbol = new PIXI.Text(this.suitSymbol,this.symbolFontStyle);
				symbol.x = i*colWidth + kInnerMargin - symbol.width/2.0
				symbol.y = j*rowHeight + kInnerMargin - symbol.height/2.0;
				this.addChild(symbol);
			}
		}
	}

	drawSeven() {
		this.drawValueAndSymbol();

		let colWidth = (this.frame.width - 2.0*kInnerMargin)/4.0;
		let rowHeight = (this.frame.height - 2.0*kInnerMargin)/4.0;

		let symbol, i, j;
		for (i = 1; i <= 3; i++) {
			for (j = 1; j <= 3; j++) {
				if (i != 2) {
					symbol = new PIXI.Text(this.suitSymbol,this.symbolFontStyle);
					symbol.x = i*colWidth + kInnerMargin - symbol.width/2.0
					symbol.y = j*rowHeight + kInnerMargin - symbol.height/2.0;
					this.addChild(symbol);
				}
			}
		}

		symbol = new PIXI.Text(this.suitSymbol,this.symbolFontStyle);
		symbol.x = this.center.x - symbol.width/2.0
		symbol.y = 1.5*rowHeight + kInnerMargin - symbol.height/2.0;
		this.addChild(symbol);
	}

	drawEight() {
		this.drawValueAndSymbol();

		let colWidth = (this.frame.width - 2.0*kInnerMargin)/4.0;
		let rowHeight = (this.frame.height - 2.0*kInnerMargin)/4.0;

		let symbol, i, j;
		for (i = 1; i <= 3; i++) {
			for (j = 1; j <= 3; j++) {
				if (i != 2) {
					symbol = new PIXI.Text(this.suitSymbol,this.symbolFontStyle);
					symbol.x = i*colWidth + kInnerMargin - symbol.width/2.0
					symbol.y = j*rowHeight + kInnerMargin - symbol.height/2.0;
					this.addChild(symbol);
				}
			}
		}

		symbol = new PIXI.Text(this.suitSymbol,this.symbolFontStyle);
		symbol.x = this.center.x - symbol.width/2.0
		symbol.y = 1.5*rowHeight + kInnerMargin - symbol.height/2.0;
		this.addChild(symbol);

		symbol = new PIXI.Text(this.suitSymbol,this.symbolFontStyle);
		symbol.x = this.center.x - symbol.width/2.0
		symbol.y = 2.5*rowHeight + kInnerMargin - symbol.height/2.0;
		this.addChild(symbol);
	}

	drawNine() {
		this.drawValueAndSymbol();

		let colWidth = (this.frame.width - 2.0*kInnerMargin)/4.0;
		let rowHeight = (this.frame.height - 2.0*kInnerMargin)/5.0;

		let symbol, i, j;
		for (i = 1; i <= 3; i++) {
			for (j = 1; j <= 4; j++) {
				if (i != 2) {
					symbol = new PIXI.Text(this.suitSymbol,this.symbolFontStyle);
					symbol.x = i*colWidth + kInnerMargin - symbol.width/2.0
					symbol.y = j*rowHeight + kInnerMargin - symbol.height/2.0;
					this.addChild(symbol);
				}
			}
		}

		symbol = new PIXI.Text(this.suitSymbol,this.symbolFontStyle);
		symbol.x = this.center.x - symbol.width/2.0
		symbol.y = this.center.y - symbol.height/2.0;
		this.addChild(symbol);
	}

	drawTen() {
		this.drawValueAndSymbol();

		let colWidth = (this.frame.width - 2.0*kInnerMargin)/4.0;
		let rowHeight = (this.frame.height - 2.0*kInnerMargin)/5.0;

		let symbol, i, j;
		for (i = 1; i <= 3; i++) {
			for (j = 1; j <= 4; j++) {
				if (i != 2) {
					symbol = new PIXI.Text(this.suitSymbol,this.symbolFontStyle);
					symbol.x = i*colWidth + kInnerMargin - symbol.width/2.0
					symbol.y = j*rowHeight + kInnerMargin - symbol.height/2.0;
					this.addChild(symbol);
				}
			}
		}

		symbol = new PIXI.Text(this.suitSymbol,this.symbolFontStyle);
		symbol.x = this.center.x - symbol.width/2.0
		symbol.y = 1.5*rowHeight + kInnerMargin - symbol.height/2.0;
		this.addChild(symbol);

		symbol = new PIXI.Text(this.suitSymbol,this.symbolFontStyle);
		symbol.x = this.center.x - symbol.width/2.0
		symbol.y = 3.5*rowHeight + kInnerMargin - symbol.height/2.0;
		this.addChild(symbol);
	}

	drawJack() {
		this.drawValueAndSymbol();
		let img = this.getSuitImage();
		let sprite = new PIXI.Sprite(loader.resources[img].texture);
		sprite.x = 0;
		sprite.y = 0;
		sprite.visible = true;
		this.addChild(sprite);
	}

	drawQueen() {
		this.drawValueAndSymbol();
		let img = this.getSuitImage();
		let sprite = new PIXI.Sprite(loader.resources[img].texture);
		sprite.x = 0;
		sprite.y = 0;
		sprite.visible = true;
		this.addChild(sprite);
	}

	drawKing() {
		this.drawValueAndSymbol();
		let img = this.getSuitImage();
		let sprite = new PIXI.Sprite(loader.resources[img].texture);
		sprite.x = 0;
		sprite.y = 0;
		sprite.visible = true;
		this.addChild(sprite);
	}
}

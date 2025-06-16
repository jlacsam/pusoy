const kRatingSize = 18;
const kHandTypeSize = 18;
const kSubvalueSize = 11;

class HandInfoView extends PIXI.Container {
	constructor (frame,compressed = false) {
		super();
		this.handType = null;
		this.handSubvalue = null;
		this.starRating = null;
		this.handInfo = null;
		this.textColor = ThemeStyles[Themes.PokerTable].HandInfoFgColor;
		this.backColor = PIXI.utils.string2hex(ThemeStyles[Themes.PokerTable].HandInfoBgColor);
		this.row = 0;
		this.highlight = null;
		this.bonus = 0;
		this.frame = frame;
		this.compressed = compressed;

		this.alpha = 1;
		this.rotation = 0;
		this.x = frame.x;
		this.y = frame.y;
		this.width = frame.width;
		this.height = frame.height;
		this.interactive = true;
		this.buttonmode = true;

		this.background = new PIXI.Graphics();
		this.background.beginFill(this.backColor);
		this.background.drawRect(0,0,frame.width,frame.height);
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

		this.starRatingFontStyle = new PIXI.TextStyle({ 
			fontFamily:'Helvetica',fontSize:kRatingSize,fill:'gold'});
		this.handTypeFontStyle = new PIXI.TextStyle({ 
			fontFamily:'Helvetica',fontSize:kHandTypeSize,fill:this.textColor});
		this.handSubvalueFontStyle = new PIXI.TextStyle({ 
			fontFamily:'Helvetica',fontSize:kSubvalueSize,fill:this.textColor});

		this.bar = new PIXI.Graphics();
		this.bar.beginFill(0xF0F0F0);
		this.bar.drawRect(0,0,frame.width,kBarHeight);
		this.addChild(this.bar);
	}

	setPointerDown(f) {
		this.on('pointerdown',f);
	}

	setPointerUp(f) {
		this.on('pointerup',f);
		this.on('pointerupoutside',f);
	}

	dumpHandInfo() {
		console.log("Star Rating: " + Poker.getHandTypeRating(this.handInfo.handType));
		console.log("Hand Type: " + Poker.getHandTypeString(this.handInfo.handType));
		console.log("Hand Subvalue: " + Poker.getSubvalueString(this.handInfo.handType,this.handInfo.values));
	}

	showHandInfo(handInfo) {
		this.handInfo = handInfo;

		this.starRating = new PIXI.Text(Poker.getHandTypeRating(handInfo.handType),
			this.starRatingFontStyle);
		this.handType = new PIXI.Text(Poker.getHandTypeString(handInfo.handType),
			this.handTypeFontStyle);
		this.handSubvalue = new PIXI.Text(Poker.getSubvalueString(handInfo.handType,handInfo.values),
			this.handSubvalueFontStyle);

		if (this.compressed) {
			let w = this.starRating.width + this.handType.width;
			let h = this.handType.height + this.handSubvalue.height;
			this.starRating.x = (this.frame.width - w) / 2;
			this.starRating.y = (this.frame.height - this.starRating.height) / 2;
			this.handType.x = this.starRating.x + this.starRating.width;
			this.handType.y = (this.frame.height - h) / 2;
			this.handSubvalue.x = this.handType.x;
			this.handSubvalue.y = this.handType.y + this.handType.height;
		} else {
			this.starRating.x = (this.frame.width - this.starRating.width) / 2;
			this.starRating.y = kBarHeight + 2.0;
			this.handType.x = (this.frame.width - this.handType.width) / 2;
			this.handType.y = this.starRating.y + this.starRating.height;
			this.handSubvalue.x = (this.frame.width - this.handSubvalue.width) / 2;
			this.handSubvalue.y = this.handType.y + this.handType.height;
		}

		this.addChild(this.starRating);
		this.addChild(this.handType);
		this.addChild(this.handSubvalue);
	}

	resetHandInfo() {
		this.removeChild(this.starRating);
		this.removeChild(this.handType);
		this.removeChild(this.handSubvalue);
	}

	animateHandInfo() {
		let target = { position:undefined, rotation:undefined, alpha:0 };
		let completion = { position:undefined, rotation:undefined, alpha:1 };
		for (let i = 0; i < 3; i++) {
			animate(this.starRating,100,100*i,target,AnimationOption.SlowDown,completion);
			animate(this.handType,100,100*i,target,AnimationOption.SlowDown,completion);
			animate(this.handSubvalue,100,100*i,target,AnimationOption.SlowDown,completion);
		}
	}

	showHighlight() {
		this.highlight.alpha = 0.1;
	}

	hideHighlight() {
		this.highlight.alpha = 0;
	}
};

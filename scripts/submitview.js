const kCheckSymbol = '\u2713';
const kCrossSymbol = '\u2715';
const kSubmitFontSize = 32;

class SubmitView extends PIXI.Container {
	constructor (frame,compressed = false) {
		super();
		this.textColor = ThemeStyles[Themes.PokerTable].ButtonFgColor;
		this.backColor = ThemeStyles[Themes.PokerTable].ButtonBgColor;
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
		this.callback = undefined;

		this.background = new PIXI.Graphics();    
		this.background.beginFill(PIXI.utils.string2hex(this.backColor));
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

		this.labelFontStyle = new PIXI.TextStyle({ fontFamily:'Helvetica',
			fontSize:kSubmitFontSize,fill:this.textColor });
		this.labelCross = new PIXI.Text(kCrossSymbol,this.labelFontStyle);
		this.labelCross.alpha = 1;
		this.labelCross.x = (frame.width - this.labelCross.width) / 2;
		this.labelCross.y = (frame.height - this.labelCross.height) / 2;
		this.addChild(this.labelCross);

		this.labelCheck = new PIXI.Text(kCheckSymbol,this.labelFontStyle);
		this.labelCheck.alpha = 0;
		this.labelCheck.x = (frame.width - this.labelCheck.width) / 2;
		this.labelCheck.y = (frame.height - this.labelCheck.height) / 2;
		this.addChild(this.labelCheck);

		this.circle = new PIXI.Graphics();
		this.circle.lineStyle(3,PIXI.utils.string2hex(this.textColor),1);
		this.circle.drawCircle(frame.width/2,frame.height/2,(frame.height/2)-5);
		this.circle.endFill();
		this.addChild(this.circle);

		this.bar = new PIXI.Graphics();
		this.bar.beginFill(0xF0F0F0);
		this.bar.drawRect(0,frame.height-kBarHeight,frame.width,kBarHeight);
		this.addChild(this.bar);
	}

	setLabel(label) {
		try { this.removeChild(this.label); } catch(err) {}
		this.label = new PIXI.Text(label,this.labelFontStyle);
		this.label.alpha = 1;
		this.label.x = (frame.width - this.label.width) / 2;
		this.label.y = (frame.height - this.label.height) / 2;
		this.addChild(this.label);
	}

	setCallback(f) {
		this.callback = f;
	}

	setPointerDown(f) {
		this.on('pointerdown',f);
	}

	setPointerUp(f) {
		this.on('pointerup',f);
	}

	showHighlight() {
		this.highlight.alpha = 0.1;
	}

	hideHighlight() {
		this.highlight.alpha = 0;
	}

	showCheckMark() {
		let target = { position:undefined, rotation:undefined, alpha:1 };
		animate(this.labelCheck,250,0,target,AnimationOption.SpeedUp);
		target = { position:undefined, rotation:undefined, alpha:0 };
		animate(this.labelCross,250,0,target,AnimationOption.SpeedUp);
	}

	showCrossMark() {
		let target = { position:undefined, rotation:undefined, alpha:1 };
		animate(this.labelCross,250,0,target,AnimationOption.SpeedUp);
		target = { position:undefined, rotation:undefined, alpha:0 };
		animate(this.labelCheck,250,0,target,AnimationOption.SpeedUp);
	}
}

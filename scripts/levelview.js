const kLevelFontSize = 16;
const kLevelNoFontSize = 36;

class LevelView extends PIXI.Container {
	constructor (frame,compressed = false) {
		super();
		this.textColor = ThemeStyles[Themes.PokerTable].LevelFgColor;
		this.backColor = PIXI.utils.string2hex(ThemeStyles[Themes.PokerTable].LevelBgColor);
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

		this.labelFontStyle = new PIXI.TextStyle({ fontFamily:'Helvetica',
			fontSize:kLevelFontSize,fill:this.textColor});
		this.levelFontStyle = new PIXI.TextStyle({ fontFamily:'Helvetica',
			fontSize:kLevelNoFontSize,fill:this.textColor});

		if (compressed) {
			this.label = new PIXI.Text("LEVEL 0",this.labelFontStyle);
			this.label.x = (frame.width - this.label.width) / 2;
			this.label.y = (frame.height - this.label.height) / 2;
			this.addChild(this.label);
		} else {
			this.label = new PIXI.Text("LEVEL",this.labelFontStyle);
			this.levelNo = new PIXI.Text("0",this.levelFontStyle);
			this.label.x = (frame.width - this.label.width) / 2;
			this.label.y = (frame.height - this.label.height - this.levelNo.height) / 2;
			this.levelNo.x = (frame.width - this.levelNo.width) / 2;
			this.levelNo.y = this.label.y + this.label.height;
			this.addChild(this.label);
			this.addChild(this.levelNo);
		}

		this.bar = new PIXI.Graphics();
		this.bar.beginFill(0xF0F0F0);
		this.bar.drawRect(0,frame.height-kBarHeight,frame.width,kBarHeight);
		this.addChild(this.bar);
	}

	setLevel(level) {
		try { 
			this.removeChild(this.label);
			this.removeChild(this.levelNo); 
		} catch(err) {}
		if (this.compressed) {
			this.label = new PIXI.Text("LEVEL "+level,this.labelFontStyle);
			this.label.x = (this.frame.width - this.label.width) / 2;
			this.label.y = (this.frame.height - this.label.height) / 2;
		} else {
			this.levelNo = new PIXI.Text(level.toString(),this.levelFontStyle);
			this.levelNo.x = (this.frame.width - this.levelNo.width) / 2;
			this.levelNo.y = this.label.y + this.label.height;
			this.levelNo.alpha = 1;
			this.addChild(this.levelNo);
		}
		this.addChild(this.label);
	}
}

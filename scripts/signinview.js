const kSelectedAlpha = 0.2;
const kUnselectedAlpha = 0.1;
const kSignInViewWidth = 365;
const kSignInViewHeight = 540;

class SignInView extends PIXI.Container {
	constructor (frame) {
		super();

		this.textColor = 'black';
		this.backColor = 'white';
		this.frame = frame;

		this.background = new PIXI.Graphics();
		this.background.beginFill(this.backColor);
		this.background.drawRect(0,0,frame.width,frame.height);
		this.background.endFill();
		this.background.x = 0;
		this.background.y = 0;
		this.addChild(this.background);

		this.logo = new PIXI.Sprite(loader.resources['images/signin_logo.png'].texture);
		this.logo.x = 0;
		this.logo.y = 0;
		this.addChild(this.logo);

		this.buttonGuest = new PIXI.Sprite(loader.resources['images/signin_guest.png'].texture);
		this.buttonGuest.x = 0;
		this.buttonGuest.y = this.logo.y + this.logo.height;
		this.buttonGuest.name = "buttonGuest";
		this.buttonGuest.selected = false;
		this.buttonGuest.interactive = true;
		this.buttonGuest.buttonmode = true;
		this.buttonGuest.on('pointerup',SignInView.signInAs);
		this.buttonGuest.on('pointerupoutside',SignInView.unhighlightButton);
		this.buttonGuest.on('pointerdown',SignInView.selectButton);
		this.buttonGuest.on('pointermove',SignInView.highlightButton);
		this.addChild(this.buttonGuest);
		
		this.buttonSignup = new PIXI.Sprite(loader.resources['images/signup.png'].texture);
		this.buttonSignup.x = 0;
		this.buttonSignup.y = this.buttonGuest.y + this.buttonGuest.height;
		this.buttonSignup.name = "buttonSignup";
		this.buttonSignup.selected = false;
		this.buttonSignup.interactive = true;
		this.buttonSignup.buttonmode = true;
		this.buttonSignup.on('pointerup',SignInView.signInAs);
		this.buttonSignup.on('pointerupoutside',SignInView.unhighlightButton);
		this.buttonSignup.on('pointerdown',SignInView.selectButton);
		this.buttonSignup.on('pointermove',SignInView.highlightButton);
		this.addChild(this.buttonSignup);

		this.buttonFB = new PIXI.Sprite(loader.resources['images/signin_fb.png'].texture);
		this.buttonFB.x = 0;
		this.buttonFB.y = this.buttonSignup.y + this.buttonSignup.height;
		this.buttonFB.name = "buttonFB";
		this.buttonFB.selected = false;
		this.buttonFB.interactive = true;
		this.buttonFB.buttonmode = true;
		this.buttonFB.on('pointerup',SignInView.signInAs);
		this.buttonFB.on('pointerupoutside',SignInView.unhighlightButton);
		this.buttonFB.on('pointerdown',SignInView.selectButton);
		this.buttonFB.on('pointermove',SignInView.highlightButton);
		this.addChild(this.buttonSignup);

		this.buttonGoogle = new PIXI.Sprite(loader.resources['images/signin_google.png'].texture);
		this.buttonGoogle.x = 0;
		this.buttonGoogle.y = this.buttonFB.y = this.buttonFB.height;
		this.buttonGoogle.name = "buttonGoogle";
		this.buttonGoogle.selected = false;
		this.buttonGoogle.interactive = true;
		this.buttonGoogle.buttonmode = true;
		this.buttonGoogle.on('pointerup',SignInView.signInAs);
		this.buttonGoogle.on('pointerupoutside',SignInView.unhighlightButton);
		this.buttonGoogle.on('pointerdown',SignInView.selectButton);
		this.buttonGoogle.on('pointermove',SignInView.highlightButton);
		this.addChild(this.buttonGoogle);

		this.highlight = new PIXI.Graphics();
		this.highlight.beginFill(0xFFFFFF);
		this.highlight.drawRect(0,0,frame.width,frame.height);
		this.highlight.endFill();
		this.highlight.x = 0;
		this.highlight.y = 0;
		this.highlight.alpha = 0;
		this.addChild(this.highlight);
	}

	static signInAs() {
		if (this.name == "buttonGuest") {
		} else if (this.name == "buttonSignin") {
		} else if (this.name == "buttonSignup") {
		} else if (this.name == "buttonFB") {
		} else if (this.name == "buttonGoogle") {
		} else {
			console.log("Unexpected sign in event.");
		}
	}

	static selectButton(event) {
		this.selected = true;
		this.parent.highlight.alpha = kSelectedAlpha;
		this.parent.highlight.x = this.x;
		this.parent.highlight.y = this.y;
		this.parent.highlight.width = this.width;
		this.parent.highlight.height = this.height;
		this.parent.highlight.visible = true;
	}

	static highlightButton() {
		this.parent.highlight.alpha = this.selected ? kSelectedAlpha : kUnselectedAlpha;
		this.parent.highlight.x = this.x;
		this.parent.highlight.y = this.y;
		this.parent.highlight.width = this.width;
		this.parent.highlight.height = this.height;
		this.parent.highlight.visible = true;
	}

	static unhighlightButton() {
		this.parent.highlight.visible = false;
	}
}

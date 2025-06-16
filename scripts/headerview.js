const kLeaderboardButtonWidth = 30;
const kLeaderboardButtonHeight = 30;
const kNewGameFontSize = 14;
const kTitleFontSize = 24;
const kTitleShadowRadius = 4;
const kTitleLeftMargin = 10;
const kDotsFontSize = 18;
const kGoldCoinSize = 32;
const kUnlockButtonWidth = 96;
const kUnlockButtonHeight = 32;
const kTitleShadowOpacity = 0.8;
const kCountdownFrom = 3;

class HeaderView extends PIXI.Container {
	constructor (frame) {
		super();
		this.level = 0;
		this.rating = 0;
		this.locked = true;
		this.unlock = null;

		this.background = new PIXI.Graphics();
		this.background.beginFill(0x808080);
		this.background.drawRect(0,0,frame.width,frame.height);
		this.background.endFill();
		this.background.x = 0;
		this.background.y = 0;
		this.addChild(this.background);

		this.titleFontStyle = new PIXI.TextStyle({ 
			fontFamily:'Helvetica',
			fontSize:kTitleFontSize,
			fill:'white',
			dropShadow:true,
			dropShadowAlpha:kTitleShadowOpacity,
			dropShadowAngle:0,
			dropShadowBlur:kTitleShadowRadius });
		this.title = new PIXI.Text("Level 1",this.titleFontStyle);
		this.title.x = kTitleLeftMargin;
		this.title.y = (frame.height - this.title.height) / 2;
		this.addChild(this.title);

		this.starsFontStyle = new PIXI.Textstyle({
			fontFamily:'Helvetica',
			fontSize:kTitleFontSize,
			fill:'yellow',
			dropShadow:true,
			dropShadowAlpha:kTitleShadowOpacity,
			dropShadowAngle:0,
			dropShadowBlur:kTitleShadowRadius });
		this.stars = new PIXI.Text("?",this.starsFontStyle);
		this.stars.x = this.title.x + this.title.width;
		this.stars.y = (frame.height - this.stars.height) / 2;
		this.addChild(this.stars);

		this.dotsFontStyle = new PIXI.TextStyle({
			fontFamily:'Helvetica',
			fontSize:kDotsFontSize,
			fill:'white' });
		this.dots = new PIXI.Text("...",this.dotsFontStyle);
		this.dots.x = frame.width - 2 * frame.height - kLeaderboardButtonWidth - kTitleLeftMargin;
		this.dots.y = (frame.height - this.dots.height) / 2;
		this.dots.visible = false;
		this.addChild(this.dots);

		this.animatedStarFontStyle = new PIXI.TextStyle({
			fontFamily:'Helvetica',
			fontSize:kTitleFontSize,
			fill:'yellow',
			dropShadow:true,
			dropShadowAlpha:kTitleShadowOpacity,
			dropShadowAngle:0,
			dropShadowBlur:kTitleShadowRadius });
		this.animatedStar = new PIXI.Text(kStarSymbol,this.animatedStarFontStyle);
		this.animatedStar.x = frame.width;
		this.animatedStar.y = (frame.height - this.animatedStar.height) / 2;
		this.animatedStar.visible = false;
		this.addChild(this.animatedStar);

		this.activityIndicator = new PIXI.Sprite(loader.resources['images/activity.png'].texture);
		this.activityIndicator.x = frame.width - frame.height - kLeaderboardButtonWidth - kTitleLeftMargin;
		this.activityIndicator.y = 0;
		this.activityIndicator.width = frame.height;
		this.activityIndicator.height = frame.height;
		this.activityIndicator.visible = false;
		this.addChild(this.activityIndicator);

		this.button = new PIXI.Sprite(loader.resources['images/leaderboard.png'].texture);
		this.button.x = frame.width - kLeaderboardButtonWidth - kTitleLeftMargin;
		this.button.y = (frame.height - kLeaderboardButtonHeight) / 2;
		this.button.width = kLeaderboardButtonWidth;
		this.button.height = kLeaderboardButtonHeight;
		this.button.visible = false;
		this.addChild(this.button);
	}

	static unlockPointerUp() {

	}

	static playMouseDown() {

	}

	static playMouseUp() {

	}

	setLocked(value) {
		this.locked = value;

		if (this.level == kBestMiddleLevelIndex) {
			if (this.locked) {
				if (this.unlock == null) {
					this.unlock = new PIXI.Sprite(loader.resource['images/unlock.png'].texture);
					this.unlock.x = this.frame.width - (kUnlockButtonWidth + 2.2 * kGoldCoinSize + 
						this.frame.height + 2 * kTitleLeftMargin);
					this.unlock.y = (this.frame.height - kUnlockButtonHeight) / 2;
					this.unlock.visible = true;
					this.unlock.interactive = true;
					this.unlock.buttonmode = true;
					this.unlock.on('pointerdown',HeaderView.playMouseDown);
					this.unlock.on('pointerup',HeaderView.unlockPointerUp);
					this.addChild(this.unlock);
				} else {
					this.unlock.visible = false;
				}
			} else {
				if (this.unlock != null) {
					this.unlock.visible = false;
					this.removeChild(this.unlock);
				}
			}
		}
	}

	draw() {
		let s;
		if (this.level == 0) {
			s = "Practice Games";
		} else if (this.level <= kMaxRegularLevels) {
			s = "Level " + this.level;
		} else if (this.level >= kBestMiddleLevelIndex) {
			s = kBestMiddleLevelTitle + " " + (this.level-KMaxRegularLevels);
		}

		try { this.removeChild(this.title); } catch(err) {}
		this.title = new PIXI.Text(s,this.titleFontStyle);
		this.title.x = kTitleLeftMargin;
		this.title.y = (frame.height - this.title.height) / 2;
		this.addChild(this.title);

		try { this.removeChild(this.stars); } catch(err) {}
		this.stars = new PIXI.Text(this.ratingToString(),this.starsFontStyle);
		this.stars.x = this.title.x + this.title.width;
		this.stars.y = (frame.height - this.stars.height) / 2;
		this.addChild(this.stars);

		if (this.level > 0) {
			this.live = new PIXI.Sprite(loader.resources['images/live.png'].texture);
			this.live.x = (this.frame.width - this.live.width) / 2;
			this.live.y = 0;
			this.addChild(this.live);
		}

		if (this.locked) {
			this.padlock = new PIXI.Sprite(loader.resources['images/padlock.png'].texture);
			this.padlock.x = this.frame.width - this.frame.height - kTitleLeftMargin;
			this.padlock.y = 0;
			this.padlock.width = this.frame.height;
			this.padlock.height = this.frame.height;
			this.addChild(this.padlock);
		}

		if (this.locked && this.level == kBestMiddleLevelIndex) {
			this.goldCoin = new PIXI.Sprite(loader.resources['images/tiny_gold_coin.png'].texture);
			this.goldCoin.x = this.frame.width - kGoldCoinSize - this.frame.height - kTitleLeftMargin;
			this.goldCoin.y = (this.frame.height - kGoldCointSize) / 2;
			this.goldCoin.width = kGoldCoinSize;
			this.goldCoin.height = kGoldCoinSize;
			this.addChild(this.goldCoin);

			// There are more stuff here but low priority
		}
	}

	ratingToString() {
		if (this.rating > kLevelGoal) {
			return kStarSymbol + " x" + this.rating;
		} else if (this.rating == kLevelGoal) {
			return kStarSymbol.repeat(this.rating);
		} else if (this.rating == 0) {
			return kHollowStarSymbol.repeat(kLevelGoal);
		} else {
			return kStarSymbol.repeat(this.rating) + 
				kHollowStarSymbol.repeat(kLevelGoal - this.rating);
		}
	}

	countdownToString(value) {
		if (value < 0) value = 0;
		if (value == kCountdownFrom) {
			return kCircleSymbol.repeat(kCountdownFrom);
		} else if (value == 0) {
			return kHollowCircleSymbol.repeat(kCountdownFrom);
		} else {
			return kCircleSymbol.repeat(value) + kHollowCircleSymbol.repeat(kCountdownFrom - value);
		}
	}

	newGamePointerUp() {

	}

	leaderboardPointerUp() {

	}

	setRating(value) {
		this.rating = value;
		try { this.removeChild(this.stars); } catch(err) {}
		this.stars = new PIXI.Text(this.ratingToString(),this.starsFontStyle);
		this.stars.x = this.title.x + this.title.width;
		this.stars.y = (frame.height - this.stars.height) / 2;
		this.addChild(this.stars);
	}

	animateStars() {
		if (this.rating == 0) {
			return;
		}
		this.animatedStar.anchor.set(0.5,0.5);
		this.animatedStar.x = this.frame.width + this.animatedStar.width / 2;
		this.animatedStar.y = this.frame.height / 2;
		this.animatedStar.rotation = 2 * Math.PI;
		this.animatedStar.alpha = 1;
		this.animatedStar.visible = true;
		let target = { position:undefined, rotation:0, alpha:undefined };

		if (this.rating <= kLevelGoal) {
			target.position = { x:this.stars.x + (this.rating-0.5) * this.animatedStar.width,
				y:this.animatedStar.y };
		} else {
			target.position = { x:this.stars.x + 0.5 * this.animatedStar.width,
				y:this.animatedStar.y };
		}
		animate(this.animatedStar,3000,0,target,AnimateOption.SlowDown);

		target.position = undefined;
		target.rotation = undefined;
		target.alpha = 0;
		animate(this.animatedStar,250,3000,target,AnimateOption.SlowDown);
	}

	startCountdown() {
		this.countdownToString(3);
		setTimeout(function() { this.countdownToString(2); },1000);
		setTimeout(function() { this.countdownToString(1); },2000);
		setTimeout(function() { this.countdownToString(0); },3000);
	}
}

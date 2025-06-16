const kDistanceTol                = 20.0;
const kContainsPointMargin        = 3.0;
const kTornPageRotation           = -1 * Math.PI/18.0;
const kPulloutPointFactor         = 2.25;
const kHintDisplayDelay           = 1.0;
const kMinPlayViewSpacing		  = 1.5;

const kEinsteinViewHomeRect       = { x:578, y:80, width:180, height:180 };
const kEinsteinViewStartRect      = { x:948, y:80, width:180, height:180 };
const kButtonMovieRect            = { x:128, y:256, width:512, height:512 };
const kSimpleBubbleViewRect       = { x:10, y:60, width:200, height:120 };
const kBetViewHomeRect            = { x:688, y:-472, width:80, height:472 };
const kBetViewEndRect             = { x:688, y:0, width:80, height:472 };

const kGameHandFontSize           = 18;
const kBubbleRect                 = { x:180, y:120, width:420, height:115 };
const kButtonSayRect              = { x:16, y:887, width:44, height:44 };
const kButtonSchemeRect           = { x:67, y:887, width:44, height:44 };
const kButtonSortRect             = { x:657, y:887, width:44, height:44 };
const kButtonAdviseRect           = { x:708, y:887, width:44, height:44 };
const kPatternViewRect            = { x:0, y:1024, width:768, height:665 };

const kAlertNotEnoughGold               = "You don't have enough gold coins. Buy gold coins?";
const kAlertAllHighCards                = "Your best poker hand is just a high card. Continue anyway?";
const kAlertCardsNotReady               = "Your cards are not completely arranged. Abandon game?";
const kAlertMiddleAndBackHandsReversed  = "Your middle hand can't be higher than your back hand.";
const kAlertFrontAndMiddleHandsReversed = "Your front hand can't be higher than your middle hand.";
const kAlertNoMovesMade                 = "You have not made any moves. Abandon game?";

class PlayView extends PIXI.Container {
	constructor (packOfCards) {

		super();

		this.cardArray = [];
		for (let i = 0; i < packOfCards.length; ++i) {
			let card = packOfCards[i];
			let cardView = new CardView(card.suit,card.value);
			cardView.setDragStart(PlayView.onDragStart);
			cardView.setDragEnd(PlayView.onDragEnd);
			cardView.setDragMove(PlayView.onDragMove);
			cardView.pack = 0;
			cardView.index = i;
			cardView.row = PlayView.getRowFromCardIndex(i);
			cardView.col = PlayView.getColFromCardIndex(i);
			cardView.slot = PlayView.getSlotFromRowCol(cardView.row,cardView.col);
			cardView.home = PlayView.getHomeFromRowCol(cardView.row,cardView.col,kUnitAngle);
			cardView.flareHome = PlayView.getHomeFromRowCol(cardView.row,cardView.col,kFlareFactor*kUnitAngle);
			cardView.restAngle = PlayView.getAngleFromRowCol(cardView.row,cardView.col,kUnitAngle);
			cardView.flareAngle = PlayView.getAngleFromRowCol(cardView.row,cardView.col,kFlareFactor*kUnitAngle);
			this.cardArray.push(cardView);
		}

		this.slotArray = [];
		for (let i = 0; i < kCardsOnHand + 3*kExtraSlotsPerRow; i++) {
			let slotView = new SlotView();
			slotView.index = i;
			slotView.row = PlayView.getRowFromSlotIndex(i);
			slotView.col = PlayView.getColFromSlotIndex(i);
			slotView.rotation = PlayView.getAngleFromRowCol(slotView.row,slotView.col,kUnitAngle);
			slotView.home = PlayView.getHomeFromRowCol(slotView.row,slotView.col,kUnitAngle);
			slotView.flareAngle = PlayView.getAngleFromRowCol(slotView.row,slotView.col,kFlareFactor*kUnitAngle);
			slotView.flareHome = PlayView.getHomeFromRowCol(slotView.row,slotView.col,kFlareFactor*kUnitAngle);
			slotView.extra = PlayView.isExtraSlot(slotView.row,slotView.col);
			slotView.vacateSlot();
			this.slotArray.push(slotView);
		}

		for (let i = 0; i < this.cardArray.length; ++i) {
			let cardView = this.cardArray[i];
			let slotView = this.slotArray[cardView.slot];
			slotView.occupySlot(cardView.cardID);
		}

		this.arrangedCards = [];
		this.frame = null;
		this.poker = null;
		this.player = null;
		this.opponent = null;
		this.pokerHandInfos = [];
		this.gameMode = GameMode.Play;
		this.level = 0;
		this.gameNo = 0;
		this.handNo = 0;
		this.roundNo = 0;
		this.movesMade = 0;
		this.waitForHint = false;
		this.didSort = false;
		this.didAdvise = false;
		this.playerData = null;
		this.compressedHeader = false;
		this.willShow = true;

		this.selectedCard = null;
		this.selectedCardCenter = null;
		this.selectedRelativePoint = null;
		this.selectedTheme = Themes.PokerTable;

		this.viewBackground = null;
		this.viewLevel = null;
		this.viewTitle = null;
		this.viewSubmit = null;
		this.viewEinstein = null;
		this.viewBubble = null;
		this.viewSimpleBubble = null;
		this.viewPatterns = null;
		this.viewTornPage = null;
		this.viewBusy = null;
		this.viewBet = null;

		let shadowRect = CardView.preferredShadowSize();
		this.cardShadow = new PIXI.Sprite(loader.resources['images/card_shadow.png'].texture);
		this.cardShadow.alpha = 0;
		this.cardShadow.width = shadowRect.width;
		this.cardShadow.height = shadowRect.height;
		this.cardShadow.pivot.x = shadowRect.width/2;
		this.cardShadow.pivot.y = shadowRect.height/2;
		this.cardShadow.zIndex = kCardShadowZPosition;

		this.labelGameHand = null;
		this.buttonScheme = null;
		this.buttonSort = null;
		this.buttonAdvise = null;
		this.buttonMovie = null;
		this.buttonSay = null;
	}

	static getRowFromCardIndex(index) {
		return index <= 2 ? 0 : (index <= 7 ? 1 : 2);
	}

	static getRowFromSlotIndex(index) {
		return index <= 2+kExtraSlotsPerRow ? 0 : (index <= 7+2*kExtraSlotsPerRow ? 1 : 2);
	}

	static getColFromCardIndex(index) {
		return index <= 2 ? index : (index <= 7 ? index-3 : index-8);
	}

	static getColFromSlotIndex(index) {
		return index <= 2+kExtraSlotsPerRow ? index % (3+kExtraSlotsPerRow) :
			(index <= 7+2*kExtraSlotsPerRow ? (index - (3+kExtraSlotsPerRow)) % (5+kExtraSlotsPerRow) :
			(index - (8+2*kExtraSlotsPerRow)) % (5+kExtraSlotsPerRow));
	}

	static getSlotFromRowCol(row,col) {
		return row == 0 ? col : (row == 1 ? 3+kExtraSlotsPerRow+col : 8+2*kExtraSlotsPerRow+col);
	}

	static getAngleFromRowCol(row,col,angle) {
		return row == 0 ? (col-1)*angle : (col-2)*angle;
	}

	static getAnchorPointFromRow(row) {
		let cardSize = CardView.effectiveCardSize();
		let anchor = { x : rendererRect.width / 2, y : rendererRect.height / 2 };

		if (row == 0) {
			anchor.y += 2 * cardSize.height / 3;
		} else if (row == 1) {
			anchor.y += cardSize.height;
		} else {
			anchor.y += 4 * cardSize.height / 3;
		}
		return anchor;
	}

	static getPointFromAnchor(anchor,radius,angle) {
		return { x : radius * Math.sin(angle) + anchor.x, y : -1 * radius * Math.cos(angle) + anchor.y };
	}

	static getHomeFromRowCol(row,col,unitAngle) {
		let cardSize = CardView.effectiveCardSize();
		let anchor = PlayView.getAnchorPointFromRow(row);
		let angle = PlayView.getAngleFromRowCol(row,col,unitAngle);
		return PlayView.getPointFromAnchor(anchor,cardSize.height,angle);
	}

	static getBottomRightCornerPoint(center,frame,angle) {
		let cornerPoint = PlayView.getCardCornerPoint(center,frame,angle,CardCorner.BottomRight);
		return cornerPoint;
	}

	static getCardCornerPoint(center,frame,angle,corner) {
		let w = frame.width/2;
		let h = frame.height/2;
		let r = Math.sqrt(h*h + w*w);
		let alpha = Math.acos(h/r);

		let cornerPoint = { x:0, y:0 };

		switch (corner) {
			case CardCorner.TopRight:
				cornerPoint.x = center.x + r * Math.sin(alpha + angle);
				cornerPoint.y = center.y - r * Math.cos(alpha + angle);
				break;
			case CardCorner.TopLeft:
				cornerPoint.x = center.x - r * Math.sin(alpha - angle);
				cornerPoint.y = center.y - r * Math.cos(alpha - angle);
				break;
			case CardCorner.BottomLeft:
				cornerPoint.x = center.x - r * Math.sin(alpha + angle);
				cornerPoint.y = center.y + r * Math.cos(alpha + angle);
				break;
			case CardCorner.BottomRight:
			default:
				cornerPoint.x = center.x + r * Math.sin(alpha - angle);
				cornerPoint.y = center.y + r * Math.cos(alpha - angle);
				break;
		}
		return cornerPoint;
	}

	static isExtraSlot(row,col) {
		return ((row == 0 && col >= 3) || (col >= 5));
	}

	static cardContainsPoint(center,angle,point) {
		let shiftedPoint = { x:point.x-center.x, y:point.y-center.y };
		let pointAngle = shiftedPoint.x == 0 ? Math.PI/2 : Math.atan(shiftedPoint.y/shiftedPoint.x);
		let distance = Math.sqrt(shiftedPoint.x*shiftedPoint.x + shiftedPoint.y*shiftedPoint.y);

		shiftedPoint.x = distance * Math.cos(pointAngle - angle);
		shiftedPoint.y = distance * Math.sin(pointAngle - angle);

		let cardSize = CardView.effectiveCardSize();
		cardSize.width -= 2*kContainsPointMargin;
		cardSize.height -= 2*kContainsPointMargin;

		if (-1*cardSize.width/2 < shiftedPoint.x && shiftedPoint.x < cardSize.width/2 &&
			-1*cardSize.height/2 < shiftedPoint.y && shiftedPoint.y < cardSize.height/2) {
			return true;
		} else {
			return false;
		}
	}

	static onDragStart(event) {
		this.data = event.data;
		this.dragging = true;
		this.dragAnchor.x = this.x;
		this.dragAnchor.y = this.y;
		this.dragPoint = event.data.getLocalPosition(this.parent);
	}

	static onDragEnd() {
		this.dragging = false;
		this.data = null;

		let newPosition = { x:this.x, y:this.y };
		let cornerPoint = PlayView.getBottomRightCornerPoint(newPosition,CardView.effectiveCardRect(),this.rotation);
		let oldSlot = this.parent.slotArray[this.slot];
		let zPosition = oldSlot.zIndex;

		if (this.parent.findOverlappingCard(this) == -1) {
			this.zIndex = kFloatingCardZPosition;
			zPosition = kTopMostZPosition;
		}

		let slotIndex = this.parent.showSlotContainingPoint(cornerPoint,zPosition);
		if (slotIndex >= 0 && slotIndex != this.slot && this.parent.gameMode == GameMode.Play) {
			let newSlot = this.parent.slotArray[slotIndex];

			if (!this.parent.isLastExtraSlotOccupied(newSlot.row) ||
				newSlot.row == this.row || !newSlot.occupied) {

				oldSlot.vacateSlot();
				if (newSlot.occupied) {
					this.parent.moveCardsOver(newSlot,this);
				}

				this.parent.setNewCardHome(this,slotIndex);
				this.parent.analyzeHand(newSlot.row);

				this.parent.compressCardsBack(oldSlot);
				this.parent.analyzeHand(oldSlot.row);

				this.parent.movesMade++;

				if (this.parent.validateHand()) {
					this.parent.viewSubmit.showCheckMark();
				} else {
					this.parent.viewSubmit.showCrossMark();
				}
			}
		}

		this.parent.bringCardHome(this);
		this.parent.hideAllSlots(-1);
	}

	static onDragMove() {
		if (!this.dragging)
			return;

		var newPosition = this.data.getLocalPosition(this.parent);
		this.x = this.dragAnchor.x + (newPosition.x - this.dragPoint.x);
		this.y = this.dragAnchor.y + (newPosition.y - this.dragPoint.y);

		if (this.parent.cardShadow.alpha > 0) {
			this.parent.cardShadow.position.set(this.x,this.y);
		}

		let viewCenter = { x:this.parent.frame.width/2, y:this.parent.frame.height/2 };
		let angle = Math.asin((this.x - viewCenter.x)/this.frame.height);
		if (-1*kUnitAngle <= angle && angle <= 2*kUnitAngle) {
			this.rotation = angle;
			if (this.parent.cardShadow.alpha > 0)
				this.parent.cardShadow.rotation = angle;
		} else {
			angle = angle > 0 ? 2*kUnitAngle : -1*kUnitAngle;
		}

		newPosition = { x:this.x, y:this.y };
		let cornerPoint = PlayView.getBottomRightCornerPoint(newPosition,CardView.effectiveCardRect(),angle);

		let slotView = this.parent.slotArray[this.slot];
		let zPosition = slotView.zIndex;

		if (this.parent.findOverlappingCard(this) == -1) {
			this.zIndex = kFloatingCardZPosition;
			zPosition = kTopMostZPosition;
			this.parent.showCardShadow(this);
		}

		this.parent.showSlotContainingPoint(cornerPoint,zPosition);
	}

	static onHandInfoViewPointerDown(event) {
		this.parent.flareCards(this.row);
		this.showHighlight();
	}

	static onHandInfoViewPointerUp() {
		this.parent.unflareCards(this.row);
		this.hideHighlight();
	}

	static onSubmitViewPointerDown(event) {
		this.showHighlight();
	}

	static onSubmitViewPointerUp() {
		this.hideHighlight();
		this.callback();
	}

	setOnHidePlayView(f) {
		this.viewSubmit.setCallback(f);
	}

	findOverlappingCard(cardView) {
		for (let i = 0; i < this.cardArray.length; ++i) {
			let eachCard = this.cardArray[i];
			let rect = CardView.effectiveCardRect();
			for (let j = CardCorner.TopRight; j <= CardCorner.BottomRight; ++j) {
				let center = { x:cardView.x, y:cardView.y };
				let cornerPoint = PlayView.getCardCornerPoint(center,rect,cardView.rotation,j);
				if (PlayView.cardContainsPoint(eachCard.home,eachCard.rotation,cornerPoint) &&
					eachCard.zIndex > cardView.zIndex) {
					return i;
				}
			}
		}
		return -1;
	}

	findSlotContainingPoint(point,zPosition) {
		for (let i = this.slotArray.length-1; i >= 0; i--) {
			let slotView = this.slotArray[i];
			if (slotView.zIndex <= zPosition) {
				if (PlayView.cardContainsPoint(slotView.home,slotView.rotation,point)) {
					if (!slotView.extra) {
						return i;
					}
				}
			}
		}
		return -1;
	}

	getArrangedCards() {
		let cards = [];
		this.arrangedCards.forEach(function(card) {
			cards.push(card.id);
		});
		return cards;
	}

	isLastExtraSlotOccupied(row) {
		let slotView = null;
		if (row == 0) {
			slotView = this.slotArray[2+kExtraSlotsPerRow];
		} else if (row == 1) {
			slotView = this.slotArray[7+2*kExtraSlotsPerRow];
		} else {
			slotView = this.slotArray[12+3*kExtraSlotsPerRow];
		}
		return slotView.occupied;
	}

	getCardInsertionPoint(cardView) {
		let insertionPoint = {...cardView.home};
		let cardSize = CardView.effectiveCardSize();

		insertionPoint.x -= 3*cardSize.width/4;
		insertionPoint.y -= 3*cardSize.height/4;

		return insertionPoint;
	}

	getCardInSlotIndex(slotIndex) {
		for (let i = 0; i < this.cardArray.length; i++) {
			let cardView = this.cardArray[i];
			if (cardView.slot == slotIndex) {
				return cardView;
			}
		}
		return null;
	}

	getCardInSlot(row,col) {
		let slotIndex = PlayView.getSlotFromRowCol(row,col);
		let cardView = this.getCardInSlotIndex(slotIndex);
		return cardView;
	}

	setNewCardHome(cardView,slotIndex) {
		let slotView = this.slotArray[slotIndex];

		cardView.slot = slotView.index;
		cardView.restAngle = slotView.rotation;
		cardView.home = slotView.home;
		cardView.flareAngle = slotView.flareAngle;
		cardView.flareHome = slotView.flareHome;
		cardView.row = slotView.row;
		cardView.col = slotView.col;

		slotView.occupySlot(cardView.cardID,true);
	}

	getLevelViewHomeRect() {
		if (this.compressedHeader) {
			return { x:0, y:0, width:80, height:40 };
		} else {
			return { x:0, y:0, width:80, height:60 };
		}
	}

	getLevelViewStartRect() {
		if (this.compressedHeader) {
			return { x:0, y:-40, width:80, height:40 };
		} else {
			return { x:0, y:-60, width:80, height:60 };
		}
	}

	getTitleViewHomeRect() {
		if (this.compressedHeader) {
			return { x:80, y:0, width:this.frame.width-160, height:40 };
		} else {
			return { x:80, y:0, width:this.frame.width-160, height:60 };
		}
	}

	getTitleViewStartRect() {
		if (this.compressedHeader) {
			return { x:80, y:-40, width:this.frame.width-160, height:40 };
		} else {
			return { x:80, y:-60, width:this.frame.width-160, height:60 };
		}
	}

	getSubmitViewHomeRect() {
		if (this.compressedHeader) {
			return { x:this.frame.width-80, y:0, width:80, height:40 };
		} else {
			return { x:this.frame.width-80, y:0, width:80, height:60 };
		}
	}

	getSubmitViewStartRect() {
		if (this.compressedHeader) {
			return { x:this.frame.width-80, y:-40, width:80, height:40 };
		} else {
			return { x:this.frame.width-80, y:-60, width:80, height:60 };
		}
	}

	getSubmitViewEndRect() {
		if (this.compressedHeader) {
			return { x:this.frame.width, y:472, width:80, height:40 };
		} else {
			return { x:this.frame.width, y:472, width:80, height:60 };
		}
	}

	getHandInfoViewHomeRect(val) {
		if (this.compressedHeader) {
			let w = this.frame.width/3;
			return { x:val * w, y:this.frame.height-40, width:w, height:40 } 
		} else {
			let w = this.frame.width/3;
			return { x:val * w, y:this.frame.height-60, width:w, height:60 } 
		}
	}

	getHandInfoViewStartRect(val) {
		if (this.compressedHeader) {
			let w = this.frame.width/3;
			return { x:val * w, y:this.frame.height, width:w, height:40 }
		} else {
			let w = this.frame.width/3;
			return { x:val * w, y:this.frame.height, width:w, height:60 }
		}
	}

	useCompressedHeader(scaleFactor) {
		let actualHeight = scaleFactor * kCardHeight;
		return window.innerHeight < 2.85 * actualHeight;
	}

	draw(rect) {
		let playMode = (this.gameMode == GameMode.Play);
		let replayMode = (this.gameMode == GameMode.Replay);
		let watchMode = (this.gameMode == GameMode.Watch);
		let scaleFactor = CardView.getScaleFactor();

		this.compressedHeader = this.useCompressedHeader(scaleFactor);
		this.alpha = 1;
		this.x = rect.x;
		this.y = rect.y;
		this.width = rect.width;
		this.height = rect.height;
		this.frame = rect;
		this.interactive = false;
		this.buttonmode = false;
		this.sortableChildren = true;

		// Show viewLevel
		this.viewLevel = new LevelView(this.getLevelViewStartRect(),this.compressedHeader);
		this.addChild(this.viewLevel);

		// Show viewTitle
		this.viewTitle = new TitleView(this.getTitleViewStartRect(),this.compressedHeader);
		this.addChild(this.viewTitle);

		// Show viewSubmit
		this.viewSubmit = new SubmitView(this.getSubmitViewStartRect(),this.compressedHeader);
		this.viewSubmit.setPointerDown(PlayView.onSubmitViewPointerDown);
		this.viewSubmit.setPointerUp(PlayView.onSubmitViewPointerUp);
		this.addChild(this.viewSubmit);

		// Show viewBet

		// Show labelGameHand
		let fontStyle = new PIXI.TextStyle({ fontFamily:'Helvetica',fontSize:kGameHandFontSize,fill:'white' });
		let labelGameHand = new PIXI.Text("GAME " + this.gameNo + " HAND " + (this.handNo+1),fontStyle);
		labelGameHand.alpha = 1;
		labelGameHand.pivot.x = labelGameHand.width/2;
		labelGameHand.pivot.y = labelGameHand.height/2;
		labelGameHand.x = rect.width/2;
		if (this.compressedHeader) {
			labelGameHand.y = 40 + labelGameHand.height;
		} else {
			labelGameHand.y = 80 + labelGameHand.height;
		}
		this.addChild(labelGameHand);

		// Show viewEinstein

		// Show viewBubble

		// Show HandInfoViews
		for (let i = 0; i < 3; ++i) {
			let handInfoView = new HandInfoView(this.getHandInfoViewStartRect(i),this.compressedHeader);
			handInfoView.row = i;
			handInfoView.setPointerDown(PlayView.onHandInfoViewPointerDown);
			handInfoView.setPointerUp(PlayView.onHandInfoViewPointerUp);
			this.pokerHandInfos.push(handInfoView);
			this.addChild(handInfoView);
		}

		// Show CardViews
		for (let i = 0; i < this.cardArray.length; ++i) {
			let cardView = this.cardArray[i];
			cardView.facingUp = true;
			cardView.draw();
			cardView.setScale(scaleFactor);
			if (watchMode || replayMode) {
				cardView.setCenter({ x:rect.width/2, y:-1*cardView.height });
			} else {
				cardView.setCenter({ x:rect.width/2, y:rect.height/2 });
			}
			cardView.zIndex = cardView.slot+kCardZPositionBase;
			this.addChild(cardView);
		}


		// Add SlotViews
		for (let i = 0; i < this.slotArray.length; ++i) {
			let slotView = this.slotArray[i];
			slotView.draw();
			slotView.setScale(scaleFactor);
			slotView.alpha = 0;
			slotView.setCenter(slotView.home);
			slotView.zIndex = slotView.index+kSlotZPositionBase;
			this.addChild(slotView);
		}

		// Analyze each hand
		if (playMode) {
			for (let i = 0; i < 3; ++i) {
				this.analyzeHand(i);
			}
		}

		// Add card shadow
		let shadowRect = CardView.preferredShadowSize();
		this.cardShadow.width = scaleFactor * shadowRect.width;
		this.cardShadow.height = scaleFactor * shadowRect.height;
		this.addChild(this.cardShadow);

		// Show buttonSay

		// Show buttonScheme

		// Show buttonSort

		// Show buttonAdvise

		// Show buttonMovie

		// Show viewTornPage

		// Show viewPatterns

		// Show viewBusy

		// Apply selected theme

	}

	animateAll() {
		this.animateTopBar();
		this.animateHandInfos();
		this.animateCards(); 
	}

	animateTopBar() {
		let target = { position:this.getLevelViewHomeRect(), rotation:undefined, alpha:undefined };
		animate(this.viewLevel,250,0,target,AnimationOption.SlowDown);
		target.position = this.getTitleViewHomeRect();
		animate(this.viewTitle,250,0,target,AnimationOption.SlowDown);
		target.position = this.getSubmitViewHomeRect();
		animate(this.viewSubmit,250,0,target,AnimationOption.SlowDown);
	}

	animateGameHand() {
	}

	animateHandInfos() {
		for (let i = 0; i < this.pokerHandInfos.length; ++i) {
			let view = this.pokerHandInfos[i];
			let home = this.getHandInfoViewHomeRect(view.row);
			let target = { position:home, rotation:undefined, alpha:undefined };
			animate(view,250,0,target,AnimationOption.SlowDown);
		};
	}

	animateCards() {
		let replayMode = (this.gameMode == GameMode.Replay);
		let watchMode = (this.gameMode == GameMode.Watch);
		let cardSize = CardView.effectiveCardSize();
		let viewCenter = { x:this.frame.width/2, y:this.frame.height/2 };
		let topCenter = { x:viewCenter.x, y:viewCenter.y - cardSize.height/2 };
		let midCenter = { x:viewCenter.x, y:viewCenter.y };
		let bottomCenter = { x:viewCenter.x, y:viewCenter.y + cardSize.height/2 };

		this.cardArray.forEach(function(cardView) {
			let target = { position:undefined, rotation:undefined, alpha:undefined };

			if (replayMode || watchMode) {
				cardView.setCenter({ x:viewCenter.x, y:-1*cardSize.height });
				target.position = midCenter;
				animate(cardView,500,2000,target,AnimationOption.SlowDown);
			} else {
				cardView.setCenter(midCenter);
			}

			let delay1 = 0, delay2 = 0;
			if (cardView.index <= 2) {
				target.position = topCenter;
				delay1 = 0;
				delay2 = 0;
			} else if (cardView.index <= 7) {
				target.position = midCenter;
				delay1 = 0;
				delay2 = 300;
			} else {
				target.position = bottomCenter;
				delay1 = 0;
				delay2 = 300;
			}
			animate(cardView,500,2500+delay1,target,AnimationOption.SlowDown);

			target.position = cardView.home;
			target.rotation = cardView.restAngle;
			animate(cardView,500,2500+delay1+delay2,target,AnimationOption.SlowDown);
		});
	}

	animateEinstein() {
	}

	animateButtons() {
	}

	showCardShadow(cardView) {
		if (cardView == null)
			return;
		if (this.cardShadow.alpha > 0)
			return;

		this.cardShadow.rotation = cardView.rotation;
		let target = { position:undefined, rotation:undefined, alpha:undefined };
		target.alpha = 1.0;
		animate(this.cardShadow,200,0,target,AnimationOption.Linear);
	}

	showSlotContainingPoint(point,zPosition) {
		let slotIndex = this.findSlotContainingPoint(point,zPosition);
		if (slotIndex >= 0) {
			let slotView = this.slotArray[slotIndex];
			if (slotView.alpha < 0.01) {
				let target = { position:undefined, rotation:undefined, alpha:undefined };
				target.alpha = 1.0;
				animate(slotView,100,0,target,AnimationOption.Linear);
			}
		}
		this.hideAllSlots(slotIndex);
		return slotIndex;
	}

	bringCardHome(cardView) {
		let isNextSlotOccupiedInRow = false;
		let slotView = null;

		if (cardView.slot+1 < this.slotArray.length) {
			slotView = this.slotArray[cardView.slot+1];
			if (cardView.row == slotView.row) {
				isNextSlotOccupiedInRow = slotView.occupied;
			}
		}

		if (cardView.zIndex == kFloatingCardZPosition && isNextSlotOccupiedInRow) {

			let insertionPoint = this.getCardInsertionPoint(cardView);
			let target = { position:undefined, rotation:undefined, alpha:undefined };

			target.position = insertionPoint;
			target.zIndex = cardView.slot + kCardZPositionBase;
			animate(cardView,500,0,target,AnimationOption.SpeedUpSlowDown);

			target.position = insertionPoint;
			target.alpha = 0;
			target.zIndex = undefined;
			animate(this.cardShadow,500,0,target,AnimationOption.SpeedUpSlowDown);

			target.position = cardView.home;
			target.rotation = cardView.restAngle;
			target.alpha = 1;
			animate(cardView,500,500,target,AnimationOption.SpeedUpSlowDown);

		} else {

			this.cardShadow.x = cardView.home.x;
			this.cardShadow.y = cardView.home.y;
			this.cardShadow.alpha = 0;
			cardView.zIndex = cardView.slot + kCardZPositionBase;

			let target = { position:undefined, rotation:undefined, alpha:undefined };
			target.position = cardView.home;
			target.rotation = cardView.restAngle;
			animate(cardView,500,0,target,AnimationOption.SpeedUpSlowDown);
		}
	}

	moveCardsOver(slotView,selectedCard) {
		let max_cols = (slotView.row == 0 ? 3 : 5) + kExtraSlotsPerRow;

		for (let i = max_cols-2; i >= slotView.col; i--) {
			let cardView = this.getCardInSlot(slotView.row,i);
			if (cardView != null) {
				if (selectedCard.cardID != cardView.cardID) {
					let oldSlotView = this.slotArray[cardView.slot];
					oldSlotView.vacateSlot();
					this.setNewCardHome(cardView,cardView.slot+1);
					this.bringCardHome(cardView);
				}
			}
		}
	}

	compressCardsBack(slotView) {
		let max_cols = (slotView.row == 0 ? 3 : 5) + kExtraSlotsPerRow;
		
		for (let i = slotView.col+1; i < max_cols; i++) {
			let cardView = this.getCardInSlot(slotView.row,i);
			if (cardView != null) {
				let oldSlotView = this.slotArray[cardView.slot];
				oldSlotView.vacateSlot();
				this.setNewCardHome(cardView,cardView.slot-1);
				this.bringCardHome(cardView);
			}
		}
	}

	hideAllSlots(except) {
		for (let i = 0; i < this.slotArray.length; ++i) {
			let slotView = this.slotArray[i];
			if (slotView.alpha > 0 && slotView.index != except) {
				let target = { position:undefined, rotation:undefined, alpha:0 };
				animate(slotView,100,0,target,AnimationOption.Linear);
			}
		}
	}

	flareCards(row) {
		if (!this.isRowComplete(row))
			return;

		let index1, index2;
		if (row == 0) {
			index1 = 0;
			index2 = 2;
		} else {
			index1 = 0;
			index2 = 4;
		}

		for (let i = index1; i <= index2; ++i) {
			let cardView = this.getCardInSlot(row,i);
			let target = { position:cardView.flareHome, rotation:cardView.flareAngle, alpha:undefined };
			animate(cardView,300,0,target,AnimationOption.SlowDown);
		}
	}

	unflareCards(row) {
		if (!this.isRowComplete(row))
			return;

		let index1, index2;
		if (row == 0) {
			index1 = 0;
			index2 = 2;
		} else {
			index1 = 0;
			index2 = 4;
		}

		for (let i = index1; i <= index2; ++i) {
			let cardView = this.getCardInSlot(row,i);
			let target = { position:cardView.home, rotation:cardView.restAngle, alpha:undefined };
			animate(cardView,300,0,target,AnimationOption.SlowDown);
		}
	}

	isRowComplete(row) {
		let startSlot, endSlot;
		switch (row) {
			case 0:
				startSlot = 0;
				endSlot = 2 + kExtraSlotsPerRow;
				break;
			case 1:
				startSlot = 3 + kExtraSlotsPerRow;
				endSlot = 7 + 2 * kExtraSlotsPerRow;
				break;
			case 2:
			default:
				startSlot = 8 + 2 * kExtraSlotsPerRow;
				endSlot = 12 + 3 * kExtraSlotsPerRow;
				break;
		}
	
		let slotView;
		for (let i = startSlot; i <= endSlot-kExtraSlotsPerRow; i++) {
			slotView = this.slotArray[i];
			if (!slotView.occupied) {
				return false;
			}
		}
		for (let i = endSlot-kExtraSlotsPerRow+1; i <= endSlot; i++) {
			slotView = this.slotArray[i];
			if (slotView.occupied) {
				return false;
			}
		}
		return true;
	}

	analyzeHand(row) {
		if (!this.isRowComplete(row)) {
			this.pokerHandInfos[row].resetHandInfo();
		} else {
			let card1, card2, card3, card4, card5;
			let hand;
			let handInfo;
			switch (row) {
				case 0:
					card1 = this.getCardInSlot(0,0);
					card2 = this.getCardInSlot(0,1);
					card3 = this.getCardInSlot(0,2);
					hand = [card1,card2,card3];
					handInfo = Poker.analyzeHand(hand);
					break;
				case 1:
					card1 = this.getCardInSlot(1,0);
					card2 = this.getCardInSlot(1,1);
					card3 = this.getCardInSlot(1,2);
					card4 = this.getCardInSlot(1,3);
					card5 = this.getCardInSlot(1,4);
					hand = [card1,card2,card3,card4,card5];
					handInfo = Poker.analyzeHand(hand);
					break;
				case 2:
				default:
					card1 = this.getCardInSlot(2,0);
					card2 = this.getCardInSlot(2,1);
					card3 = this.getCardInSlot(2,2);
					card4 = this.getCardInSlot(2,3);
					card5 = this.getCardInSlot(2,4);
					hand = [card1,card2,card3,card4,card5];
					handInfo = Poker.analyzeHand(hand);
					break;
			}
			this.pokerHandInfos[row].showHandInfo(handInfo);
		}
	}

	validateHand() {
		this.arrangedCards = [];
		for (let i = 0; i < 3; ++i) {
			if (!this.isRowComplete(i)) {
				return false;
			}
		}
		for (let i = 0; i < kCardsOnHand; ++i) {
			let r = PlayView.getRowFromCardIndex(i);
			let c = PlayView.getColFromCardIndex(i);
			let v = this.getCardInSlot(r,c);
			this.arrangedCards.push(v.card);
		}
		return Poker.isValidHand(this.arrangedCards);
	}
}

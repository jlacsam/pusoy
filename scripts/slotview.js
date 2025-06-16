const kiPhoneMargin = 3;
const kiPadMargin = 6;
const kiPhoneRadius = 10;
const kiPadRadius = 20;
const kSlotOutlineThickness = 3;

class SlotView extends PIXI.Graphics {
	constructor() {
		super();
		this.alpha = 1;
		this.rotation = 0;
		this.home = { x:0, y:0 };
		this.flareAngle = 0;
		this.flareHome = { x:0, y:0 };
		this.index = 0;
		this.row = 0;
		this.col = 0;
		this.frame = SlotView.preferredSlotRect();
		this.extra = false;
		this.occupied = false;
		this.occupant = null;
	}

	static preferredSlotRect() {
		let slotViewRect = CardView.preferredCardRect();
		slotViewRect.width += 2 * kiPadMargin;
		slotViewRect.height += 2 * kiPadMargin;
		return slotViewRect;
	}

	draw() {
		this.lineStyle(kSlotOutlineThickness,0xFFFF00,1);
		this.drawRoundedRect(0,0,this.frame.width-2*kSlotOutlineThickness,
			this.frame.height-2*kSlotOutlineThickness,kiPadRadius);
		this.endFill();
		this.pivot.x = this.frame.width/2;
		this.pivot.y = this.frame.height/2;
		this.x = this.frame.x;
		this.y = this.frame.y;
	}

	occupySlot(cardID,force) {
		if (this.occupied && !force) {
			return false;
		} else {
			this.occupant = cardID;
			this.occupied = true;
			return true;
		}
	}

	vacateSlot() {
		this.occupied = false;
		this.occupant = null;
	}

	setCenter(point) {
		this.x = point.x;
		this.y = point.y;
	}

	setScale(factor) {
		this.width = factor * this.frame.width;
		this.height = factor * this.frame.height;
	}

	rotate(angle) {
		this.rotation = angle;
	}
}

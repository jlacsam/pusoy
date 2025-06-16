let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
}
PIXI.utils.sayHello(type)

const card = new Card(CardSuit.Spades,1);
console.log(card.description);

const app = new PIXI.Application({
        antialias:true,
        transparent:true,
        resolution:1
    });

const backside = PIXI.Texture.from('images/backside_220.png');
const frontside = PIXI.Texture.from('images/frontside.png');

backside.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
frontside.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoDensity = true;
app.renderer.resize(window.innerWidth,window.innerHeight);

document.body.appendChild(app.view);

console.log("window.devicePixelRatio is " + window.devicePixelRatio);

createCard(10,10);

function createCard(x,y) {
	const card = new PIXI.Sprite(backside);
	card.interactive = true;
	card.buttonMode = true;
	card.anchor.set(0.5);
	card
		.on('pointerdown',onDragStart)
		.on('pointerup',onDragEnd)
		.on('pointerupoutside',onDragEnd)
		.on('pointermove',onDragMove)
	card.x = x;
	card.y = y;
	app.stage.addChild(card);
}

function onDragStart(event) {
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    this.data = null;
}

function onDragMove() {
    if (this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
}

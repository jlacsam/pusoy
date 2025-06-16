const PlayerType = {
	ThisPlayer : 0,
	FirstOpponent : 1,
	SecondOpponent : 2,
	ThirdOpponent : 3
}

class Player {
	constructor() {
		this.playerType = PlayerType.ThisPlayer;
		this.playerID = null;
		this.name = null;
		this.profilePic = null;
		this.country = null;
		this.cards = [];
		this.arrangeCards = [];
		this.handNo = "-1";
		this.score;
		this.bestHand = 0.0;
		this.handScore = [0,0,0];
		this.message = null;
		this.bet = 0;
		this.didFold = false;
		this.starCount = 0;
		this.submitted = new Date();
	}

	dumpCards() {
		console.log(this.name + ">>");
		this.cards.forEach(function(a){console.log(a.cardCode + ":" + a.description);});
	}

	dumpArrangedCards() {
		console.log(this.name + ">>");
		this.arrangedCards.forEach(function(a){console.log(a.cardCode + ":" + a.description);});
	}

	receiveCard(card) {
		this.cards.push(card);
	}

	receivePack(pack) {
		this.cards = [];
		this.cards = [...pack];
	}

	receiveCardFromList(deck,list) {
		let a = list.split(",");
		this.cards = [];
		deck.forEach(function(card){
			a.forEach(function(cardCode){
				if (cardCode == card.cardCode) {
					this.cards.push(card);
				}
			});
		});
	}

	surrenderCards() {
		this.handNo = "-1";
		this.cards = [];
	}

	hasSelectedHand() {
		return this.handNo != "-1";
	}

	cardsList() {
		return this.cards.toString();
	}

	arrangedCardsList() {
		return this.arrangedCards.toString();
	}

	resetHandScores() {
		handScore = [0,0,0];
	}

	setHandScoreAtIndex(value,index) {
		handScore[index] = value;
	}

	handScoreAtIndex(index) {
		return handScore[index];
	}

	firstName() {
		return this.name.split(" ")[0];
	}

	frontHand() {
		let h = arrangedCards.slice(0,3);
		return h[0].shortName() + "-" + h[1].shortName() + "-" + h[2].shortName();
	}

	middleHand() {
		let h = arrangedCards.slice(3,8);
		return h[0].shortName() + "-" + h[1].shortName() + "-" + h[2].shortName() + "-" + h[3].shortName() + "-" + h[4].shortName();
	}

	backHand() {
		let h = arrangedCards.slice(8,13);
		return h[0].shortName() + "-" + h[1].shortName() + "-" + h[2].shortName() + "-" + h[3].shortName() + "-" + h[4].shortName();
	}

	handString(row) {
		switch(row) {
			case 0:
				return this.frontHand();
			case 1:
				return this.middleHand();
			case 2:
			default:
				return this.backHand();
		}
	}
}

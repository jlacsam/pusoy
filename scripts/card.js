const SuitSymbol = {
	Spade   : '\u2660',
	Club    : '\u2663',
	Heart   : '\u2665',
	Diamond : '\u2666'
}

const CardSuit = {
	Spades   : 0,
	Clubs    : 1,
	Hearts   : 2,
	Diamonds : 3,
	Joker    : 4
}

class Card {
	constructor(cardSuit,cardValue) {
		this.suit = cardSuit;
		this.value = cardValue;
		this.id = this.suitId();
		this.cardID = this.suitName() + '-' + cardValue.toString().padStart(2,0);
		this.cardCode = this.getCardCode();
		this.label = this.getCardLabel();
		this.description = cardValue.toString().padStart(2,0) + " of " + this.suitName();
		this.altvalue = cardValue == 1 ? 14 : cardValue;
		this.randomValue = 0;
	}

	suitId() {
		let suffix = this.value.toString().padStart(2,0);
		return this.suit == CardSuit.Spades ? 'S' + suffix :
			(this.suit == CardSuit.Clubs ? 'C' + suffix :
				(this.suit == CardSuit.Hearts ? 'H' + suffix :
					(this.suit == CardSuit.Diamonds ? 'D' + suffix : 'J00')));
	}

	suitName() {
		switch (this.suit) {
			case CardSuit.Spades:
				return "spades";
			case CardSuit.Clubs:
				return "clubs";
			case CardSuit.Hearts:
				return "hearts";
			case CardSuit.Diamonds:
				return "diamonds";
			case CardSuit.Joker:
			default:
				return "joker";
		}
	}

	static joker() {
		return new Card(CardSuit.Joker,0);
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

	getCardCode() {
		switch (this.suit) {
			case CardSuit.Spades:
				return 'A'.charCodeAt(0) + this.value - 1;
			case CardSuit.Clubs:
				return 'N'.charCodeAt(0) + this.value - 1
			case CardSuit.Hearts:
				return 'a'.charCodeAt(0) + this.value - 1;
			case CardSuit.Diamonds:
				return 'n'.charCodeAt(0) + this.value - 1;
			case CardSuit.Joker:
			default:
				return 0;
		}
	}

	getCardLabel() {
		if (this.value == 1) {
			return 'A';
		} else if (this.value <= 10) {
			return this.value.toString();
		} else if (this.value == 11) {
			return 'J';
		} else if (this.value == 12) {
			return 'Q';
		} else if (this.value == 13) {
			return 'K';
		}
	}

	randomizeValue() {
		this.randomValue = Math.random();
	}

	shortName() {
		let suitSymbol = SuitSymbol.Diamond;
		switch (this.suit) {
			case CardSuit.Spades:
				suitSymbol = SuitSymbol.Spade;
				break;
			case CardSuit.Clubs:
				suitSymbol = SuitSymbol.Club;
				break;
			case CardSuit.Hearts:
				suitSymbol = SuitSymbol.Heart;
				break;
			case CardSuit.Diamonds:
			default:
				suitSymbol = SuitSymbol.Diamond;
				break;
		}

		if (this.value == 1) {
			return 'A' + suitSymbol;
		} else if (this.value <= 10) {
			return this.value.toString() + suitSymbol;
		} else if (this.value == 11) {
			return 'J' + suitSymbol;
		} else if (this.value == 12) {
			return 'Q' + suitSymbol;
		} else if (this.value == 13) {
			return 'K' + suitSymbol;
		}
	}
}

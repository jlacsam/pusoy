const kCardsPerDeck = 52;
const kCardsPerSuit = 13;

class Deck {
	constructor () {
		this.deckOfCards = [];
		let i, j;
		for (i = CardSuit.Spades; i <= CardSuit.Diamonds; i++) {
			for (j = 1; j <= kCardsPerSuit; j++) {
				let card = new Card(i,j);
				this.deckOfCards.push(card);
			}
		}

		this.cardsSortedByRandomValue = [];
		this.cardsSortedByCardID = this.sortCardsByCardID();
		this.cardsSortedByValue = this.sortCardsByValue();
	}

	cardsPerDeck() {
		return kCardsPerDeck;
	}

	sortCardsByRandomValue() {
		let clone = [...this.deckOfCards];
		clone.sort(function(a,b){return a.randomValue - b.randomValue;});
		return clone;
	}

	sortCardsByCardID() {
		let clone = [...this.deckOfCards];
		clone.sort(function(a,b){return a.cardID.localeCompare(b.cardID);});
		return clone;
	}

	sortCardsByValue() {
		let clone = [...this.deckOfCards];
		clone.sort(function(a,b){return a.value - b.value;});
		return clone;
	}

	shuffleDeck(seed) {
		Math.seedrandom(seed);
		this.deckOfCards.forEach(function(a){a.randomizeValue()});
		this.cardsSortedByRandomValue = [];
		this.cardsSortedByRandomValue = this.sortCardsByRandomValue();
	}

	dumpDeck() {
		console.log("Cards in deck:");
		this.deckOfCards.forEach(function(a){console.log(a.cardCode+':'+a.randomValue+':'+a.description);});
	}

	dumpRandomizedDeck() {
		console.log("Cards in randomized deck:");
		this.cardsSortedByRandomValue.forEach(function(a){console.log(a.cardCode+':'+a.randomValue+':'+a.description);});
	}

	dumpDeckByCardID() {
		console.log("Cards in deck by cardID:");
		this.cardsSortedByCardID.forEach(function(a){console.log(a.cardCode+':'+a.cardID+':'+a.description);});
	}

}

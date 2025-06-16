const kCardsOnHand 				= 13;
const kLeftHandWins 			= 1;
const kRightHandWins 			= -1;
const kHandsAreEqual 			= 0;
const kFrontHand 				= 0;
const kMiddleHand 				= 1;
const kBackHand 				= 2;

const kMinCardsInHand           = 5;
const kMaxPlayers               = 4;
const kCardsPerPokerHand        = 13;
const kCardsPerPack             = 13;
                                              // 5-Hand   // 13-Hand
const kRoyalFlushHands          = 4;          // 99.9998
const kStraightFlushHands       = 36;         // 99.9985
const kFourOfAKindHands         = 624;        // 99.975
const kFullHouseHands           = 3744;       // 99.856
const kFlushHands               = 5108;       // 99.80
const kStraightHands            = 10200;      // 99.607
const kThreeOfAKindHands        = 54912;      // 97.887
const kTwoPairHands             = 123552;     // 95.246
const kOnePairHands             = 1098240;    // 57.743
const kHighCardHands            = 1302540;    // 49.882
const kAllPokerHands            = 2598960;    // 100.00

const kRoyalFlushOdds           = "650,000 to 1";
const kStraightFlushOdds        = "72,000 to 1";
const kFourOfAKindOdds          = "4,000 to 1";
const kFullHouseOdds            = "700 to 1";
const kFlushOdds                = "500 to 1";
const kStraightOdds             = "250 to 1";
const kThreeOfAKindOdds         = "50 to 1";
const kTwoPairOdds              = "20 to 1";
const kOnePairOdds              = "10 to 6";
const kHighCardOdds             = "2 to 1";

const kRoyalFlushBeats          = (kAllPokerHands-kRoyalFlushHands);      // 2598960 - 4 = 2598956
const kStraightFlushBeats       = (kRoyalFlushBeats-kStraightFlushHands); // 2598956 - 36 = 2598920
const kFourOfAKindBeats         = (kStraightFlushBeats-kFourOfAKindHands);// 2598920 - 624 = 2598296
const kFullHouseBeats           = (kFourOfAKindBeats-kFullHouseHands);    // 2598296 - 3744 = 2594552
const kFlushBeats               = (kFullHouseBeats-kFlushHands);          // 2594552 - 5108 = 2589444
const kStraightBeats            = (kFlushBeats-kStraightHands);           // 2589444 - 10200 = 2579244
const kThreeOfAKindBeats        = (kStraightBeats-kThreeOfAKindHands);    // 2579244 - 54912 = 2524332
const kTwoPairBeats             = (kThreeOfAKindBeats-kTwoPairHands);     // 2524332 - 123552 = 2400780
const kOnePairBeats             = (kTwoPairBeats-kOnePairHands);          // 2400780 - 1098240 = 1302540
const kHighCardBeats            = (kOnePairBeats-kHighCardHands);         // 1302540 - 1302540 = 0

const kRoyalFlushProbability    = (kRoyalFlushHands/kAllPokerHands);
const kStraightFlushProbability = (kStraightFlushHands/kAllPokerHands);
const kFourOfAKindProbability   = (kFourOfAKindHands/kAllPokerHands);
const kFullHouseProbability     = (kFullHouseHands/kAllPokerHands);
const kFlushProbability         = (kFlushHands/kAllPokerHands);
const kStraightProbability      = (kStraightHands/kAllPokerHands);
const kThreeOfAKindProbability  = (kThreeOfAKindHands/kAllPokerHands);
const kTwoPairProbability       = (kTwoPairHands/kAllPokerHands);
const kOnePairProbability       = (kOnePairHands/kAllPokerHands);
const kHighCardProbability      = (kAllPokerHands/kAllPokerHands);

const kRoyalFlushTriples        = 4;
const kStraightFlushTriples     = 48;
const kThreeOfAKindTriples      = 52;
const kStraightTriples          = 720;
const kFlushTriples             = 1144;
const kPairTriples              = 3692;
const kHighTriples              = 18356;
const kAllTriples               = 22100;

const kRoyalFlushTripleOdds     = "5,500 to 1";
const kStraightFlushTripleOdds  = "460 to 1";
const kThreeOfAKindTripleOdds   = "425 to 1";
const kStraightTripleOdds       = "30 to 1";
const kFlushTripleOdds          = "20 to 1";
const kPairTripleOdds           = "6 to 1";
const kHighTripleOdds           = "4 out of 5";

const kRoyalFlushTripleBeats    = (kAllTriples-kRoyalFlushTriples);
const kStraightFlushTripleBeats = (kAllTriples-kStraightTriples);
const kThreeOfAKindTripleBeats  = (kAllTriples-kThreeOfAKindTriples);
const kStraightTripleBeats      = (kAllTriples-kStraightTriples);
const kFlushTripleBeats         = (kAllTriples-kFlushTriples);
const kPairBeats                = (kAllTriples-kPairTriples);
const kHighTripleBeats          = (kAllTriples-kHighTriples);

const kRoyalFlushTripleProb     = (kRoyalFlushTriples/kAllTriples);
const kStraightFlushTripleProb  = (kStraightFlushTriples/kAllTriples);
const kThreeOfAKindTripleProb   = (kThreeOfAKindTriples/kAllTriples);
const kStraightTripleProbability= (kStraightTriples/kAllTriples);
const kFlushTripleProbability   = (kFlushTriples/kAllTriples);
const kPairProbability          = (kPairTriples/kAllTriples);
const kHighTripleProbability    = (kHighTriples/kAllTriples);

const kHighTriple = 1;
const kPairTriple = 2;
const kFlushTriple = 3; // Not used in a game
const kStraightTriple = 4; // Not used in a game
const kThreeTriple = 5;
const kStraightFlushTriple = 6; // Not used in a game
const kRoyalFlushTriple = 7; // Not used in a game
const kHighCard = 8;
const kOnePair = 9;
const kTwoPair = 10;
const kThreeOfAKind = 11;
const kStraight = 12;
const kFlush = 13;
const kFullHouse = 14;
const kFourOfAKind = 15;
const kStraightFlush = 16;
const kRoyalFlush = 17;
const kNoRoyalty = 32;
const kThreeFlushes = 33;
const kSixPairs = 34;
const kThreeStraights = 35;
const kThirteenUniqueCards = 36;

class PokerHandInfo {
	constructor() {
		this.handType = null,
		this.handsBeaten = 0,
		this.probability = 0,
		this.percentile = 0,
		this.values = [0,0,0,0,0]
	}
};

class Poker {
	constructor() {
		this.gameNo = 0;
		this.deck = new Deck();
		this.players = [];
		this.packs = [[],[],[],[]];

		let crazyNames = ["You","Dumbot","Elizabot","Brainybot"];
		for (let i = 0; i < kMaxPlayers; i++) {
			let player = new Player();
			player.name = crazyNames[i];
			this.players.push(player);
		}
	}

	shuffleDeck(seed) {
		this.deck.shuffleDeck(seed);
	}

	distributeCards() {
		this.packs = [[],[],[],[]];
		for (let i = 0; i < this.deck.cardsSortedByRandomValue.length; ++i) {
			let card = this.deck.cardsSortedByRandomValue[i];
			this.packs[i%4].push(card);
		}
	}

	distributeSuits() {
		this.packs = [[],[],[],[]];
		for (let i = 0; i < this.deck.cardsSortedByCardID.length; ++i) {
			let card = this.deck.cardsSortedByCardID[i];
			this.packs[i%4].push(card);
		}
	}

	distributeValues() {
		this.packs = [[],[],[],[]];
		for (let i = 0; i < this.deck.cardsSortedByValue.length; ++i) {
			let card = this.deck.cardsSortedByValue[i];
			this.packs[i%4].push(card);
		}
	}

	distributeHands() {
		for (let i = 0; i < kMaxPlayers; i++) {
			this.players[i].receivePack(this.packs[i]);
		}
	}

	selectHand(playerNo,handNo) {
		this.players[playerNo].receivePack(this.packs[handNo]);
	}

	giveCardIDToPlayer(playerNo,cardID) {
		this.deck.deckOfCards.forEach(function(card) {
			if (card.cardID == cardID) {
				this.players[playerNo].receiveCard(card);
			}
		});
	}

	giveSuitValueToPlayer(playerNo,suit,value) {
		this.deck.deckOfCards.forEach(function(card) {
			if (card.suit == suit && card.value == value) {
				this.players[playerNo].receiveCard(card);
			}
		});
	}

	giveCardsToPlayer(playerNo,list) {
		let a = list.split(",");
		this.deck.deckOfCards.forEach(function(card) {
			a.forEach(function(cardID) {
				if (card.cardID == cardID) {
					this.players[playerNo].receiveCard(card);
				}
			});
		});
	}

	giveCustomPackToPlayer(playerNo,packNo) {
		this.players[playerNo].surrenderCards();

		switch (packNo) {
			case 0:
				this.giveSuitValueToPlayer(playerNo,CardSuit.Clubs,1);
				this.giveSuitValueToPlayer(playerNo,CardSuit.Spades,2);
				this.giveSuitValueToPlayer(playerNo,CardSuit.Diamonds,3);
				this.giveSuitValueToPlayer(playerNo,CardSuit.Hearts,4);
				this.giveSuitValueToPlayer(playerNo,CardSuit.Clubs,5);
				this.giveSuitValueToPlayer(playerNo,CardSuit.Spades,6);
				this.giveSuitValueToPlayer(playerNo,CardSuit.Diamonds,7);
				this.giveSuitValueToPlayer(playerNo,CardSuit.Hearts,8);
				this.giveSuitValueToPlayer(playerNo,CardSuit.Clubs,9);
				this.giveSuitValueToPlayer(playerNo,CardSuit.Spades,10);
				this.giveSuitValueToPlayer(playerNo,CardSuit.Diamonds,11);
				this.giveSuitValueToPlayer(playerNo,CardSuit.Hearts,12);
				this.giveSuitValueToPlayer(playerNo,CardSuit.Clubs,13);
				break;
			case 1:
				this.giveSuitValueToPlayer(playerNo,CardSuit.Clubs,10);
				this.giveSuitValueToPlayer(playerNo,CardSuit.Spades,12);
				this.giveSuitValueToPlayer(playerNo,CardSuit.Spades,6);
				this.giveSuitValueToPlayer(playerNo,CardSuit.Hearts,2);
				this.giveSuitValueToPlayer(playerNo,CardSuit.Hearts,5);
				this.giveSuitValueToPlayer(playerNo,CardSuit.Spades,10);
				this.giveSuitValueToPlayer(playerNo,CardSuit.Spades,7);
				this.giveSuitValueToPlayer(playerNo,CardSuit.Hearts,4);
				this.giveSuitValueToPlayer(playerNo,CardSuit.Hearts,7);
				this.giveSuitValueToPlayer(playerNo,CardSuit.Clubs,4);
				this.giveSuitValueToPlayer(playerNo,CardSuit.Diamonds,12);
				this.giveSuitValueToPlayer(playerNo,CardSuit.Spades,11);
				this.giveSuitValueToPlayer(playerNo,CardSuit.Hearts,9);
				break;
			case 2:
			case 3:
			default:
				break;
		}
	}

	dumpPack(packNo) {
		console.log("Pack " + packNo + " dump:");
		this.packs[packNo].forEach(function(card){
			console.log(card.description);
		});
	}

	dumpPlayer(playerNo) {
		console.log("Player " + playerNo + " dump:");
		this.players[playerNo].cards.forEach(function(card) {
			console.log(card.decription);
		});
	}

	dumpPlayers() {
		this.players.forEach(function(p){p.dumpCards();});
	}

	thisPlayer() {
		return this.players[PlayerType.ThisPlayer];
	}

	firstOpponent() {
		return this.players[PlayerType.FirstOpponent];
	}

	secondOpponent() {
		return this.players[PlayerType.SecondOpponent];
	}

	thirdOpponent() {
		return this.players[PlayerType.ThirdOpponent];
	}
	
	playerWithID(playerID) {
		let player;
		this.players.forEach(function(p){
			if (p.playerID == playerID) player = p;
		});
		return player;
	}

	playersRankedByScore() {
		let sortedPlayers = [...this.players];
		sortedPlayers.sort(function(a,b) {
			if (a.didFold != b.didFold) {
				return a.didFold  - b.didFold;
			} else if (a.score != b.score) {
				return a.score - b.score;
			} else if (a.bestHand != b.bestHand) {
				return a.bestHand - b.bestHand;
			} else {
				return 1;
			}
		});
		return sortedPlayers;
	}

	updatePlayerScores() {
		let handScores = [0,0,0];
		this.players.forEach(function(player) {
			handScores = [0,0,0];
			player.score = 0;
			player.resetHandScores();
			this.players.forEach(function(opponent) {
				if (player.playerID != opponent.playerID) {
					for (let i = 0; i < 3; i++) {
						let fromIndex = (i==0)?0:(i==1)?3:8;
						let toIndex = (i==0)?3:(i==1)?8:13;
						let playerHand = player.arrangedCards.slice(fromIndex,toIndex);
						let playerHandInfo = Poker.analyzeHand(playerHand);
						let opponentHand = opponent.arrangedCards.slice(fromIndex,toIndex);
						let opponentHandInfo = Poker.analyzeHand(opponentHand);
						let result = Poker.matchHands(playerHandInfo,opponentHandInfo);
						if (result == 1) {
							handScore[i]++;
							player.score++;
						} else if (result == -1) {
							handScore[i]--;
							player.score--;
						}
						if (i==2) player.bestHand = playerHandInfo.percentile;
					}
				}
			});
			player.setHandScoreAtIndex(handScores[0],0);
			player.setHandScoreAtIndex(handScores[1],1);
			player.setHandScoreAtIndex(handScores[2],2);
		});
	}

	updateScoresByMiddleHandRule() {
		let handScores = [0,0,0];
		this.players.forEach(function(player) {
			handScores = [0,0,0];
			player.score = 0;
			player.resetHandScores();
			this.players.forEach(function(opponent) {
				if (player.playerID != opponent.playerID) {
					for (let i = 0; i < 3; i++) {
						let j = (i+1)%3;
						let fromIndex = (j==0)?0:(j==1)?3:8;
						let toIndex = (j==0)?3:(j==1)?8:13;
						let playerHand = player.arrangedCards.slice(fromIndex,toIndex);
						let playerHandInfo = Poker.analyzeHand(playerHand);
						let opponentHand = opponent.arrangedCards.slice(fromIndex,toIndex);
						let opponentHandInfo = Poker.analyzeHand(opponentHand);
						let result = Poker.matchHands(playerHandInfo,opponentHandInfo);
						if (result == 1) {
							handScore[j] += 3;
							player.score += 3;
						} else if (result == -1) {
						}
						if (j==2) player.bestHand = playerHandInfo.percentile;
					}
				}
			});
			player.setHandScoreAtIndex(handScores[0],0);
			player.setHandScoreAtIndex(handScores[1],1);
			player.setHandScoreAtIndex(handScores[2],2);
		});
	}

	potMoney() {
		let total = 0;
		this.players.forEach(function(player) {
			total += player.bet;
		});
		return total;
	}

	static cardsPerPokerHand() {
		return kCardsPerPokerHand;
	}

	static combination(n,k) {
		if (k>n) {
			return 0;
		} else {
			let r = 1;
			for (let d = 1; d <= k; ++d) {
				r *= n--;
				r /= d;
			}
			return r;
		}
	}

	static sortHandByCardID(hand) {
		let clone = [...hand];
		clone.sort(function(a,b){return a.cardID.localeCompare(b.cardID);});
		return clone;
	}

	static sortHandBySuit(hand) {
		let clone = [...hand];
		clone.sort(function(a,b) {
			if (a.suit != b.suit) {
				return a.suit - b.suit;
			} else {
				return a.value - b.value;
			}
		});
		return clone;
	}

	static sortHandByValue(hand) {
		let clone = [...hand];
		clone.sort(function(a,b){return a.value-b.value;});
		return clone;
	}

	static sortHandByAltValue(hand) {
		let clone = [...hand];
		clone.sort(function(a,b){return a.altvalue-b.altvalue;});
		return clone;
	}

	static extractPokerHand(handType,hand,arranged) {
		switch (handType) {
			case kRoyalFlush:
				return Poker.extractRoyalFlush(hand,arranged);
			case kStraightFlush:
				return Poker.extractStraightFlush(hand,arranged);
			case kFourOfAKind:
				return Poker.extractFourOfAKind(hand,arranged);
			case kFullHouse:
				return Poker.extractFullHouse(hand,arranged); 
			case kFlush:
				return Poker.extractFlush(hand,arranged);
			case kStraight:
				return Poker.extractStraight(hand,arranged);
			case kThreeOfAKind:
				return Poker.extractThreeOfAKind(hand,arranged);
			case kTwoPair:
				return Poker.extractTwoPair(hand,arranged);
			case kOnePair:
				return Poker.extractOnePair(hand,arranged);
			case kHighCard:
			default:
				return true;
		}
	}

	static extractRoyalFlush(hand,arranged) {
		if (hand.length < 5) {
			return false;
		}
		let card1,card2,card3,card4,card5;
		let sortedHand = Poker.sortHandByCardID(hand);

		for (let i = 0; i < sortedHand.length-4; i++) {

			card1 = sortedHand[i];
			card2 = sortedHand[i+1];
			card3 = sortedHand[i+2];
			card4 = sortedHand[i+3];
			card5 = sortedHand[i+4];

			if ((card2.value+1) == card3.value && (card3.value+1) == card4.value &&
				(card4.value+1) == card5.value && (card5.value+1) == card1.altvalue &&
				card1.suit == card2.suit && card2.suit == card3.suit && 
				card3.suit == card4.suit && card4.suit == card5.suit) {

				arranged.push(card5);
				arranged.push(card4);
				arranged.push(card3);
				arranged.push(card2);
				arranged.push(card1);

				hand.splice(hand.indexOf(card5),1);
				hand.splice(hand.indexOf(card4),1);
				hand.splice(hand.indexOf(card3),1);
				hand.splice(hand.indexOf(card2),1);
				hand.splice(hand.indexOf(card1),1);

				return true;
			}
		}
		return false;
	}

	static extractStraightFlush(hand,arranged) {
		if (hand.length < 5) {
			return false;
		}
		let card1,card2,card3,card4,card5;
		let sortedHand = Poker.sortHandByCardID(hand);

		for (let i = 0; i < sortedHand.length-4; i++) {

			card1 = sortedHand[i];
			card2 = sortedHand[i+1];
			card3 = sortedHand[i+2];
			card4 = sortedHand[i+3];
			card5 = sortedHand[i+4];

			if ((card1.value+1) == card2.value && (card2.value+1) == card3.value && 
				(card3.value+1) == card4.value && (card4.value+1) == card5.value && 
				card1.suit == card2.suit && card2.suit == card3.suit && 
				card3.suit == card4.suit && card4.suit == card5.suit) {

				arranged.push(card5);
				arranged.push(card4);
				arranged.push(card3);
				arranged.push(card2);
				arranged.push(card1);

				hand.splice(hand.indexOf(card5),1);
				hand.splice(hand.indexOf(card4),1);
				hand.splice(hand.indexOf(card3),1);
				hand.splice(hand.indexOf(card2),1);
				hand.splice(hand.indexOf(card1),1);

				return true;
			}
		}
		return false;
	}

	static extractFourOfAKind(hand,arranged) {
		if (hand.length < 5) {
			return false;
		}
		let card1,card2,card3,card4;
		let joker = Card.joker();
		let sortedHand = Poker.sortHandByValue(hand);

		for (let i = sortedHand.length-4; i >= 0; i--) {

			card1 = sortedHand[i];
			card2 = sortedHand[i+1];
			card3 = sortedHand[i+2];
			card4 = sortedHand[i+3];

			if (card1.value == card2.value && card2.value == card3.value && 
				card3.value == card4.value) {

				arranged.push(joker);
				arranged.push(card4);
				arranged.push(card3);
				arranged.push(card2);
				arranged.push(card1);

				hand.splice(hand.indexOf(card4),1);
				hand.splice(hand.indexOf(card3),1);
				hand.splice(hand.indexOf(card2),1);
				hand.splice(hand.indexOf(card1),1);

				return true;
			}
		}
		return false;
	}

	static extractFullHouse(hand,arranged) {
		if (hand.length < 5) {
			return false;
		}
		let card1,card2,card3,card4,card5;
		let sortedHand = Poker.sortHandByValue(hand);

		for (let i = sortedHand.length-3; i >= 0; i--) {

			card1 = sortedHand[i];
			card2 = sortedHand[i+1];
			card3 = sortedHand[i+2];

			if (card1.value == card2.value && card2.value == card3.value) {

				for (let j = sortedHand.length-3; j >= 0; --j) {
                
					if (j > (i+2) || (j+1) < i) {

						card4 = sortedHand[j];
						card5 = sortedHand[j+1];

						if (card4.value == card5.value) {

							arranged.push(card5);
							arranged.push(card4);
							arranged.push(card3);
							arranged.push(card2);
							arranged.push(card1);

							hand.splice(hand.indexOf(card5),1);
							hand.splice(hand.indexOf(card4),1);
							hand.splice(hand.indexOf(card3),1);
							hand.splice(hand.indexOf(card2),1);
							hand.splice(hand.indexOf(card1),1);

							return true;
						}
					}
				}
			}
		}
		return false;
	}

	static extractFlush(hand,arranged) {
		if (hand.length < 5) {
			return false;
		}
		let card1,card2,card3,card4,card5;
		let sortedHand = Poker.sortHandBySuit(hand);

		for (let i = sortedHand.length-5; i >= 0; i--) {

			card1 = sortedHand[i];
			card2 = sortedHand[i+1];
			card3 = sortedHand[i+2];
			card4 = sortedHand[i+3];
			card5 = sortedHand[i+4];

			if (card1.suit == card2.suit && card2.suit == card3.suit && 
				card3.suit == card4.suit && card4.suit == card5.suit) {

				arranged.push(card5);
				arranged.push(card4);
				arranged.push(card3);
				arranged.push(card2);
				arranged.push(card1);

				hand.splice(hand.indexOf(card5),1);
				hand.splice(hand.indexOf(card4),1);
				hand.splice(hand.indexOf(card3),1);
				hand.splice(hand.indexOf(card2),1);
				hand.splice(hand.indexOf(card1),1);

				return true;
			}
		}
		return false;
	}

	static extractStraight(hand,arranged) {
		if (hand.length < 5) {
			return false;
		}
		let card1,card2,card3,card4,card5;
		let sortedHand = Poker.sortHandByValue(hand);

		for (let i=sortedHand.length-5; i>0; --i) {
			for (let j=sortedHand.length-4; j>i; --j) {
				for (let k=sortedHand.length-3; k>j; --k) {
					for (let l=sortedHand.length-2; l>k; --l) {
						for (let m=sortedHand.length-1; m>l; --m) {

							card1 = sortedHand[i];
							card2 = sortedHand[j];
							card3 = sortedHand[k];
							card4 = sortedHand[l];
							card5 = sortedHand[m];

							if ((card1.value+1) == card2.value && 
								(card2.value+1) == card3.value && 
								(card3.value+1) == card4.value && 
								(card4.value+1) == card5.value) {

								arranged.push(card5);
								arranged.push(card4);
								arranged.push(card3);
								arranged.push(card2);
								arranged.push(card1);

								hand.splice(hand.indexOf(card5),1);
								hand.splice(hand.indexOf(card4),1);
								hand.splice(hand.indexOf(card3),1);
								hand.splice(hand.indexOf(card2),1);
								hand.splice(hand.indexOf(card1),1);

								return true;
							}
						}
					}
				}
			}
		}
		return false;
	}

	static extractThreeOfAKind(hand,arranged) {
		if (hand.length < 5) {
			return false;
		}
		let card1,card2,card3;
		let joker = Card.joker();
		let sortedHand = Poker.sortHandByValue(hand);

		for (let i = sortedHand.length-3; i >= 0; --i) {

			card1 = sortedHand[i];
			card2 = sortedHand[i+1];
			card3 = sortedHand[i+2];

			if (card1.value == card2.value && card2.value == card3.value) {

				arranged.push(joker);
				arranged.push(joker);
				arranged.push(card3);
				arranged.push(card2);
				arranged.push(card1);

				hand.splice(hand.indexOf(card3),1);
				hand.splice(hand.indexOf(card2),1);
				hand.splice(hand.indexOf(card1),1);

				return true;

			}
		}
		return false;
	}

	static extractTwoPair(hand,arranged) {
		if (hand.length < 5) {
			return false;
		}
		let card1,card2,card3,card4;
		let joker = Card.joker();
		let sortedHand = Poker.sortHandByValue(hand);

		for (let i = sortedHand.length-2; i >= 0; --i) {

			card1 = sortedHand[i];
			card2 = sortedHand[i+1];

			if (card1.value == card2.value) {

				for (let j = 0; j <= sortedHand.length-2; ++j) {

					if (j > i+1 || j+1 < i) {

						card3 = sortedHand[j];
						card4 = sortedHand[j+1];

						if (card3.value == card4.value) {

							arranged.push(joker);
							arranged.push(card1);
							arranged.push(card2);
							arranged.push(card3);
							arranged.push(card4);

							hand.splice(hand.indexOf(card1),1);
							hand.splice(hand.indexOf(card2),1);
							hand.splice(hand.indexOf(card3),1);
							hand.splice(hand.indexOf(card4),1);

							return true;
						}
					}
				}
			}
		}
		return false;
	}

	static extractOnePair(hand,arranged) {
	    if (hand.length < 5) {
        	return false;
		}
    	let card1,card2;
		let joker = Card.joker();
    	let sortedHand = Poker.sortHandByValue(hand);

		for (let i = sortedHand.length-2; i >= 0; --i) {
        
			card1 = sortedHand[i];
			card2 = sortedHand[i+1];
        
			if (card1.value == card2.value) {
            
				arranged.push(joker);
				arranged.push(joker);
				arranged.push(joker);
				arranged.push(card2);
				arranged.push(card1);
            
				hand.splice(hand.indexOf(card2),1);
				hand.splice(hand.indexOf(card1),1);
            
				return true;
			}
		}
		return false;
	}

	autoArrangeForPlayer(playerNo) {
		let player = this.players[playerNo];
	    return Poker.findBestPokerPlay(player.cards,player.arrangedCards);
	}

	// TO DO
	findAllPokerHands(hand) {
	}

	static findBestPokerPlay(hand,arranged) {
		let handType = [kHighCard,kHighCard];
		let tempHandType = [kHighCard,kHighCard];
		let bestHand = kHighCard;
		let handTypeIndex = 0; 
		let index = 0;
		
		for (let i = kRoyalFlush; i > kHighCard; --i) {

			let mutableHand = Poker.sortHandByValue(hand);
			let arrangedHand = [];
			handTypeIndex = i;
			index = 0;
				
			do {
				if (Poker.extractPokerHand(handTypeIndex,mutableHand,arrangedHand)) {
					tempHandType[index] = handTypeIndex;
					index++;
				}
				handTypeIndex--;
			} while (index < 2 && handTypeIndex > kHighCard);
				
			if (tempHandType[0] > kHighCard || tempHandType[1] > kHighCard) {
						
				// Both are better than a high card
				if (tempHandType[0] > handType[0]) {
					bestHand = tempHandType[0];
					handType[0] = tempHandType[0];
					handType[1] = tempHandType[1];
					arranged = [...arrangedHand];
					hand  = [...mutableHand];
				}
					
			} else if (tempHandType[0] > kHighCard) {

				// Only one is better than a high card
				if (tempHandType[0] > handType[0] && handType[1] == kHighCard) {
					bestHand = tempHandType[0];
					handType[0] = tempHandType[0];
					handType[1] = tempHandType[1];
					arranged = [...arrangedHand];
					hand  = [...mutableHand];
				}
			}
		}

		// Replace the jokers with the remaining cards, start from the lowest
		for (let i = 0; i < arranged.length; i++) {
			let eachCard = arranged[i];
			if (eachCard.suit == CardSuit.Joker) {
				arranged[i] = hand[0];
				hand.shift();
			}
		}

		// Transfer remaining cards to arranged, then reverse order
		arranged.concat(hand);
		arranged.reverse();
		hand = [];
		
		return bestHand;
	}

	static findGamesWithGoodHands(handType) {
	}

	static findGamesWithRoyalties() {
	}

	static findNextSpecialGame(gameNo,handType) {
	}

	static findBestHandInGame(gameNo) {
		let poker = new Poker();

		poker.shuffleDeck(gameNo);
		poker.distributeCards();
		poker.distributeHands();

		let bestHandType = kHighCard;
		for (let j = 0; j < poker.players.length; ++j) {
			let player = poker.players[j];
			for (let p = kRoyalFlush; p >= kHighCard; --p) {
				let hand = player.cards;
				let arrangedHands = [];
				if (Poker.extractPokerHand(p,hand,arrangedHands)) {
					if (p > bestHandType) {
						bestHandType = p;
					}
				}
			}
		}

		return bestHandType;
	}

	static findRoyaltyInGame(gameNo) {
		let poker = new Poker();

		poker.shuffleDeck(gameNo);
		poker.distributeCards();
		poker.distributeHands();

		let royalty = 0;
		let bestRoyalty = kNoRoyalty;
		for (let j = 0; j < poker.players.length; ++j) {
			let player = poker.players[j];
			royalty = Poker.findPokerRoyalty(player.cards);
			if (royalty > bestRoyalty) {
				bestRoyalty = royalty;
			}
		}

		return bestRoyalty;
	}

	static isValidHand(hand) {
		if (hand == null) {
			return false;
		}
		if (hand.length < kCardsOnHand) {
			return false;
		}

		let frontHand = hand.slice(0,3);
		let frontHandInfo = Poker.analyzeHand(frontHand);
		
		let middleHand = hand.slice(3,8);
		let middleHandInfo = Poker.analyzeHand(middleHand);

		let backHand = hand.slice(8,13);
		let backHandInfo = Poker.analyzeHand(backHand);

		if (Poker.matchHands(middleHandInfo,backHandInfo) == kLeftHandWins) {
			return false;
		}
		
		if (Poker.matchFrontMiddle(frontHandInfo,middleHandInfo) == kLeftHandWins) {
			return false;
		}
		
		return true;
	}

	static findPokerRoyalty(hand) {
		if (Poker.hasThirteenUniqueCards(hand)) {
			return kThirteenUniqueCards;
		} else if (Poker.hasThreeFlushes(hand)) {
			return kThreeFlushes;
		} else if (Poker.hasThreeStraights(hand)) {
			return kThreeStraights;
		} else if (Poker.hasSixPairs(hand)) {
			return kSixPairs;
		} else {
			return kNoRoyalty;
		}
	}

	static hasSixPairs(hand) {
		let card1,card2;
		let sortedHand = Poker.sortHandByValue(hand);
		let foundNoPair = false;
		let i, j;

		for (i = 0, j = 1; j < sortedHand.length; i += 2, j += 2) {
        
			card1 = sortedHand[i];
			card2 = sortedHand[j];
        
			if (card1.value != card2.value) {

				if (!foundNoPair) {
					foundNoPair = true;
				} else {
					return false;
				}
            
				++i;
				++j;
            
				if (j < sortedHand.length) {

					card1 = sortedHand[i];
					card2 = sortedHand[j];
                
					if (card1.value != card2.value) {
						return false;
					}
				} else {
					return false;
				}
			}
    	}
    	return true;
	}

	static hasThreeStraights(hand) {
		let sortedHand = Poker.sortHandByValue(hand);
		let duplicates = [];
		let hand1 = [];
		let hand2 = [];
		let hand3 = [];
		let lastCard = sortedHand[0];
		hand1.push(lastCard);
    
		for (let i = 1; i < sortedHand.length; ++i) {
			let card = sortedHand[i];
			if (card.value != lastCard.value) {
				if (hand1.length < 3) {
					hand1.push(card);
					lastCard = card;
				} else if (hand1.length < 5 && duplicates.length == 0) {
					hand1.push(card);
					lastCard = card;
				} else {
					duplicates.push(card);
				}
			} else {
				duplicates.push(card);
			}
		}

		lastCard = duplicates[0];
		hand2.push(lastCard);
    
		for (let i = 1; i < duplicates.length; ++i) {
			let card = duplicates[i];
			if (card.value != lastCard.value) {
				if (hand2.length < 3) {
					hand2.push(card);
					lastCard = card;
				} else if (hand2.length < 5 && hand3.length == 0) {
					hand2.push(card);
					lastCard = card;
				} else {
					hand3.push(card);
				}
			} else {
				hand3.push(card);
			}
		}
    
		sortedHand = hand1.concat(hand2).concat(hand3);
    
		let c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13;
    
		c1 = sortedHand[0];
		c2 = sortedHand[1];
		c3 = sortedHand[2];
		c4 = sortedHand[3];
		c5 = sortedHand[4];
		c6 = sortedHand[5];
		c7 = sortedHand[6];
		c8 = sortedHand[7];
		c9 = sortedHand[8];
		c10 = sortedHand[9];
		c11 = sortedHand[10];
		c12 = sortedHand[11];
		c13 = sortedHand[12];

		if ((c2.value - c1.value == 1 && c3.value - c2.value == 1 &&
			c5.value - c4.value == 1 && c6.value - c5.value == 1 && 
			c7.value - c6.value == 1 && c8.value - c7.value == 1 &&
			c10.value - c9.value == 1 && c11.value - c10.value == 1 && 
			c12.value - c11.value == 1 && c13.value - c12.value == 1) ||

			(c2.value - c1.value == 1 && c3.value - c2.value == 1 && 
			c4.value - c3.value == 1 && c5.value - c4.value == 1 &&
			c7.value - c6.value == 1 && c8.value - c7.value == 1 &&
			c10.value - c9.value == 1 && c11.value - c10.value == 1 && 
			c12.value - c11.value == 1 && c13.value - c12.value == 1) ||
        
			(c2.value - c1.value == 1 && c3.value - c2.value == 1 && 
			c4.value - c3.value == 1 && c5.value - c4.value == 1 &&
			c7.value - c6.value == 1 && c8.value - c7.value == 1 && 
			c9.value - c8.value == 1 && c10.value - c9.value == 1 &&
			c12.value - c11.value == 1 && c13.value - c12.value == 1)) {

			return true;
		}
		return false;
	}

	static hasThreeFlushes(hand) {
		let sortedHand = Poker.sortHandBySuit(hand);
		let c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13;
    
		c1 = sortedHand[0];
		c2 = sortedHand[1];
		c3 = sortedHand[2];
		c4 = sortedHand[3];
		c5 = sortedHand[4];
		c6 = sortedHand[5];
		c7 = sortedHand[6];
		c8 = sortedHand[7];
		c9 = sortedHand[8];
		c10 = sortedHand[9];
		c11 = sortedHand[10];
		c12 = sortedHand[11];
		c13 = sortedHand[12];
    
		if ((c1.suit == c2.suit && c2.suit == c3.suit &&
			c4.suit == c5.suit && c5.suit == c6.suit && 
			c6.suit == c7.suit && c7.suit == c8.suit &&
			c9.suit == c10.suit && c10.suit == c11.suit && 
			c11.suit == c12.suit && c12.suit == c13.suit) ||
        
			(c1.suit == c2.suit && c2.suit == c3.suit && 
			c3.suit == c4.suit && c4.suit == c5.suit &&
			c6.suit == c7.suit && c7.suit == c8.suit &&
			c9.suit == c10.suit && c10.suit == c11.suit && 
			c11.suit == c12.suit && c12.suit == c13.suit) ||
        
			(c1.suit == c2.suit && c2.suit == c3.suit && 
			c3.suit == c4.suit && c4.suit == c5.suit &&
			c6.suit == c7.suit && c7.suit == c8.suit && 
			c8.suit == c9.suit && c9.suit == c10.suit &&
			c11.suit == c12.suit && c12.suit == c13.suit)) {
            
			return true;
		}
		return false;
	}

	static hasThirteenUniqueCards(hand) {
		let sortedHand = Poker.sortHandByValue(hand);
		let i, j;
		for (i = 0, j = 1; j < sortedHand.length; ++i, ++j) {
			let card1 = sortedHand[i];
			let card2 = sortedHand[j];
			if (card2.value - card1.value != 1) {
				return false;
			}
		}
		return true;
	}

	static hasRoyalFlush(hand) {
		let pokerHandInfo = { handsBeaten:0, handType:0, percentile:0, frequency:0, probability:0, values:[] };

		if (hand.length < kMinCardsInHand) {
			return pokerHandInfo;
		}
    
		let sortedHand = Poker.sortHandByAltValue(hand);
		let card1,card2,card3,card4,card5;
    
		card1 = sortedHand[0];
		card2 = sortedHand[1];
		card3 = sortedHand[2];
    
		if (hand.length == 3) {

			if (card2.altvalue - card1.altvalue == 1 && card2.suit == card1.suit &&
				card3.altvalue - card2.altvalue == 1 && card3.suit == card2.suit &&
				card1.altvalue == 12) {
            
				pokerHandInfo.handsBeaten = kRoyalFlushTripleBeats;
				pokerHandInfo.handType = kRoyalFlushTriple;
				pokerHandInfo.percentile = pokerHandInfo.handsBeaten / kAllTriples;
				pokerHandInfo.frequency = kRoyalFlushTriples;
				pokerHandInfo.probability = kRoyalFlushTripleProb;
				pokerHandInfo.values[0] = card3.altvalue;

				return pokerHandInfo;

			} else {
				return pokerHandInfo;
			}        
		}
    
		card4 = sortedHand[3];
		card5 = sortedHand[4];
    
		if (card2.altvalue - card1.altvalue == 1 && card2.suit == card1.suit &&
			card3.altvalue - card2.altvalue == 1 && card3.suit == card2.suit &&
			card4.altvalue - card3.altvalue == 1 && card4.suit == card3.suit &&
			card5.altvalue - card4.altvalue == 1 && card5.suit == card4.suit &&
			card1.altvalue == 10) {
        
			// Probablity of getting a royal flush: 4 / C(52,5)
			// There are only 4 royal flushes
			// C(52,5) possible ways to get a poker hand
			pokerHandInfo.handsBeaten = kRoyalFlushBeats;
        
		} else {
			return pokerHandInfo;
		}

		pokerHandInfo.handType = kRoyalFlush;
		pokerHandInfo.percentile = pokerHandInfo.handsBeaten / kAllPokerHands;
		pokerHandInfo.frequency = kRoyalFlushHands;
		pokerHandInfo.probability = kRoyalFlushProbability;
		pokerHandInfo.values[0] = card5.altvalue;
    
		return pokerHandInfo;
	}

	static hasStraightFlush(hand) {
		let pokerHandInfo = { handsBeaten:0, handType:0, percentile:0, frequency:0, probability:0, values:[] };
		if (hand.length < kMinCardsInHand) {
			return pokerHandInfo;
		}
    
		let sortedHand = Poker.sortHandByValue(hand);
		let card1,card2,card3,card4,card5;
    
		card1 = sortedHand[0];
		card2 = sortedHand[1];
		card3 = sortedHand[2];
    
		if (hand.length == 3) {

			if (card2.value - card1.value == 1 && card2.suit == card1.suit &&
				card3.value - card2.value == 1 && card3.suit == card2.suit) {
            
				pokerHandInfo.handsBeaten = kStraightFlushTripleBeats + 4 * (card3.value-3);
				pokerHandInfo.handType = kStraightFlushTriple;
				pokerHandInfo.percentile = pokerHandInfo.handsBeaten / kAllTriples;
				pokerHandInfo.frequency = kStraightFlushTriples;
				pokerHandInfo.probability = kStraightFlushTripleProb;
				pokerHandInfo.values[0] = card3.value;
            
				return pokerHandInfo;

			} else {
				return pokerHandInfo;
			}
		}
    
		card4 = sortedHand[3];
		card5 = sortedHand[4];

		if (card2.value - card1.value == 1 && card2.suit == card1.suit &&
			card3.value - card2.value == 1 && card3.suit == card2.suit &&
			card4.value - card3.value == 1 && card4.suit == card3.suit &&
			card5.value - card4.value == 1 && card5.suit == card4.suit) {

			// Probability of a straight flush (excluding royal flush): 4 * 9 / C(52,5)
			// 4 different suits
			// 10 different ways to get a straight from a suit but 1 is a royal flush, so 9
			// C(52,5) possible ways to get a poker hand
			pokerHandInfo.handsBeaten = kStraightFlushBeats + 4 * (card5.value-5);

		} else {
			return pokerHandInfo;
		}
    
		pokerHandInfo.handType = kStraightFlush;
		pokerHandInfo.percentile = pokerHandInfo.handsBeaten / kAllPokerHands;
		pokerHandInfo.frequency = kStraightFlushHands;
		pokerHandInfo.probability = kStraightFlushProbability;
		pokerHandInfo.values[0] = card5.value;
    
		return pokerHandInfo;
	}

	static hasFourOfAKind(hand) {
		let pokerHandInfo = { handsBeaten:0, handType:0, percentile:0, frequency:0, probability:0, values:[] };
		if (hand.length < 5) {
			return pokerHandInfo;
		}

		let sortedHand = Poker.sortHandByAltValue(hand);
		let card1,card2,card3,card4,card5;

		card1 = sortedHand[0];
		card2 = sortedHand[1];
		card3 = sortedHand[2];
		card4 = sortedHand[3];
		card5 = sortedHand[4];

		if (card1.altvalue == card2.altvalue && card2.altvalue == card3.altvalue && 
			card3.altvalue == card4.altvalue) {

			pokerHandInfo.handsBeaten = kFourOfAKindBeats + 48 * (card1.altvalue - 2);
			pokerHandInfo.values[0] = card1.altvalue;

		} else if (card2.altvalue == card3.altvalue && card3.altvalue == card4.altvalue && 
			card4.altvalue == card5.altvalue) {

			pokerHandInfo.handsBeaten = kFourOfAKindBeats + 48 * (card2.altvalue - 2);
			pokerHandInfo.values[0] = card2.altvalue;

		} else {
			return pokerHandInfo;
		}

		// Probability of a four of a kind: 13 * C(48,1) / C(52,5)
		// There are 13 numbers that could be a four-of-a-kind
		// There are C(48,1) ways to get the remaining card
		// C(52,5) possible ways to get a poker hand

		pokerHandInfo.handType = kFourOfAKind;
		pokerHandInfo.percentile = pokerHandInfo.handsBeaten / kAllPokerHands;
		pokerHandInfo.frequency = kFourOfAKindHands;
		pokerHandInfo.probability = kFourOfAKindProbability;

		return pokerHandInfo;
	}

	static hasFullHouse(hand) {
		let pokerHandInfo = { handsBeaten:0, handType:0, percentile:0, frequency:0, probability:0, values:[] };
		if (hand.length < 5) {
			return pokerHandInfo;
		}

		let sortedHand = Poker.sortHandByAltValue(hand);
		let card1,card2,card3,card4,card5;

		card1 = sortedHand[0];
		card2 = sortedHand[1];
		card3 = sortedHand[2];
		card4 = sortedHand[3];
		card5 = sortedHand[4];

		if (card1.altvalue == card2.altvalue && card2.altvalue == card3.altvalue && 
			card4.altvalue == card5.altvalue &&
			card1.suit != CardSuit.Joker && card4.suit != CardSuit.Joker) {

			pokerHandInfo.handsBeaten = kFullHouseBeats + 72 * (card1.altvalue - 2);
			pokerHandInfo.values[0] = card1.altvalue;
			pokerHandInfo.values[1] = card4.altvalue;

		} else if (card1.altvalue == card2.altvalue && card3.altvalue == card4.altvalue && 
			card4.altvalue == card5.altvalue &&
			card1.suit != CardSuit.Joker && card3.suit != CardSuit.Joker) {

			pokerHandInfo.handsBeaten = kFullHouseBeats + 72 * (card3.altvalue - 2);
			pokerHandInfo.values[0] = card3.altvalue;
			pokerHandInfo.values[1] = card1.altvalue;

		} else {
			return pokerHandInfo;
		}

		// Probability of a full house: 13 * C(4,3) * 12 * C(4,2) / C(52,5)
		// 13 numbers that could be a triple
		// C(4,3) ways to take 3 cards from 4 suits
		// 12 remaining numbers that could ba a pair
		// C(4,2) ways to take 2 cards from 4 suits
		// C(52,5) possible ways to get a poker hand

		pokerHandInfo.handType = kFullHouse;
		pokerHandInfo.percentile = pokerHandInfo.handsBeaten / kAllPokerHands;
		pokerHandInfo.frequency = kFullHouseHands;
		pokerHandInfo.probability = kFullHouseProbability;

		return pokerHandInfo;
	}

	static hasFlush(hand) {
		let pokerHandInfo = { handsBeaten:0, handType:0, percentile:0, frequency:0, probability:0, values:[] };
		if (hand.length < kMinCardsInHand) {
			return pokerHandInfo;
		}

		let sortedHand = Poker.sortHandByAltValue(hand);
		let card1,card2,card3,card4,card5;

		card1 = sortedHand[0];
		card2 = sortedHand[1];
		card3 = sortedHand[2];

		if (hand.length == 3) {

			if (card2.suit == card1.suit && card3.suit == card2.suit) {

				pokerHandInfo.handsBeaten = kFlushTripleBeats + 4 * (card1.altvalue-2) * 
					(card2.altvalue-2) * (card3.altvalue-2) / 6;
				pokerHandInfo.handType = kFlushTriple;
				pokerHandInfo.percentile = pokerHandInfo.handsBeaten / kAllTriples;
				pokerHandInfo.frequency = kFlushTriples;
				pokerHandInfo.probability = kFlushTripleProbability;
				pokerHandInfo.values[0] = card3.altvalue;
				pokerHandInfo.values[1] = card2.altvalue;
				pokerHandInfo.values[2] = card1.altvalue;

				return pokerHandInfo;

			} else {
				return pokerHandInfo;
			}
		}

		card4 = sortedHand[3];
		card5 = sortedHand[4];

		if (!(card1.suit == card2.suit && card2.suit == card3.suit && 
			card3.suit == card4.suit && card4.suit == card5.suit)) {
			return pokerHandInfo;
		}

		pokerHandInfo.handsBeaten = (card1.altvalue-2) * (card2.altvalue-2) * 
			(card3.altvalue-2) * (card4.altvalue-2) * (card5.altvalue-2);
		pokerHandInfo.handsBeaten *= 4;
		pokerHandInfo.handsBeaten /= 120;
		pokerHandInfo.handsBeaten += kFlushBeats;

		// Probability of a flush: (4 * C(13,5) - 40) / C(52,5)
		// 4 different suits
		// C(13,5) ways to get 5 numbers from a suit of 13 cards
		// less 40 straight/royal flushes
		// C(52,5) possible ways to get a poker hand

		pokerHandInfo.handType = kFlush;
		pokerHandInfo.percentile = pokerHandInfo.handsBeaten / kAllPokerHands;
		pokerHandInfo.frequency = kFlushHands;
		pokerHandInfo.probability = kFlushProbability;

		pokerHandInfo.values[0] = card5.altvalue;
		pokerHandInfo.values[1] = card4.altvalue;
		pokerHandInfo.values[2] = card3.altvalue;
		pokerHandInfo.values[3] = card2.altvalue;
		pokerHandInfo.values[4] = card1.altvalue;

		return pokerHandInfo;
	}

	static hasRoyalStraight(hand) {
		let pokerHandInfo = { handsBeaten:0, handType:0, percentile:0, frequency:0, probability:0, values:[] };
		if (hand.length < kMinCardsInHand) {
			return pokerHandInfo;
		}

		let sortedHand = Poker.sortHandByAltValue(hand);
		let card1,card2,card3,card4,card5;

		card1 = sortedHand[0];
		card2 = sortedHand[1];
		card3 = sortedHand[2];

		if (hand.length == 3) {
			if (card2.altvalue - card1.altvalue == 1 && card3.altvalue - card2.altvalue == 1 && 
				card1.altvalue == 12) {

				pokerHandInfo.handsBeaten = kStraightTripleBeats + 60 * (card3.altvalue-3);
				pokerHandInfo.handType = kStraightTriple;
				pokerHandInfo.percentile = pokerHandInfo.handsBeaten / kAllTriples;
				pokerHandInfo.frequency = kStraightTriples;
				pokerHandInfo.probability = kStraightTripleProbability;
				pokerHandInfo.values[0] = card3.altvalue;

				return pokerHandInfo;

			} else {
				return pokerHandInfo;
			}
		}

		card4 = sortedHand[3];
		card5 = sortedHand[4];

		if (card2.altvalue - card1.altvalue == 1 &&
			card3.altvalue - card2.altvalue == 1 &&
			card4.altvalue - card3.altvalue == 1 &&
			card5.altvalue - card4.altvalue == 1 &&
			card1.altvalue == 10) {

			pokerHandInfo.handsBeaten = kStraightBeats + 1020 * (card5.altvalue - 5);

		} else {
			return pokerHandInfo;
		}

		pokerHandInfo.handType = kStraight;
		pokerHandInfo.percentile = pokerHandInfo.handsBeaten / kAllPokerHands;
		pokerHandInfo.frequency = kStraightHands;
		pokerHandInfo.probability = kStraightProbability;
		pokerHandInfo.values[0] = card5.altvalue;

		return pokerHandInfo;
	}

	static hasStraight(hand) {
		let pokerHandInfo = { handsBeaten:0, handType:0, percentile:0, frequency:0, probability:0, values:[] };
		if (hand.length < kMinCardsInHand) {
			return pokerHandInfo;
		}

		let sortedHand = Poker.sortHandByValue(hand);
		let card1,card2,card3,card4,card5;

		card1 = sortedHand[0];
		card2 = sortedHand[1];
		card3 = sortedHand[2];

		if (hand.length == 3) {

			if (card2.value - card1.value == 1 && card3.value - card2.value == 1) {

				pokerHandInfo.handsBeaten = kStraightTripleBeats + 60 * (card3.value-3);
				pokerHandInfo.handType = kStraightTriple;
				pokerHandInfo.percentile = pokerHandInfo.handsBeaten / kAllTriples;
				pokerHandInfo.frequency = kStraightTriples;
				pokerHandInfo.probability = kStraightTripleProbability;
				pokerHandInfo.values[0] = card3.value;

				return pokerHandInfo;

			} else {
				return pokerHandInfo;
			}
		}

		card4 = sortedHand[3];
		card5 = sortedHand[4];

		if (card2.value - card1.value == 1 &&
			card3.value - card2.value == 1 &&
			card4.value - card3.value == 1 &&
			card5.value - card4.value == 1) {

			pokerHandInfo.handsBeaten = kStraightBeats + 1020 * (card5.value - 5);

		} else {
			return pokerHandInfo;
		}

		pokerHandInfo.handType = kStraight;
		pokerHandInfo.percentile = pokerHandInfo.handsBeaten / kAllPokerHands;
		pokerHandInfo.frequency = kStraightHands;
		pokerHandInfo.probability = kStraightProbability;
		pokerHandInfo.values[0] = card5.value;

		return pokerHandInfo;
	}

	static hasThreeOfAKind(hand) {
		let pokerHandInfo = { handsBeaten:0, handType:0, percentile:0, frequency:0, probability:0, values:[] };
		if (hand.length < 3) {
			return pokerHandInfo;
		}

		let sortedHand = Poker.sortHandByAltValue(hand);
		let card1,card2,card3,card4,card5;
		
		card1 = sortedHand[0];
		card2 = sortedHand[1];
		card3 = sortedHand[2];
		
		if (card1.altvalue == card2.altvalue && card2.altvalue == card3.altvalue) {
			pokerHandInfo.handsBeaten = card1.altvalue;
		}

		if (hand.length < 5) {
			if (pokerHandInfo.handsBeaten > 0) {

				pokerHandInfo.handsBeaten = kThreeOfAKindTripleBeats + 4 * (pokerHandInfo.handsBeaten - 2);
				pokerHandInfo.handType = kThreeTriple;
				pokerHandInfo.percentile = pokerHandInfo.handsBeaten / kAllTriples;
				pokerHandInfo.frequency = kThreeOfAKindTriples;
				pokerHandInfo.probability = kThreeOfAKindTripleProb;
				pokerHandInfo.values[0] = card1.altvalue;
						
				return pokerHandInfo;
						
			} else {
				return pokerHandInfo;
			}
		}
		
		card4 = sortedHand[3];
		card5 = sortedHand[4];
		
		if (card1.altvalue == card2.altvalue && card2.altvalue == card3.altvalue && 
			card1.suit != CardSuit.Joker) {
				
			pokerHandInfo.handsBeaten = card1.altvalue;
			pokerHandInfo.values[0] = card1.altvalue;
			pokerHandInfo.values[1] = card5.altvalue;
			pokerHandInfo.values[2] = card4.altvalue;
				
		} else if (card2.altvalue == card3.altvalue && card3.altvalue == card4.altvalue && 
			card2.suit != CardSuit.Joker) {
				
			pokerHandInfo.handsBeaten = card2.altvalue;
			pokerHandInfo.values[0] = card2.altvalue;
			pokerHandInfo.values[1] = card5.altvalue;
			pokerHandInfo.values[2] = card1.altvalue;
				
		} else if (card3.altvalue == card4.altvalue && card4.altvalue == card5.altvalue && 
			card3.suit != CardSuit.Joker) {
		
			pokerHandInfo.handsBeaten = card3.altvalue;
			pokerHandInfo.values[0] = card3.altvalue;
			pokerHandInfo.values[1] = card2.altvalue;
			pokerHandInfo.values[2] = card1.altvalue;

		} else {
			return pokerHandInfo;
		}
		
		// Probability of a three-of-a-kind: 13 * C(4,3) * C(12,2) * C(4,1) * C(4,1) / C(52,5)
		// 13 numbers that could be a triple
		// C(4,3) ways to take 3 cards from 4 suits
		// C(12,2) ways to choose two different numbers from the remaining 12
		// C(4,1) ways to choose the suit of the first card
		// C(4,1) ways to choose the suit of the second card
		// C(52,5) possible ways to get a poker hand

		// Probability of other 3-of-a-kinds less than this hand:
		// card1.value-2 numbers that could be a triple less than the current number
		// C(4,3) ways to take 3 cards from 4 suits
		// C(12,2) ways to choose two different numbers from the remaining 12
		// C(4,1) ways to choose the suit of the first card
		// C(4,1) ways to choose the suit of the second card
		// C(52,5) possible ways to get a poker hand

		pokerHandInfo.handsBeaten = kThreeOfAKindBeats + 4224 * (pokerHandInfo.handsBeaten - 2);
		pokerHandInfo.handType = kThreeOfAKind;
		pokerHandInfo.percentile = pokerHandInfo.handsBeaten / kAllPokerHands;
		pokerHandInfo.frequency = kThreeOfAKindHands;
		pokerHandInfo.probability = kThreeOfAKindProbability;

		return pokerHandInfo;
	}

	static hasTwoPair(hand) {
		let pokerHandInfo = { handsBeaten:0, handType:0, percentile:0, frequency:0, probability:0, values:[] };
		if (hand.length < 5) {
				return pokerHandInfo;
		}
		let sortedHand = Poker.sortHandByAltValue(hand);
		let card1,card2,card3,card4,card5;
		
		card1 = sortedHand[0];
		card2 = sortedHand[1];
		card3 = sortedHand[2];
		card4 = sortedHand[3];
		card5 = sortedHand[4];

		if (card1.altvalue == card2.altvalue && card3.altvalue == card4.altvalue &&
			card1.suit != CardSuit.Joker && card3.suit != CardSuit.Joker) {

			pokerHandInfo.values[0] = card3.altvalue; // Highest pair
			pokerHandInfo.values[1] = card1.altvalue; // Other pair
			pokerHandInfo.values[2] = card5.altvalue; // Kicker

		} else if (card1.altvalue == card2.altvalue && card4.altvalue == card5.altvalue &&
		   card1.suit != CardSuit.Joker && card4.suit != CardSuit.Joker) {
				
			pokerHandInfo.values[0] = card4.altvalue;
			pokerHandInfo.values[1] = card1.altvalue;
			pokerHandInfo.values[2] = card3.altvalue;
				
		} else if (card2.altvalue == card3.altvalue && card4.altvalue == card5.altvalue &&
		   card2.suit != CardSuit.Joker && card4.suit != CardSuit.Joker) {
				
			pokerHandInfo.values[0] = card4.altvalue;
			pokerHandInfo.values[1] = card2.altvalue;
			pokerHandInfo.values[2] = card1.altvalue;
				
		} else {
			return pokerHandInfo;
		}
		
		// Probability of a two-pair: C(13,2) * C(4,2) * C(4,2) * 11 * C(4,1) / C(52,5)
		// C(13,2) ways to choose two distinct numbers
		// C(4,2) ways to choose a pair for the first number
		// C(4,2) ways to choose a pair for the second number
		// 11 ways to choose the number of the fifth card
		// C(4,1) ways to choose the suit of the fifth card
		// C(52,5) possible ways to get a poker hand

		// Probability of other two-pairs less than this hand:
		// C(result-2,2) ways to choose three distinct numbers
		// C(4,2) ways to choose a pair for the first number
		// C(4,2) ways to choose a pair for the second number
		// 11 ways to choose the number of the fifth card
		// C(4,1) ways to choose the fifth card
		// C(52,5) possible ways to get a poker hand
		// C(result-2,2)*C(4,2)*C(4,2)*C(result-4,2)*C(4,1)

		if (pokerHandInfo.values[0] > 3) {
			pokerHandInfo.handsBeaten = kTwoPairBeats + 
				1584 * (Poker.combination(pokerHandInfo.values[0]-2,2) + 
				pokerHandInfo.values[1] - 2) + (pokerHandInfo.values[2] - 2);
		} else {
			pokerHandInfo.handsBeaten = kTwoPairBeats + pokerHandInfo.values[2] - 2;
		}

		pokerHandInfo.handType = kTwoPair;
		pokerHandInfo.percentile = pokerHandInfo.handsBeaten / kAllPokerHands;
		pokerHandInfo.frequency = kTwoPairHands;
		pokerHandInfo.probability = kTwoPairProbability;
		
		return pokerHandInfo;
	}

	static hasOnePair(hand) {
		let pokerHandInfo = { handsBeaten:0, handType:0, percentile:0, frequency:0, probability:0, values:[] };
		if (hand.length < 3) {
			return pokerHandInfo;
		}
		let sortedHand = Poker.sortHandByAltValue(hand);
		let card1,card2,card3;
		
		card1 = sortedHand[0];
		card2 = sortedHand[1];
		card3 = sortedHand[2];

		if (hand.length == 3) {

			if (card1.altvalue == card2.altvalue) {
				pokerHandInfo.values[0] = card1.altvalue;
				pokerHandInfo.values[1] = card3.altvalue;
			} else if (card2.altvalue == card3.altvalue) {
				pokerHandInfo.values[0] = card2.altvalue;
				pokerHandInfo.values[1] = card1.altvalue;
			} else {
				return pokerHandInfo;
			}
				
			pokerHandInfo.handsBeaten = kPairBeats + 284 * (pokerHandInfo.values[0]-2) + 
				4 * pokerHandInfo.values[1];
			pokerHandInfo.handType = kPairTriple;
			pokerHandInfo.percentile = pokerHandInfo.handsBeaten / kAllTriples;
			pokerHandInfo.frequency = kPairTriples;
			pokerHandInfo.probability = kPairProbability;
				
			return pokerHandInfo;
		}
		
		let card4,card5;
		
		card4 = sortedHand[3];
		card5 = sortedHand[4];
		
		if (card1.altvalue == card2.altvalue) {
				
			pokerHandInfo.values[0] = card1.altvalue;
			pokerHandInfo.values[1] = card5.altvalue;
			pokerHandInfo.values[2] = card4.altvalue;
			pokerHandInfo.values[3] = card3.altvalue;
				
		} else if (card2.altvalue == card3.altvalue) {
				
			pokerHandInfo.values[0] = card2.altvalue;
			pokerHandInfo.values[1] = card5.altvalue;
			pokerHandInfo.values[2] = card4.altvalue;
			pokerHandInfo.values[3] = card1.altvalue;
				
		} else if (card3.altvalue == card4.altvalue) {
				
			pokerHandInfo.values[0] = card3.altvalue;
			pokerHandInfo.values[1] = card5.altvalue;
			pokerHandInfo.values[2] = card2.altvalue;
			pokerHandInfo.values[3] = card1.altvalue;
				
		} else if (card4.altvalue == card5.altvalue) {
				
			pokerHandInfo.values[0] = card4.altvalue;
			pokerHandInfo.values[1] = card3.altvalue;
			pokerHandInfo.values[2] = card2.altvalue;
			pokerHandInfo.values[3] = card1.altvalue;
				
		} else {
				
			return pokerHandInfo;
		}

		// Probablity of a one pair: 13 * C(4,2) * C(12,3) * 4^3 / C(52,5)
		// 13 ways to choose one number
		// C(4,2) ways to choose a pair for it
		// C(12,3) ways to choose 3 distinct numbers from the remaining 12 numbers
		// 4^3 ways to choose the suits of the five numbers
		// C(52,5) possible ways to get a poker hand

		// Probablity of other one pairs less than this hand:
		// result-2 ways to choose one number
		// C(4,2) ways to choose a pair for it
		// C(12,3) ways to choose 3 distinct numbers from the remaining 12 numbers
		// 4^3 ways to choose the suits of the five numbers
		// C(52,5) possible ways to get a poker hand

		// BUG: The kickers should be accounted for.
		pokerHandInfo.handsBeaten = kOnePairBeats + 84480 * (pokerHandInfo.values[0] - 2) + 
			320 * (pokerHandInfo.values[1] - 2) * (pokerHandInfo.values[2] - 2) * 
				(pokerHandInfo.values[3] - 2);
		pokerHandInfo.handType = kOnePair;
		pokerHandInfo.percentile = pokerHandInfo.handsBeaten / kAllPokerHands;
		pokerHandInfo.frequency = kOnePairHands;
		pokerHandInfo.probability = kOnePairProbability;
		
		return pokerHandInfo;
	}

	static hasHighCard(hand) {
		let pokerHandInfo = { handsBeaten:0, handType:0, percentile:0, frequency:0, probability:0, values:[] };
		let sortedHand = Poker.sortHandByAltValue(hand);
		let card1,card2,card3,card4,card5;
		
		card1 = sortedHand[0];
		card2 = sortedHand[1];
		card3 = sortedHand[2];

		// Probability of a high card: (C(13,5) - 10) * (4^5 - 4) / C(52,5)
		// C(13,5) ways to choose 5 distinct numbers from 13
		// less 10 that are straights
		// 4^5 ways to choose their suits
		// less 4 that are four-of-a-kinds
		// C(52,5) possible ways to get a poker hand
		
		if (hand.length == 3) {

			// For 3 cards:
			// Probability of other high cards less than this hand:
			// C(result-2,3) ways to choose 3 distinct numbers from result-2
			// 4^3 ways to choose their suits
			// C(52,3) possible ways to get a triple

			pokerHandInfo.values[0] = card3.altvalue;
			pokerHandInfo.values[1] = card2.altvalue;
			pokerHandInfo.values[2] = card1.altvalue;
				
			pokerHandInfo.handsBeaten = 64 * (Poker.combination(pokerHandInfo.values[0]-2,3));
			pokerHandInfo.handType = kHighTriple;
			pokerHandInfo.percentile = pokerHandInfo.handsBeaten / kAllTriples;
			pokerHandInfo.frequency = kHighTriples;
			pokerHandInfo.probability = kHighTripleProbability;
		
			return pokerHandInfo;

		} else {

			card4 = sortedHand[3];
			card5 = sortedHand[4];

			// For 5 cards:
			// Probability of other high cards less than this hand:
			// C(result-2,5) ways to choose 5 distinct numbers from result-2
			// less (result-5) that are straights
			// 4^5 ways to choose their suits
			// less 4 that are four-of-a-kinds
			// C(52,5) possible ways to get a poker hand
				
			pokerHandInfo.values[0] = card5.altvalue;
			pokerHandInfo.values[1] = card4.altvalue;
			pokerHandInfo.values[2] = card3.altvalue;
			pokerHandInfo.values[3] = card2.altvalue;
			pokerHandInfo.values[4] = card1.altvalue;

			// BUG: Kickers should be accounted for
			pokerHandInfo.handsBeaten = 1020 * (Poker.combination(pokerHandInfo.values[0]-2,5) -
				(pokerHandInfo.values[0]-5));
			pokerHandInfo.handType = kHighCard;
			pokerHandInfo.percentile = pokerHandInfo.handsBeaten / kAllPokerHands;
			pokerHandInfo.frequency = kHighCardHands;
			pokerHandInfo.probability = kHighCardProbability;
		
			return pokerHandInfo;
		}
	}

	static getHandTypeString(handType) {
		switch (handType) {
			case kHighTriple:
			case kHighCard:
				return "High card";
						
			case kPairTriple:
			case kOnePair:
				return "One pair";
						
			case kTwoPair:
				return "Two pairs";
						
			case kThreeTriple:
			case kThreeOfAKind:
				return "Three-of-a-kind";
				
			case kFlushTriple:
			case kFlush:
				return "Flush";
						
			case kStraightTriple:
			case kStraight:
				return "Straight";
						
			case kFullHouse:
				return "Full house";
						
			case kFourOfAKind:
				return "Four-of-a-kind";
						
			case kStraightFlushTriple:
			case kStraightFlush:
				return "Straight flush";
				
			case kRoyalFlushTriple:
			case kRoyalFlush:
				return "Royal flush";
						
			default:
				return undefined;
		}
	}

	static getRoyaltyString(royalty) {
		switch (royalty) {
			case kThirteenUniqueCards:
				return "Thirteen unique cards.";
						
			case kThreeFlushes:
				return "Three flushes";
						
			case kThreeStraights:
				return "Three straights";
						
			case kSixPairs:
				return "Six pairs";
						
			default:
				return undefined;
		}
	}

	static getHandTypeRating(handType) {
		let s = kStarSymbol;
		
		switch (handType) {
			case kHighTriple:
			case kHighCard:
				return s.repeat(1);
						
			case kPairTriple:
			case kOnePair:
				return s.repeat(2);
						
			case kTwoPair:
				return s.repeat(3);
						
			case kThreeTriple:
			case kThreeOfAKind:
				return s.repeat(4);
						
			case kFlushTriple:
			case kStraight:
				return s.repeat(5);
						
			case kStraightTriple:
			case kFlush:
				return s.repeat(6);
						
			case kFullHouse:
				return s.repeat(7);
						
			case kFourOfAKind:
				return s.repeat(8);
						
			case kStraightFlushTriple:
			case kStraightFlush:
				return s.repeat(9);
						
			case kRoyalFlush:
				return s.repeat(10);
						
			default:
				return undefined;
		}
	}

	static tenHollowStars() {
		let star = kHollowStarSymbol;
		return star.repeat(10);
	}

	static getHandTypeOdds(handType) {
		switch (handType) {
			case kHighTriple:
				return kHighTripleOdds;
						
			case kHighCard:
				return kHighCardOdds;
						
			case kPairTriple:
				return kPairTripleOdds;
						
			case kOnePair:
				return kOnePairOdds;
						
			case kTwoPair:
				return kTwoPairOdds;
						
			case kThreeOfAKind:
				return kThreeOfAKindOdds;
						
			case kFlushTriple:
				return kFlushTripleOdds;
						
			case kStraight:
				return kStraightOdds;
						
			case kStraightTriple:
				return kStraightTripleOdds;
						
			case kFlush:
				return kFlushOdds;
						
			case kFullHouse:
				return kFullHouseOdds;
						
			case kThreeTriple:
				return kThreeOfAKindTripleOdds;
						
			case kFourOfAKind:
				return kFourOfAKindOdds;
						
			case kStraightFlushTriple:
				return kStraightFlushTripleOdds;
						
			case kStraightFlush:
				return kStraightFlushOdds;
						
			case kRoyalFlush:
				return kRoyalFlushOdds;
						
			case kRoyalFlushTriple:
				return kRoyalFlushTripleOdds;
						
			default:
				return undefined;
		}
	}

	static getHandTypeAppraisal(handType) {
		switch (pokerHandType) {
						
			// 3-hand poker
			case kHighTriple:
				return "poor";
				
			case kPairTriple:
				return "good";

			case kFlushTriple:
				return "good";
						
			case kStraightTriple:
				return "very good";

			case kThreeTriple:
				return "superb";

			case kStraightFlushTriple:
				return "excellent";
						
			case kRoyalFlushTriple:
				return "excellent";

			// 5-hand poker
			case kHighCard:
				return "horrible";

			case kOnePair:
				return "bad";

			case kTwoPair:
				return "poor";

			case kThreeOfAKind:
				return "below average";

			case kStraight:
				return "average";

			case kFlush:
				return "above average";

			case kFullHouse:
				return "good";

			case kFourOfAKind:
				return "very good";

			case kStraightFlush:
				return "superb";

			case kRoyalFlush:
				return "excellent";

			default:
				return nil;
		}
	}

	static getSubvalueAppraisal(values) {
		if (values[0] == 14) {
			return "excellent";
		} else if (values[0] > 10) {
			return "very good";
		} else if (values[0] > 7) {
			return "good";
		} else if (values[0] > 5) {
			return "not-so-bad";
		} else if (values[0] > 2) {
			return "bad";
		} else {
			return "worst";
		}
	}

	static getSubvalueString(handType,values) {
		switch (handType) {
			case kFlushTriple:
			case kHighTriple:
				return Poker.getCardValueString(values[0],false) + "-" +
					Poker.getCardValueString(values[1],false) + "-" +
					Poker.getCardValueString(values[2],false);

			case kHighCard:
			case kFlush:
				return Poker.getCardValueString(values[0],false) + "-" +
					Poker.getCardValueString(values[1],false) + "-" +
					Poker.getCardValueString(values[2],false) + "-" +
					Poker.getCardValueString(values[3],false) + "-" +
					Poker.getCardValueString(values[4],false);
						
			case kPairTriple:
				return "Pair " + Poker.getCardValueString(values[0]) + ", " + 
					"Kicker " + Poker.getCardValueString(values[1]);

			case kOnePair:
				return "Pair " + Poker.getCardValueString(values[0]) + ", " +
					Poker.getCardValueString(values[1],false) + "-" +
					Poker.getCardValueString(values[2],false) + "-" +
					Poker.getCardValueString(values[3],false);
						
			case kTwoPair:
				return "Pair " + Poker.getCardValueString(values[0]) + "-" +
					"Pair " + Poker.getCardValueString(values[1]);
						
			case kThreeTriple:
				return "Triple " + Poker.getCardValueString(values[0]);

			case kThreeOfAKind:
				return "Triple " + Poker.getCardValueString(values[0]) + ", " +
					Poker.getCardValueString(values[1],false) + "-" +
					Poker.getCardValueString(values[2],false);
						
			case kStraightTriple:
			case kStraight:
				return "High " + Poker.getCardValueString(values[0]);
						
			case kFullHouse:
				return "Triple " + Poker.getCardValueString(values[0]) + "-" +
					"Pair " + Poker.getCardValueString(values[1]);
						
			case kFourOfAKind:
				return "Quad " + Poker.getCardValueString(values[0]);

			case kStraightFlushTriple:
			case kStraightFlush:
				return "High " + Poker.getCardValueString(values[0]);
						
			case kRoyalFlushTriple:
			case kRoyalFlush:
				return "Best possible hand!";
						
			default:
				return undefined;
		}
	}

	static getCardValueString(value,longName = true) {
		if (1 < value && value < 11) {
			return value.toString();
		} else if (value == 1 || value == 14) {
			return longName ? "Ace" : "A";
		} else if (value == 11) {
			return longName ? "Jack" : "J";
		} else if (value == 12) {
			return longName ? "Queen" : "Q";
		} else if (value == 13) {
			return longName ? "King" : "K";
		} else {
			return "?";
		}
	}

	static getHandStarCount(hand) {
		let starCount = 0;
		for (let i = 0; i < 3; ++i) {
			let j = (i + 1) % 3;
			let index = ((j == 0) ? 0 : ((j == 1) ? 3 : 8));
			let range = ((j == 0) ? 3 : 5);
			let subHand = hand.slice(index,index+range);
			let handInfo = Poker.analyzeHand(subHand);
			let starRating = Poker.getHandTypeRating(handInfo.handType);
			starCount += starRating.length;
		}
		return starCount;
	}

	static matchHands(hand1,hand2) {
		if (hand1.handType > hand2.handType) {
			return kLeftHandWins;
		} else if (hand1.handType < hand2.handType) {
			return kRightHandWins;
		} else {
			for (let i = 0; i < 5; ++i) {
				if (hand1.values[i] > hand2.values[i]) {
					return kLeftHandWins;
				} else if (hand1.values[i] < hand2.values[i]) {
					return kRightHandWins;
				}
			}
			return kHandsAreEqual;
		}
	}

	static matchFrontMiddle(hand1,hand2) {
		if (hand1.handType == kHighTriple) {
				
			if (hand2.handType == kHighCard) {
				for (let i = 0; i < 5; ++i) {
					if (hand1.values[i] > hand2.values[i]) {
						return kLeftHandWins;
					} else if (hand1.values[i] < hand2.values[i]) {
						return kRightHandWins;
					}
				}
				console.log("Impossible case detected!");
				return kHandsAreEqual; /* Impossible to have two equal high cards! */
			} else {
				return kRightHandWins;
			}
				
		} else if (hand1.handType == kPairTriple) {
				
			if (hand2.handType == kOnePair) {

				if (hand1.values[0] > hand2.values[0]) {
					return kLeftHandWins;
				} else if (hand1.values[0] < hand2.values[0]) {
					return kRightHandWins;
				} else if (hand1.values[1] > hand2.values[1]) {
					return kLeftHandWins;
				} else if (hand1.values[1] < hand2.values[1]) {
					return kRightHandWins;
				} else {
					return kRightHandWins; /* The two hands can't really be equal. */
				}
						
			} else if (hand2.handType < kOnePair) {
				return kLeftHandWins;
			} else {
				return kRightHandWins;
			}
				
		} else if (hand1.handType == kThreeTriple) {

			if (hand2.handType == kThreeOfAKind) {

				if (hand1.values[0] > hand2.values[0]) {
					return kLeftHandWins;
				} else if (hand1.values[0] < hand2.values[0]) {
					return kRightHandWins;
				} else {
					console.log("Impossible case detected!");
					return kHandsAreEqual; /* Impossible to hand two equal triples! */
				}
						
			} else if (hand2.handType < kThreeOfAKind) {
				return kLeftHandWins;
			} else {
				return kRightHandWins;
			}
		
		} else {
			console.log("Impossible case detected!");
			return kHandsAreEqual; /* Impossible. No other possible hand type. */
		}
	}

	static analyzeHand(hand) {
		let handInfo;
	
		handInfo = Poker.hasRoyalFlush(hand);
		if (handInfo.handType == kRoyalFlush || handInfo.handType == kRoyalFlushTriple) {
			return handInfo;
		}
				
		handInfo = Poker.hasStraightFlush(hand);
		if (handInfo.handType == kStraightFlush || handInfo.handType == kStraightFlushTriple) {
			return handInfo;
		}

		handInfo = Poker.hasFourOfAKind(hand);
		if (handInfo.handType == kFourOfAKind) {
			return handInfo;
		}
				
		handInfo = Poker.hasFullHouse(hand);
		if (handInfo.handType == kFullHouse) {
			return handInfo;
		}
				
		handInfo = Poker.hasFlush(hand);
		if (handInfo.handType == kFlush || handInfo.handType == kFlushTriple) {
			return handInfo;
		}
				
		handInfo = Poker.hasRoyalStraight(hand);
		if (handInfo.handType == kStraight || handInfo.handType == kStraightTriple) {
			return handInfo;
		}
		
		handInfo = Poker.hasStraight(hand);
		if (handInfo.handType == kStraight || handInfo.handType == kStraightTriple) {
			return handInfo;
		}
				
		handInfo = Poker.hasThreeOfAKind(hand);
		if (handInfo.handType == kThreeOfAKind || handInfo.handType == kThreeTriple) {
			return handInfo;
		}
				
		handInfo = Poker.hasTwoPair(hand);
		if (handInfo.handType == kTwoPair) {
			return handInfo;
		}
				
		handInfo = Poker.hasOnePair(hand);
		if (handInfo.handType == kOnePair || handInfo.handType == kPairTriple) {
			return handInfo;
		}
				
		handInfo = Poker.hasHighCard(hand);
		if (handInfo.handType == kHighCard || handInfo.handType == kHighTriple) {
			return handInfo;
		}
				
		return handInfo;
	}

	static analyzeHandRow(hand,row) {
		let handInfo = undefined;
		if (hand.length < 13) {
			return handInfo;
		}
		switch (index) {
			case 0:
				handInfo = Poker.analyzeHand(hand.slice(0,3));
				break;
						
			case 1:
				handInfo = Poker.analyzeHand(hand.slice(3,8));
				break;

			case 2:
			default:
				handInfo = Poker.analyzeHand(hand.slice(8,13));
				break;
		}
		return handInfo;
	}
}

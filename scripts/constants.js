// GAME-RELATED CONSTANTS
const kMaxSpecialLevels           = 8; /* Best Middle */
const kMaxRegularLevels           = 8;
const kMaxGameLevels              = (kMaxSpecialLevels + kMaxRegularLevels);
const kBestMiddleLevelIndex       = (kMaxRegularLevels + 1);
const kMaxOpenGamesPerLevel       = 8;
const kMaxOpenGamesPerQuery       = (kMaxOpenGamesPerLevel * kMaxGameLevels);
const kInitialOpenGames           = 8;
const kRetryFillPokerGames        = 8000; /* milliseconds */
const kLevelGoal                  = 8;
const kMaxPokerGameAge            = 115200.0; /* seconds = 32 hours */
const kGameOpenWindow             = (7.0 * 60.0 * 60.0 * 24.0); /* 7 days */
const kGamesReorderLevel          = 1;
const kGamesUpdateLevel           = 4;
const kFoldedUpdateCredits        = 4;
const kFrequentPlayerInterval     = (8.0 * 3600.0); /* 8 hours */
const kMinimumGameNoInCloud       = 8888;
const kDefaultGoldCoinsInProd1    = 30;
const kDefaultGoldCoinsInProd2    = 65;
const kDefaultGoldCoinsInProd3    = 100;
const kDefaultGoldCoinsInProd4    = 300;
const kDefaultGoldCoinsInProd5    = 1000;

const GameMode = {
    Play : 0,
    Replay : 1,
    Resume : 2,
    Watch : 3,
    Award : 4
}

const GameState = {
	Playing : 1,
	AboutToWatch : 1,
	Watching : 2,
	Watched : 3,
	Matching : 4,
	Matched : 5,
	Awarding : 6,
	Awarded : 7
}

// GUI-RELATED CONSTANTS
const kShowAdvisoryFrequency      = 8; /* seconds */
const kHandPopFrequency           = 8;
const kExtraSlotsPerRow           = 2;
const kUnitAngle                  = Math.PI/18.0;
const kNarrowUnitAngle            = Math.PI/27.0;
const kFlareFactor                = 1.2;
const kCardZPositionBase          = 100.0;
const kCardZPositionOpponent      = 150.0;
const kSlotZPositionBase          = 200.0;
const kFloatingCardZPosition      = ((kCardZPositionBase+kSlotZPositionBase)/2.0);
const kCardShadowZPosition        = (kFloatingCardZPosition-1.0);
const kTopMostZPosition           = 300.0;
const kEinsteinZPosition          = 400.0;
const kHandInfosZPosition         = 450.0;
const kSimpleBubbleZPosition      = 475.0;
const kBubbleZPosition            = 500.0;
const kTornPageZPosition          = 600.0;
const kPatternsZPosition          = 700.0;
const kBusyViewZPosition          = 800.0;
const kBonusDisplayDelay          = 4.0;
const kStarSymbol                 = '\u2605';
const kHollowStarSymbol           = '\u2606';
const kFlagSymbol                 = '\u2691';
const kCircleSymbol				  = '\u25CF';
const kHollowCircleSymbol		  = '\u25CB';
const kBarHeight				  = 3;

// APP STORE-RELATED CONSTANTS
const kAppName                    = "Poker Einstein";
const kShortAppName               = "Poker Einstein";
const kAppID                      = "558284653";
const kInApp_Prod1_GoldCoinsID    = "com.jappzone.two_pokers_buy_30_gold_coins";    /* $1 */
const kInApp_Prod2_GoldCoinsID    = "com.jappzone.two_pokers_buy_65_gold_coins";    /* $2 */
const kInApp_Prod3_GoldCoinsID    = "com.jappzone.two_pokers_buy_100_gold_coins";   /* $3 */
const kInApp_Prod4_GoldCoinsID    = "com.jappzone.two_pokers_buy_300_gold_coins";   /* $5 */
const kInApp_Prod5_GoldCoinsID    = "com.jappzone.two_pokers_buy_1000_gold_coins";  /* $10 */
const kLeaderboardLevel           = "com.jappzone.two_pokers_leaderboard_";
const kBestMiddleLevelTitle       = "Best Middle";
const kConfigFile                 = "Two Pokers-Config";

// SOCIAL MEDIA-RELATED CONSTANTS
const kTweeterInitialText         = "I'm now at level %  in Poker Einstein card game!";
const kFacebookAppID              = "393151884096499";
const kFacebookName               = "I'm playing the Poker Einstein!";
const kFacebookCaption            = "I'm now at level %  in Poker Einstein card game!";
const kFacebookDescription        = "Poker Einstein a.k.a. Pusoy or Chinese Pokers";
const kFacebookLink               = "http://www.jappzone.com/";
const kFacebookPicture            = "http://www.jappzone.com/img/upload/two_pokers.png";
const kMyFacebookID               = "1590390869";
//const kTestAccounts               = [NSArray arrayWithObjects: "1590390869", "100003811533204",nil]
//const kiAdSupportedCountries      = [NSArray arrayWithObjects: "ES", "US", "UK", "CA", "FR", "DE", "IT", "JP", "MX", "NZ", "AU",nil]

//const kAdMobPublisherID           = (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPhone ?  "a151b66816014ff" :  "a151b66734d1370")

const kDefaultAvatar              = "anonymous.png";
const kEmptyString                = "";
const kUnknownWinner              = "???";
const kVersionNo				  = "1.0";

// DATABASE-RELATED CONSTANTS
const kPlayerIDKey                = "PlayerID";
const kGameCenterNameKey          = "GameCenterName";
const kEmailKey                   = "Email";
const kDisplayNameKey             = "DisplayName";
const kFacebookNameKey            = "FacebookName";
const kFacebookIDKey              = "FacebookID";
const kCountryKey                 = "Country";
const kImageKey                   = "Image";
const kAvatarKey                  = "Avatar";
const kGamesWonKey                = "GamesWon";
const kGamesPlayedKey             = "GamesPlayed";
const kGamesOpenedKey             = "GamesOpened";
const kGoldCoinsKey               = "GoldCoins";
const kLastUsedKey                = "LastUsed";
const kSpecialGamesKey            = "SpecialGames";
const kGenderKey                  = "Gender";
const kBirthdayKey                = "Birthday";

const kIndexNoKey                 = "IndexNo";
const kGameHandKey                = "GameHand";
const kGameNoKey                  = "GameNo";
const kGameLevelKey               = "GameLevel";
const kInviterKey                 = "Inviter";
const kColorSchemeKey             = "ColorScheme";
const kBestHandKey                = "BestHand";
const kBestRoyaltyKey             = "BestRoyalty";
const kPlayerGameDataKey          = "PlayerGameData";
const kAwardDateKey               = "AwardDate";
const kWinnerKey                  = "Winner";

const kHasWinnerKey               = "HasWinner";
const kParentObjectKey            = "ParentObject";
const kPlayerCountKey             = "PlayerCount";
const kObjectIDKey                = "objectId";
const kCreatedAtKey               = "createdAt";

const kOccupiedKey                = "Occupied";
const kStateKey                   = "State";
const kPlayerLevelKey             = "PlayerLevel";
const kHandNoKey                  = "HandNo";
const kArrangedCardsKey           = "ArrangedCards";
const kScoreKey                   = "Score";
const kWatchedKey                 = "Watched";
const kGoldExchangedKey           = "GoldExchanged";
const kSubmissionDateKey          = "SubmissionDate";
const kMessageKey                 = "Message";
const kBetKey                     = "Bet";
const kFoldedKey                  = "Folded";
const kStarCountKey               = "StarCount";
const kValidHandKey               = "ValidHand";
const kVersionKey                 = "Version";

# Pusoy / Chinese Poker Web Application

A web-based implementation of Pusoy Dos (also known as Chinese Poker), a popular card game where players arrange 13 cards into three poker hands and compete against opponents.

## Overview

This web application allows players to:
- Play Pusoy Dos/Chinese Poker online
- Compete against other players
- Track game statistics and progress
- Earn virtual gold coins
- Progress through multiple game levels

The game is built using HTML5, JavaScript, and the PixiJS rendering engine, with Back4App (Parse) as the backend service for user management, game state persistence, and multiplayer functionality.

## Features

- **Multiple Game Modes**:
  - Play: Start a new game
  - Replay: Review past games
  - Resume: Continue saved games
  - Watch: Observe other players' games
  - Award: Receive rewards for winning

- **Progressive Difficulty Levels**:
  - 8 Regular levels
  - 8 Special "Best Middle" levels
  - Increasing challenges as you advance

- **Social Features**:
  - Player profiles with avatars
  - Leaderboards
  - Social media sharing

- **Virtual Economy**:
  - Earn gold coins through gameplay
  - Use coins to enter higher-stake games

- **Responsive Design**:
  - Works on various screen sizes
  - Optimized card layout and controls

## Technical Architecture

### Frontend
- **HTML5/CSS3**: Core structure and styling
- **JavaScript**: Game logic and user interface
- **PixiJS**: Card rendering and animations

### Backend
- **Back4App/Parse**: Cloud database and authentication
- **REST API**: Communication between client and server

### Key Components
- **Card System**: Complete poker card implementation
- **Hand Evaluation**: Poker hand ranking and comparison
- **Animation Engine**: Smooth card movements and effects
- **Theme System**: Visual customization options

## Project Structure


/html
├── css/                  # Stylesheets
├── images/               # Game assets and graphics
├── pixi/                 # PixiJS library
├── scripts/              # JavaScript files
│   ├── animate.js        # Animation system
│   ├── card.js           # Card implementation
│   ├── constants.js      # Game constants
│   ├── deck.js           # Card deck management
│   ├── gamedata.js       # Game state handling
│   ├── gamesdb.js        # Database interactions
│   ├── gamesview.js      # Game listing UI
│   ├── main.js           # Application entry point
│   ├── player.js         # Player management
│   ├── poker.js          # Poker rules and logic
│   ├── pokercloud.js     # Cloud synchronization
│   └── ...               # Additional game components
└── index.html            # Main application page

## Game Rules

Pusoy Dos (Chinese Poker) is played with the following rules:

1. Each player receives 13 cards
2. Players arrange their cards into three poker hands:
   - Front hand: 3 cards
   - Middle hand: 5 cards
   - Back hand: 5 cards
3. Hands must be arranged in ascending strength (front ≤ middle ≤ back)
4. Players compare corresponding hands against opponents
5. Points are awarded based on winning individual hands
6. Special bonuses for exceptional hands (e.g., straight flush)

## Development

This project uses Parse/Back4App for backend services. The application is configured with:

javascript
Parse.initialize("**************************", "*******************************");
Parse.serverURL = 'https://parseapi.back4app.com/';

## Installation

1. Clone the repository
2. Set up a Back4App account and create the necessary Parse classes
3. Update the Parse initialization keys in index.html if needed
4. Deploy to a web server

## Credits

- **Developer**: Jose Antonio Lacsam
- **Game Design**: Based on traditional Pusoy Dos / Chinese Poker rules
- **Libraries**: 
  - PixiJS for rendering
  - Parse JavaScript SDK for backend services
  - SeedRandom for deterministic randomization

## License

MIT License

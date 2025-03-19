# Designing a Tic Tac Toe

🔍 Problem Breakdown

Tic Tac Toe is a turn-based, two-player game played on a 3x3 grid. The objective is to get three marks in a row, column, or diagonal. If all spaces are filled and no one wins, the game is a draw.

🛠️ System Design Approach
🔑 Key Components

We need the following three main components:

    Board 🏗️
        Stores the current game state.
        Checks win conditions after every move.
        Allows players to make moves.

    Player 🎭
        Represents each player.
        Holds name and symbol ('X' or 'O').

    Game 🎮
        Controls the flow of the game.
        Manages turns and game status.
        Uses Board and Player to facilitate gameplay.

📌 Class Relationships

    Game owns a Board and two Players.
    Board holds the grid and provides methods for marking cells.
    Players take turns interacting with the Board via the Game.

📦 Design Patterns Used

    Singleton Pattern (For Game instance) – Ensures one game instance at a time.
    Observer Pattern (For UI updates, if needed later).
    Factory Pattern (For Player creation, if extended).

📌 Class Design
1️⃣ Board Class (Stores Grid & Checks Game Status)

    Stores a NxN matrix.
    Provides makeMove() for marking cells.
    Checks for win/draw conditions.

2️⃣ Player Class (Represents Players)

    Holds name and symbol ('X' or 'O').

3️⃣ Game Class (Manages the Game)

    Initializes players and board.
    Controls turn-taking.
    Declares winner/draw.

🚀 Low-Level Design (LLD) of Snake and Ladder Game

🎯 Step 1: Understanding the Requirements
✅ Functional Requirements

    The game is played by N players on an M x M board (default 10x10).
    Players roll a dice (1-6) and move accordingly.
    If a player lands on the head of a snake, they move down to the tail.
    If a player lands at the base of a ladder, they move up to the top.
    The first player to reach exactly the last cell (100) wins.
    If moving forward exceeds 100, the player stays in place.

⚡ Non-Functional Requirements

    The game should be scalable to different board sizes.
    It should support multiple players dynamically.
    The design should be extensible, allowing extra rules (e.g., power-ups).
    The system should be optimized for minimal computations per move.

🔥 Step 2: Design Approach (Object-Oriented)
🏗 Key Classes & Relationships
Class Responsibility Design Pattern Used
Game Manages players, board, and game flow Singleton
Board Represents the grid with cells, snakes, and ladders Factory Pattern
Cell Holds position, snake, or ladder reference Composition
Player Represents a player with a name and position Encapsulation
Dice Rolls a number between 1-6 Factory Pattern
Snake Moves a player down if landed Strategy Pattern
Ladder Moves a player up if landed Strategy Pattern

🧩 Step 3: Design Patterns & Optimizations

    Factory Pattern → Used to create Board, Dice, and Cells dynamically.
    Strategy Pattern → Used for different types of moves (Snake, Ladder).
    Singleton Pattern → Game class ensures only one game instance.
    Observer Pattern → Can be added for notifications (e.g., Game Over event).
    Lazy Initialization → The board initializes only when the game starts.

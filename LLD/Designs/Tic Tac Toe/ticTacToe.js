class Player {
  constructor(name, symbol) {
    this.name = name;
    this.symbol = symbol;
  }
}

class Board {
  constructor(size = 3) {
    this.size = size;
    this.grid = Array.from({ length: size }, () => Array(size).fill(null));

    // O(1) win check
    this.rowCounts = { X: Array(size).fill(0), O: Array(size).fill(0) };
    this.colCount = { X: Array(size).fill(0), O: Array(size).fill(0) };
    this.diagCount = { X: 0, O: 0 };
    this.antiDiagCount = { X: 0, O: 0 };
  }

  display() {
    this.grid.forEach((row) => {
      console.log(row.map((cell) => cell || "-").join(" | "));
      console.log("\n");
    });
  }

  makeMove(row, col, symbol) {
    if (this.grid[row][col] !== null) throw new Error("Cell occupied!");
    this.grid[row][col] = symbol;

    this.rowCounts[symbol][row]++;
    this.colCount[symbol][col]++;
    if (row === col) this.diagCount[symbol]++;
    if (row + col === this.size - 1) this.antiDiagCount[symbol]++;

    this.checkWinInLinearTime(row, col, symbol);
  }

  checkWinInLinearTime(row, col, symbol) {
    return (
      this.rowCounts[symbol][row] === this.size ||
      this.colCount[symbol][col] === this.size ||
      this.diagCount[symbol] === this.size ||
      this.antiDiagCount[symbol] === this.size
    );
  }

  checkWin(row, col, symbol) {
    const winRow = this.grid[row].every((cell) => cell === symbol);
    const winCol = this.grid.every((row) => row[col] === symbol);
    const winDiag1 = this.grid.every((_, i) => this.grid[i][i] === symbol);
    const windDiag2 = this.grid.every(
      (_, i) => this.grid[i][this.size - 1 - i] === symbol
    );

    return winRow || winCol || winDiag1 || windDiag2;
  }

  isFull() {
    return this.grid.flat().every((cell) => cell !== null);
  }
}

class Game {
  constructor(player1, player2, boardSize = 3) {
    this.board = new Board(boardSize);
    this.players = [new Player(player1, "X"), new Player(player2, "O")];
    this.currentPlayer = this.players[0];
  }

  start() {
    console.log("Start!");
    this.board.display();
  }

  playTurn(row, col) {
    try {
      const isWin = this.board.makeMove(row, col, this.currentPlayer.symbol);
      this.board.display();

      if (isWin)
        return console.log(
          `${this.currentPlayer.name} (${this.currentPlayer.symbol}) wins!`
        );

      if (this.board.isFull()) return console.log("It's a draw!");

      this.switchTurn();
    } catch (error) {
      console.error(error.message);
    }
  }

  switchTurn() {
    this.currentPlayer =
      this.currentPlayer === this.players[0]
        ? this.players[1]
        : this.players[0];

    console.log(
      `Next turn: ${this.currentPlayer.name} (${this.currentPlayer.symbol})`
    );
  }
}

const game = new Game("Alice", "Bob");
game.start();
game.playTurn(0, 0);
game.playTurn(1, 1);
game.playTurn(0, 1);
game.playTurn(2, 2);
game.playTurn(0, 2);

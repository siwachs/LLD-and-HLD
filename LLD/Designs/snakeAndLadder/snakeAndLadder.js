class Dice {
  roll() {
    return Math.floor(Math.random() * 6) + 1;
  }
}

// 📍 Cell class (composition of Snake/Ladder)
class Cell {
  constructor(position) {
    this.position = position;
    this.jump = null;
  }
}

// 🐍 Snake and 🪜 Ladder Strategy
class MoveStrategy {
  execute(position) {
    return position;
  }
}

class Snake extends MoveStrategy {
  constructor(start, end) {
    super();

    this.start = start;
    this.end = end;
  }

  execute(position) {
    return position === this.start ? this.end : position;
  }
}

class Ladder extends MoveStrategy {
  constructor(start, end) {
    super();

    this.start = start;
    this.end = end;
  }

  execute(position) {
    return position === this.start ? this.end : position;
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.position = 0;
  }

  move(steps, board) {
    const newPos = this.position + steps;
    if (newPos > board.size) return;

    this.position = board.cells[newPos].jump
      ? board.cells[newPos].jump.execute(newPos)
      : newPos;
  }
}

// 🏁 Board Factory
class Board {
  constructor(size = 100) {
    this.size = size;
    this.cells = Array.from({ length: size + 1 }, (_, i) => new Cell(i));
  }

  addEntity(entity) {
    this.cells[entity.start].jump = entity;
  }
}

// 🎯 Game Singleton
class Game {
  constructor(players) {
    if (!Game.instanse) {
      this.players = players.map((name) => new Player(name));
      this.board = new Board();
      this.dice = new Dice();

      Game.instanse = this;
    }

    return Game.instanse;
  }

  addSnake(start, end) {
    this.board.addEntity(new Snake(start, end));
  }

  addLadder(start, end) {
    this.board.addEntity(new Ladder(start, end));
  }

  start() {
    let winner = null;

    while (!winner) {
      for (const player of this.players) {
        const roll = this.dice.roll();

        player.move(roll, this.board);
        console.log(
          `${player.name} rolled ${roll}, moved to ${player.position}`
        );

        if (player.position === this.board.size) {
          winner = player;
          break;
        }
      }
    }

    console.log(`🏆 Winner: ${winner.name}!`);
  }
}

const game = new Game(["Alice", "Bob"]);
game.addSnake(99, 78);
game.addLadder(2, 22);
game.start();

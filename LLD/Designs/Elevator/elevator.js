class Request {
  constructor(sourceFloor, destinationFloor, direction) {
    if (destinationFloor === null)
      throw new Error("Destination floor must be provided.");

    this.sourceFloor = sourceFloor;
    this.destinationFloor = destinationFloor;
    this.direction = direction;
  }
}

class Door {
  open() {
    console.log("Door is opening...");
  }

  close() {
    console.log("Door is closing...");
  }
}

class WeightSensor {
  constructor() {
    this.maxWeight = 800; // In KG
    this.currentWeight = 0;
  }

  isOverloaded() {
    return this.currentWeight > this.maxWeight;
  }
}

class Elevator {
  constructor(id, numOfFloors) {
    this.id = id;
    this.currentFloor = 0;
    this.direction = "idle";
    this.requestQueue = [];
    this.isProcessing = false;
    this.door = new Door();
    this.weightSensor = new WeightSensor();
  }

  getDistance(targetFloor) {
    return Math.abs(this.currentFloor - targetFloor);
  }

  addRequest(request) {
    if (this.weightSensor.isOverloaded()) {
      return console.log(
        `Elevator ${this.id} is overloaded. Cannot accept new requests.`
      );
    }

    this.requestQueue.push(request);

    if (!this.isProcessing) this.processNextRequest();
  }

  processNextRequest() {
    if (this.requestQueue.length === 0) {
      this.isProcessing = false;
      this.direction = "idle";
      return;
    }

    this.isProcessing = true;
    const currentRequest = this.requestQueue.shift();

    if (this.currentFloor !== currentRequest.sourceFloor) {
      console.log(
        `Elevator ${this.id} moving from ${this.currentFloor} to pickup at floor ${currentRequest.sourceFloor}`
      );
      this.currentFloor = currentRequest.sourceFloor;
    } else {
      console.log(
        `Elevator ${this.id} is already at pickup floor ${currentRequest.sourceFloor}`
      );
    }

    this.direction =
      currentRequest.sourceFloor < currentRequest.destinationFloor
        ? "up"
        : "down";

    this.door.open();
    setTimeout(() => {
      this.door.close();

      console.log(
        `Elevator ${this.id} moving from ${this.currentFloor} to destination floor ${currentRequest.destinationFloor}`
      );
      this.currentFloor = currentRequest.destinationFloor;

      this.door.open();

      setTimeout(() => {
        this.door.close();

        console.log(
          `Elevator ${this.id} completed request from ${currentRequest.sourceFloor} to ${currentRequest.destinationFloor}`
        );

        this.processNextRequest();
      }, 3000);
    }, 3000);
  }
}

class ElevatorController {
  constructor(elevators) {
    this.elevators = elevators;
  }

  getBestElevator(sourceFloor, direction) {
    const eligibleElevators = this.elevators.filter(
      (elevator) =>
        elevator.direction === "idle" || elevator.direction === direction
    );
    if (eligibleElevators.length === 0) return null;

    eligibleElevators.sort(
      (a, b) => a.getDistance(sourceFloor) - b.getDistance(sourceFloor)
    );
    return eligibleElevators[0];
  }
}

class ElevatorSystem {
  constructor(numElevators, numFloors) {
    this.elevators = Array.from(
      { length: numElevators },
      (_, id) => new Elevator(id, numFloors)
    );

    this.controller = new ElevatorController(this.elevators);
  }

  requestElevator(sourceFloor, direction, destinationFloor) {
    try {
      const request = new Request(sourceFloor, destinationFloor, direction);
      const bestElevator = this.controller.getBestElevator(
        sourceFloor,
        direction
      );

      if (bestElevator) {
        console.log(
          `Elevator ${bestElevator.id} assigned for request from floor ${sourceFloor} to floor ${destinationFloor}`
        );
        bestElevator.addRequest(request);
      } else {
        console.log("No available elevators at the moment.");
      }
    } catch (error) {
      console.error("Error processing request:", error.message);
    }
  }
}

const elevatorSystem = new ElevatorSystem(3, 10);

// User requests: pickup at floor 2 going up to floor 7.
elevatorSystem.requestElevator(2, "up", 7);

// Another request: pickup at floor 5 going down to floor 1.
elevatorSystem.requestElevator(5, "down", 1);

// After 5 seconds, a new request: pickup at floor 3 going up to floor 8.
setTimeout(() => {
  elevatorSystem.requestElevator(3, "up", 8);
}, 5000);

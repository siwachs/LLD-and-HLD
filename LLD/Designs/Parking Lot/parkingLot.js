class Vehicle {
  constructor(licencePlate, type) {
    this.licencePlate = licencePlate;
    this.type = type;
  }
}

class ParkingSpot {
  constructor(id, type) {
    this.id = id;
    this.type = type;
    this.isOccupied = false;
  }

  assignVehicle() {
    if (this.isOccupied) throw new Error("Parking spot is occupied");

    this.isOccupied = true;
  }

  removeVehicle() {
    this.isOccupied = false;
  }
}

class ParkingFloor {
  constructor(level) {
    this.level = level;
    this.spots = { bike: [], car: [], truck: [] };
  }

  addSpot(spot) {
    this.spots[spot.type].push(spot);
  }

  findAvailableSpot(vehicleType) {
    return this.spots[vehicleType].find((spot) => !spot.isOccupied);
  }
}

class ParkingLot {
  constructor() {
    this.floors = [];
    this.tickets = new Map();
  }

  addFloor(floor) {
    this.floors.push(floor);
  }

  findParkingSpot(vehicle) {
    for (const floor of this.floors) {
      const spot = floor.findAvailableSpot(vehicle.type);
      if (spot) return { floor, spot };
    }

    return null;
  }

  parkVehicle(vehicle) {
    const parkingSpot = this.findParkingSpot(vehicle);
    if (!parkingSpot) {
      console.log("No available parking spot!");
      return null;
    }

    const { spot } = parkingSpot;
    spot.assignVehicle();

    const ticket = new Ticket(vehicle, spot, new Date());
    this.tickets.set(ticket.id, ticket);

    return ticket;
  }

  unparkVehicle(ticketId) {
    const ticket = this.tickets.get(ticketId);

    if (!ticket) {
      console.log("Invalid Ticket!");
      return null;
    }

    ticket.spot.removeVehicle();
    ticket.setExitTime(new Date());
    this.tickets.delete(ticketId);
    return ticket;
  }
}

class Ticket {
  constructor(vehicle, spot, entryTime) {
    this.id = `${vehicle.licencePlate}-${Date.now()}`;
    this.vehicle = vehicle;
    this.spot = spot;
    this.entryTime = entryTime;
    this.exitTime = null;
  }

  setExitTime(exitTime) {
    this.exitTime = exitTime;
  }

  calculateDuration() {
    return (this.exitTime - this.entryTime) / (1000 * 60 * 60);
  }
}

class PaymentProcessor {
  constructor(ratePerHour) {
    this.ratePerHour = ratePerHour;
  }

  calculateFee(ticket) {
    const duration = ticket.calculateDuration();

    return Math.ceil(duration) * this.ratePerHour;
  }

  processPayment(ticket, paymentMethod) {
    const fee = this.calculateFee(ticket);

    console.log(
      `Processing ${paymentMethod} payment of $${fee} for ticket ${ticket.id}`
    );
    return true;
  }
}

class EntryGate {
  constructor(id, parkingLot) {
    this.id = id;
    this.parkingLot = parkingLot;
  }

  generateTicket(vehicle) {
    return this.parkingLot.parkVehicle(vehicle);
  }
}

class ExitGate {
  constructor(id, parkingLot) {
    this.id = id;
    this.parkingLot = parkingLot;
  }

  processExit(ticketId, paymentMethod) {
    const ticket = this.parkingLot.unparkVehicle(ticketId);

    if (ticket) {
      const paymentProcessor = new PaymentProcessor(10);
      paymentProcessor.processPayment(ticket, paymentMethod);
    }
  }
}

const parkingLot = new ParkingLot();

// Create and add floors
const floor1 = new ParkingFloor(1);
floor1.addSpot(new ParkingSpot(1, "car"));
floor1.addSpot(new ParkingSpot(2, "bike"));
parkingLot.addFloor(floor1);

// Create gates
const entryGate = new EntryGate(1, parkingLot);
const exitGate = new ExitGate(1, parkingLot);

// Vehicle enters
const vehicle = new Vehicle("ABC123", "car");
const ticket = entryGate.generateTicket(vehicle);
console.log(`Vehicle parked with ticket ID: ${ticket.id}`);

// Vehicle exits
exitGate.processExit(ticket.id, "credit card");

class Customer {
  constructor(id, name, email, phone) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
}

class Car {
  constructor(id, model, brand, type, location) {
    this.id = id;
    this.model = model;
    this.brand = brand;
    this.type = type; // "Sedan", "SUV", "Hatchback", "Luxury", etc.
    this.location = location;
    this.status = "available"; // available, booked, maintenance
  }
}

class CarFactory {
  static createCar(id, model, brand, type, location) {
    return new Car(id, model, brand, type, location);
  }
}

class Booking {
  constructor(id, customer, car, pickupTime, dropOffTime) {
    this.id = id;
    this.customer = customer;
    this.car = car;
    this.pickupTime = pickupTime;
    this.dropOffTime = dropOffTime;
    this.status = "pending"; // pending, confirmed, cancelled, completed
  }
}

class Payment {
  constructor(id, booking, amount) {
    this.id = id;
    this.booking = booking;
    this.amount = amount;
    this.status = "pending"; // pending, completed, failed
  }

  processPayment(method) {
    console.log(
      `Processing payment of $${this.amount} via ${method} for booking ${this.booking.id}`
    );

    this.status = "completed";
    return true;
  }
}

class PricingStrategy {
  calculatePrice(car, pickupTime, dropOffTime) {
    throw new Error("calculatePrice() must be implemented.");
  }
}

class StandardPricingStrategy extends PricingStrategy {
  calculatePrice(car, pickupTime, dropOffTime) {
    const durationHours =
      (new Date(dropOffTime) - new Date(pickupTime)) / (1000 * 60 * 60);
    let baseRate = 10;

    if (car.type === "SUV") baseRate = 15;
    if (car.type === "Luxury") baseRate = 25;
    return Math.ceil(durationHours) * baseRate;
  }
}

class SeasonalPricingStrategy extends PricingStrategy {
  calculatePrice(car, pickupTime, dropOffTime) {
    const standardStrategy = new StandardPricingStrategy();
    const standardPrice = standardStrategy.calculatePrice(
      car,
      pickupTime,
      dropOffTime
    );

    return Math.ceil(standardPrice * 1.2);
  }
}

class PricingEngine {
  constructor(pricingStrategy = new StandardPricingStrategy()) {
    this.pricingStrategy = pricingStrategy;
  }

  setStrategy(pricingStrategy) {
    this.pricingStrategy = pricingStrategy;
  }

  calculatePrice(car, pickupTime, dropOffTime) {
    return this.pricingStrategy.calculatePrice(car, pickupTime, dropOffTime);
  }
}

class InventoryManager {
  constructor() {
    if (InventoryManager.instanse) return InventoryManager.instanse;

    this.cars = [];
    InventoryManager.instanse = this;
  }

  addCar(car) {
    this.cars.push(car);
  }

  searchAvailableCars(location, type = null) {
    return this.cars.filter(
      (car) =>
        car.status === "available" &&
        car.location === location &&
        (type ? car.type === type : true)
    );
  }

  updateCarStatus(id, status) {
    const car = this.cars.find((car) => car.id === id);

    if (car) {
      car.status = status;
    }
  }
}

class NotificationService {
  constructor() {
    this.subscribers = [];
  }

  subscribe(observer) {
    this.subscribers.push(observer);
  }

  unsubscribe(observer) {
    this.subscribe = this.subscribers.filter(
      (subscriber) => subscriber !== observer
    );
  }

  notify(message) {
    this.subscribers.forEach((observer) => observer.update(message));
  }
}

class CustomerNotification {
  constructor(customer) {
    this.customer = customer;
  }

  update(message) {
    console.log(`Notification for ${this.customer.name}: ${message}`);
  }
}

// Facade Pattern
class RentACar {
  constructor() {
    this.inventoryManager = new InventoryManager();
    this.pricingEngine = new PricingEngine();
    this.notificationService = new NotificationService();

    this.bookings = [];
    this.lastBookingId = 0;
    this.lastPaymentId = 0;
  }

  searchCars(location, type = null) {
    return this.inventoryManager.searchAvailableCars(location, type);
  }

  bookCar(customer, carId, pickupTime, dropOffTime) {
    const car = this.inventoryManager.cars.find(
      (car) => car.id === carId && car.status === "available"
    );
    if (!car) {
      console.log("Car not available.");
      return null;
    }

    this.inventoryManager.updateCarStatus(carId, "booked");

    const booking = new Booking(
      ++this.lastBookingId,
      customer,
      car,
      pickupTime,
      dropOffTime
    );
    booking.status = "confirmed";
    this.bookings.push(booking);
    console.log(`Booking confirmed. Booking ID: ${booking.id}`);

    const customerNotifier = new CustomerNotification(customer);
    this.notificationService.subscribe(customerNotifier);
    this.notificationService.notify(
      `Your booking ${booking.id} is confirmed for car ${car.id}.`
    );

    return booking;
  }

  processBookingPayment(booking, paymentMethod) {
    const amount = this.pricingEngine.calculatePrice(
      booking.car,
      booking.pickupTime,
      booking.dropOffTime
    );

    const payment = new Payment(++this.lastPaymentId, booking, amount);
    payment.processPayment(paymentMethod);
    return payment;
  }

  completeBooking(bookingId) {
    const booking = this.bookings.find((b) => b.bookingId === bookingId);

    if (booking) {
      booking.status = "completed";
      this.inventoryManager.updateCarStatus(booking.car.id, "available");
      console.log(`Booking ${bookingId} completed.`);

      this.notificationService.notify(
        `Your booking ${bookingId} is now completed. Thank you!`
      );
    }
  }
}

const rentACar = new RentACar();

const inventoryManager = new InventoryManager();
inventoryManager.addCar(
  CarFactory.createCar(1, "Model S", "Tesla", "Luxury", "Bangalore")
);
inventoryManager.addCar(
  CarFactory.createCar(2, "EcoSport", "Ford", "SUV", "Bangalore")
);
inventoryManager.addCar(
  CarFactory.createCar(3, "Swift", "Maruti", "Hatchback", "Delhi")
);

// Create a customer.
const customer1 = new Customer(101, "Alice", "alice@example.com", "1234567890");

// Customer searches for cars in Bangalore.
const availableCars = rentACar.searchCars("Bangalore");
console.log("Available Cars in Bangalore:", availableCars);

// Customer books a car (choose carId=1) with pickup now and drop-off 4 hours later.
const pickupTime = new Date().toISOString();
const dropOffTime = new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString();
const booking = rentACar.bookCar(customer1, 1, pickupTime, dropOffTime);

// Process payment for the booking.
if (booking) {
  const payment = rentACar.processBookingPayment(booking, "credit card");
  console.log("Payment processed:", payment);
}

// Complete the booking.
rentACar.completeBooking(booking.id);

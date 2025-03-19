class Movie {
  constructor(id, name, duration) {
    this.id = id;
    this.name = name;
    this.duration = duration;
  }
}

class Theater {
  constructor(id, name, location) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.screens = [];
  }

  addScreen(screen) {
    this.screens.push(screen);
  }
}

class Screen {
  constructor(id, screenNumber) {
    this.id = id;
    this.screenNumber = screenNumber;
    this.shows = [];
  }

  addShow(show) {
    this.shows.push(show);
  }
}

class Show {
  constructor(id, movie, screen, startTime) {
    this.id = id;
    this.movie = movie;
    this.screen = screen;
    this.startTime = startTime;
    this.seats = new Map(); // Seat ID -> Boolean (true = booked, false = available)
  }

  addSeat(seat) {
    this.seats.set(seat.id, false);
  }
}

class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

class Booking {
  constructor(id, user, show, seats) {
    this.id = id;
    this.user = user;
    this.show = show;
    this.seats = seats;
    this.status = "PENDING";
  }
}

class PaymentService {
  processPayment(amount) {
    console.log(`Processing payment of $${amount}...`);
    return Math.random() > 0.2; // 80% chance of success
  }
}

class SecurePaymentProxy {
  constructor(paymentService) {
    this.paymentService = paymentService;
  }

  processPayment(user, amount) {
    if (!user) {
      throw new Error("Unauthorized user");
    }

    return this.paymentService.processPayment(amount);
  }
}

class NotificationService {
  sendNotification(user, message) {
    console.log(`📩 Sending notification to ${user.email}: ${message}`);
  }
}

class BookingNotifier {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notify(user, message) {
    this.observers.forEach((observer) =>
      observer.sendNotification(user, message)
    );
  }
}

// Booking System with Concurrency Handling
class BookingSystem {
  constructor() {
    this.bookings = [];
    this.paymentService = new SecurePaymentProxy(new PaymentService());
    this.notifier = new BookingNotifier();
  }

  bookSeats(user, show, seatIds) {
    if (!user || !show || seatIds.length === 0) {
      throw new Error("Invalid booking request");
    }

    // Locking Mechanism to Prevent Overbooking
    const availableSeats = seatIds.filter((seatId) => !show.seats.get(seatId));
    if (availableSeats.length !== seatIds.length) {
      console.log("⚠️ Some seats are already booked!");
      return false;
    }

    // Optimistic Locking - Mark Seats as Temporarily Unavailable
    availableSeats.forEach((seatId) => show.seats.set(seatId, true));

    const booking = new Booking(this.bookings.length + 1, user, show, seatIds);

    const paymentSuccess = this.paymentService.processPayment(
      user,
      seatIds.length * 10
    );
    if (!paymentSuccess) {
      console.log("⚠️ Payment failed, releasing seats...");
      availableSeats.forEach((seatId) => show.seats.set(seatId, false));
      return false;
    }

    booking.status = "CONFIRMED";
    this.bookings.push(booking);

    // Send Notification
    this.notifier.notify(user, "🎟 Your booking is confirmed!");

    console.log(`✅ Booking Successful: ${booking.id}`);
    return booking;
  }
}

const movie = new Movie(1, "Avengers", 180);
const theater = new Theater(1, "PVR", "New York");
const screen = new Screen(1, "IMAX");
const show = new Show(1, movie, screen, "7:00 PM");

theater.addScreen(screen);
screen.addShow(show);

// Add seats to the show
for (let i = 1; i <= 10; i++) {
  show.addSeat({ id: i });
}

const user = new User(1, "John Doe", "john@example.com");

const bookingSystem = new BookingSystem();
const success = bookingSystem.bookSeats(user, show, [1, 2, 3]);
console.log(success ? "🎉 Booking Completed!" : "❌ Booking Failed");

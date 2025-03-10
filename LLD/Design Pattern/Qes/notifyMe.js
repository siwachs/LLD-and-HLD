/*
Observer Design Pattern: In it if state of observable change it update that state to observers

Need Observable Interface -> add(Observer Interface) aka register, remove(Observer Interface), notify, SetData
Observer Interface -> Update
And Observable has a one to many relation with observer interface

1) Notify me
2) Wheather Station


Benefits of Using the Observer Pattern:

Decoupling: The product doesn't need to know the details of the customers; it simply notifies all registered observers.
Scalability: New notification methods (e.g., SMS, push notifications) can be added without modifying existing code.
Flexibility: Customers can subscribe or unsubscribe from notifications at any time.
*/

// Step 1: Define Notification Strategies
class NotificationStrategy {
  sendNotification(customerName, productName) {
    throw new Error("sendNotification() method must be implemented");
  }
}

class EmailNotification extends NotificationStrategy {
  sendNotification(customerName, productName) {
    console.log(
      `📧 Email sent to ${customerName}: '${productName}' is now back in stock!`
    );
  }
}

class SMSNotification extends NotificationStrategy {
  sendNotification(customerName, productName) {
    console.log(
      `📩 SMS sent to ${customerName}: '${productName}' is now back in stock!`
    );
  }
}

class PushNotification extends NotificationStrategy {
  sendNotification(customerName, productName) {
    console.log(`📱 Push Notification: '${productName}' is now available!`);
  }
}

// Step 2: Implement Customer with Multiple Notification Preferences
class Customer {
  constructor(name) {
    this.name = name;
    this.notificationMethods = [];
  }

  addNotificationMethod(method) {
    this.notificationMethods.push(method);
  }

  notify(productName) {
    this.notificationMethods.forEach((method) =>
      method.sendNotification(this.name, productName)
    );
  }
}

// Step 3: Implement the Product (Observable)
class Product {
  constructor(name) {
    this.name = name;
    this.inStock = false;
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter((sub) => sub !== observer);
  }

  setStock(inStock) {
    this.inStock = inStock;
    if (this.inStock) {
      this.notifyObservers();
    }
  }

  notifyObservers() {
    this.observers.forEach((observer) => observer.notify(this.name));
  }
}

// Usage Example
const laptop = new Product("Laptop");

// Create Customers with Different Notification Preferences
const customer1 = new Customer("Alice");
customer1.addNotificationMethod(new EmailNotification());
customer1.addNotificationMethod(new SMSNotification());

const customer2 = new Customer("Bob");
customer2.addNotificationMethod(new PushNotification());

// Customers Subscribe to Stock Alerts
laptop.addObserver(customer1);
laptop.addObserver(customer2);

// Product Back in Stock
laptop.setStock(true);

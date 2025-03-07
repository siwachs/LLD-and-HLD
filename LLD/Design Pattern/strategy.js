/* class PaymentProcessor:
    def pay(self, method, amount):
        if method == "credit_card":
            print(f"Paid ${amount} using Credit Card")
        elif method == "paypal":
            print(f"Paid ${amount} using PayPal")
        elif method == "bitcoin":
            print(f"Paid ${amount} using Bitcoin")
        else:
            raise ValueError("Invalid payment method")
 */

// Step 1: Define a common strategy interface
class PaymentStrategy {
  pay(amount) {
    throw new Error("Method 'pay()' must be implemented.");
  }
}

// Step 2: Implement different payment methods
class CreditCardPayment extends PaymentStrategy {
  pay(amount) {
    console.log(`Paid $${amount} using Credit Card`);
  }
}

class PayPalPayment extends PaymentStrategy {
  pay(amount) {
    console.log(`Paid $${amount} using PayPal`);
  }
}

class BitcoinPayment extends PaymentStrategy {
  pay(amount) {
    console.log(`Paid $${amount} using Bitcoin`);
  }
}

// Step 3: Define a class that uses the strategy dynamically
class PaymentProcessor {
  constructor(strategy) {
    this.strategy = strategy;
  }

  processPayment(amount) {
    this.strategy.pay(amount);
  }
}

// Usage
const payment1 = new PaymentProcessor(new CreditCardPayment());
payment1.processPayment(100); // ✅ Output: Paid $100 using Credit Card

const payment2 = new PaymentProcessor(new PayPalPayment());
payment2.processPayment(200); // ✅ Output: Paid $200 using PayPal

const payment3 = new PaymentProcessor(new BitcoinPayment());
payment3.processPayment(300); // ✅ Output: Paid $300 using Bitcoin

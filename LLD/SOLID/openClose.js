class Payment {
  pay(type) {
    if (type === "credit") {
    } else if (type === "paypal") {
    } // ❌ Modifying code every time
  }
}

// Using Polymorphism for Extension
class Payment {
  pay() {}
}

class CreditPayment extends Payment {
  pay() {}
}

class PayPalPayment extends Payment {
  pay() {}
}

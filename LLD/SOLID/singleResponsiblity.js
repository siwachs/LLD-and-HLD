class Order {
  calculateTotal() {}
  printInvoice() {} // ❌ This should be a separate class
}

class Order {
  calculateTotal() {}
}

class InvoicePrinter {
  printInvoice(order) {}
}

// Step 1: Define the Base Component (Coffee)
class Coffee {
  cost() {
    return 5; // Base price
  }

  description() {
    return "Basic Coffee";
  }
}

// Step 2: Create an Abstract Decorator
class CoffeeDecorator {
  constructor(coffee) {
    this._coffee = coffee;
  }

  cost() {
    return this._coffee.cost();
  }

  description() {
    return this._coffee.description();
  }
}

// Step 3: Create Concrete Decorators (Milk, Sugar, Whipped Cream)
class MilkDecorator extends CoffeeDecorator {
  cost() {
    return this._coffee.cost() + 2; // Milk costs $2
  }

  description() {
    return this._coffee.description() + ", Milk";
  }
}

class SugarDecorator extends CoffeeDecorator {
  cost() {
    return this._coffee.cost() + 1; // Sugar costs $1
  }

  description() {
    return this._coffee.description() + ", Sugar";
  }
}

class WhippedCreamDecorator extends CoffeeDecorator {
  cost() {
    return this._coffee.cost() + 3; // Whipped Cream costs $3
  }

  description() {
    return this._coffee.description() + ", Whipped Cream";
  }
}

// Usage Example
let coffee = new Coffee();
coffee = new MilkDecorator(coffee); // Add Milk
coffee = new SugarDecorator(coffee); // Add Sugar
coffee = new WhippedCreamDecorator(coffee); // Add Whipped Cream

console.log(`Order: ${coffee.description()}`); // Output: Basic Coffee, Milk, Sugar, Whipped Cream
console.log(`Total Cost: $${coffee.cost()}`); // Output: $11

// Step 1: Define the Real Subject (Actual Resource)
class RealBankAccount {
  constructor(owner) {
    this.owner = owner;
    this.balance = 1000;
  }

  withdraw(amount) {
    if (amount > this.balance) {
      console.log("Insufficient funds!");
    } else {
      this.balance -= amount;
      console.log(
        `Withdrawal of ${amount} successful. Remaining balance: ${this.balance}`
      );
    }
  }
}

// Step 2: Define the Proxy to Control Access
class BankAccountProxy {
  constructor(owner) {
    this.realAccount = new RealBankAccount(owner);
  }

  withdraw(amount, user) {
    if (user !== this.realAccount.owner) {
      console.log("Unauthorized access! Only the owner can withdraw.");
    } else {
      this.realAccount.withdraw(amount);
    }
  }
}

// Step 3: Usage
const account = new BankAccountProxy("Alice");
account.withdraw(200, "Alice"); // ✅ Withdrawal successful
account.withdraw(200, "Bob"); // ❌ Unauthorized access!

// Step 1: Define the Real Subject (Expensive Resource)
class ExpensiveResource {
  constructor() {
    console.log("Loading Expensive Resource...");
  }

  process() {
    console.log("Processing data...");
  }
}

// Step 2: Define the Proxy that Delays Initialization
class ResourceProxy {
  constructor() {
    this._real_resource = null; // Lazy Initialization
  }

  process() {
    if (!this._real_resource) {
      this._real_resource = new ExpensiveResource(); // Create only when needed
    }

    this._real_resource.process();
  }
}

// Step 3: Usage
const resource = new ResourceProxy();
console.log("Proxy created, but resource not yet loaded."); // Lazy initialization
resource.process(); // ✅ Now resource is created and used
resource.process(); // ✅ Reuses the already created resource

// Step 1: Define the Real Subject (Expensive Function)
class ExpensiveOperation {
  compute(value) {
    console.log(`Performing expensive computation for ${value}...`);
    return value * value; // Simulating expensive computation
  }
}

// Step 2: Define the Proxy that Caches Results
class CacheProxy {
  constructor() {
    this.realOperation = new ExpensiveOperation();
    this.cache = {};
  }

  compute(value) {
    if (this.cache[value]) {
      console.log(`Fetching from cache: ${value}`);
      return this.cache[value];
    }

    const result = this.realOperation.compute(value);
    this.cache[value] = result; // Store in cache
    return result;
  }
}

// Step 3: Usage
const cachedComputation = new CacheProxy();
console.log(cachedComputation.compute(5)); // ✅ Expensive computation
console.log(cachedComputation.compute(5)); // ✅ Fetches from cache

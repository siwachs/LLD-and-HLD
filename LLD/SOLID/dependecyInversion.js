class Backend {
  processData() {
    return "Processing in Backend";
  }
}

class Frontend {
  constructor() {
    this.backend = new Backend(); // ❌ Direct dependency
  }

  display() {
    return this.backend.processData();
  }
}

const app = new Frontend();
console.log(app.display()); // Output: Processing in Backend

// Step 1: Define an abstract interface (JS doesn't support interfaces natively)
class BackendInterface {
  processData() {
    throw new Error("processData() must be implemented");
  }
}

// Step 2: Implement concrete classes based on the abstraction
class Backend extends BackendInterface {
  processData() {
    return "Processing in Backend";
  }
}

class CloudBackend extends BackendInterface {
  processData() {
    return "Processing in Cloud Backend";
  }
}

// Step 3: Inject dependency into Frontend
class Frontend {
  constructor(backend) {
    if (!(backend instanceof BackendInterface)) {
      throw new Error("Dependency must implement BackendInterface");
    }
    this.backend = backend; // ✅ Depend on abstraction
  }

  display() {
    return this.backend.processData();
  }
}

// Usage
const app1 = new Frontend(new Backend());
console.log(app1.display()); // ✅ Output: Processing in Backend

const app2 = new Frontend(new CloudBackend());
console.log(app2.display()); // ✅ Output: Processing in Cloud Backend

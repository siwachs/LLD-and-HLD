class Bird {
  fly() {}
}

class Penguin extends Bird {
  fly() {
    throw new Error("Penguins cannot fly"); // ❌ Violates LSP
  }
}

class Bird {}

class FlyingBird extends Bird {
  fly() {}
}

class Penguin extends Bird {} // ✅ Now Penguin does not have fly()

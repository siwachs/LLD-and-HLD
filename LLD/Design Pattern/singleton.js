class Singleton {
  static instance = null;

  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = this;
    }

    return Singleton.instance;
  }
}

// Usage
const s1 = new Singleton();
const s2 = new Singleton();
console.log(s1 === s2); // ✅ Output: true (Both are the same instance)

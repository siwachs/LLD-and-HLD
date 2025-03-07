class Worker {
  work() {}
  eat() {} // ❌ Not all workers eat
}

class Workable {
  work() {}
}

class Eatable {
  eat() {}
}

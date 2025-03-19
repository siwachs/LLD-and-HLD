class Car {
  drive() {
    return "Driving a car";
  }
}

class Bike {
  drive() {
    return "Riding a bike";
  }
}

class VehicleFactory {
  static getVehicle(type) {
    if (type === "car") return new Car();
    if (type === "bike") return new Bike();
    throw new Error("Unknown vehicle type");
  }
}

// Usage
const vehicle = VehicleFactory.getVehicle("car");
console.log(vehicle.drive()); // ✅ Output: Driving a car

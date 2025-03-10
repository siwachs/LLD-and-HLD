# Designing a parking lot system

Designing a parking lot system requires careful consideration of various components and their interactions. Below is an in-depth low-level design (LLD) of a parking lot system implemented in JavaScript, covering essential classes, their responsibilities, and interactions.
Requirements

1. Multiple Floors: The parking lot should support multiple floors.
2. Multiple Vehicle Types: It should accommodate different vehicle types: motorcycles, cars, and trucks.
3. Parking Spot Types: Each vehicle type should have designated parking spots: MotorcycleSpot, CarSpot, and TruckSpot.
4. Entry and Exit Points: The system should have multiple entry and exit points.
5. Ticketing System: A ticket should be issued upon entry, tracking the vehicle's entry time and assigned spot.
6. Payment System: The system should calculate parking fees based on the duration of the stay and support various payment methods.

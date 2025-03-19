# Designing a Rent a Car

📌 Step 1: Understanding the Requirements
🎯 Functional Requirements

✔ Search & Inventory:
• Customers can search for available cars at a specified location (city/branch).
• Each car has attributes such as carId, model, brand, type (Sedan, SUV, Hatchback, Luxury), current location, and status (available, booked, maintenance).

✔ Booking & Rental Flow:
• Customers book a car for a specific rental period (pickup & drop-off times).
• Once a booking is made, a booking record is created and the car status is updated to “booked”.
• Users can cancel or modify bookings.

✔ Payment Processing:
• Rental fees are computed based on duration, car type, and any additional fees.
• Payment is processed with status tracking (pending, completed, failed).

✔ User Notifications:
• Customers receive notifications for booking confirmations, reminders, and cancellations.

⚡ Non-Functional Requirements

✔ High Performance:
• Fast search and booking operations are critical.

✔ Scalability:
• The system should handle thousands of cars and users across multiple regions.

✔ Fault Tolerance & Concurrency:
• Prevent double-bookings with robust concurrency control.
• System must gracefully handle failures.

✔ Extensibility & Maintainability:
• Easily plug in new pricing strategies, additional notification channels, or support new car types.

📌 Step 2: Key Classes & Relationships
Core Entities

    Customer:
    • Stores customer details (ID, name, contact info).
    • Each customer can have multiple bookings.

    Car:
    • Represents a rental vehicle with attributes like carId, model, brand, type, location, and status.
    • Can be extended via a Factory Pattern if different car types require different initializations.

    Booking:
    • Represents a rental reservation containing bookingId, customer, car, pickup time, drop-off time, and status.

    Payment:
    • Processes payment for a booking and tracks payment status.

    InventoryManager:
    • Manages the car inventory across various locations.
    • Implemented as a Singleton for consistency.

    PricingEngine:
    • Calculates rental fees using different pricing strategies (Strategy Pattern).

    CarRentalSystem:
    • Acts as the façade orchestrating the entire flow: search, booking, payment processing, and updating statuses.

🎭 BookMyShow Low-Level Design (LLD) | Movie Ticket Booking System

📌 Step 1: Understanding the Requirements
🎯 Functional Requirements
✔ Users can search for movies, view show timings, and book tickets.
✔ Support multiple cities, theaters, and movie screens.
✔ Seat selection should be available with real-time availability updates.
✔ Users should receive booking confirmation and e-tickets.
✔ Support for different payment methods and refunds in case of cancellations.
✔ Loyalty programs, discount codes, and promotional offers should be applicable.
✔ Support for different types of seats (Normal, Premium, VIP).

⚡ Non-Functional Requirements
✔ Scalability: Should handle thousands of users booking tickets simultaneously.
✔ Concurrency: Avoid race conditions while booking seats.
✔ Performance: Fast response time for seat availability and payment processing.
✔ Reliability: Ensure successful booking and payment through fail-safe mechanisms.
✔ Security: Secure user data and transactions.

📌 Step 2: Identifying Key Entities & Relationships
🏗️ Classes & Their Relationships
1️⃣ User (🎭 Actor)

Registers, logs in, and books tickets.
2️⃣ Movie

Contains details like name, duration, language, and genre.
3️⃣ Theater

Houses multiple screens and supports multiple movies.
4️⃣ Screen

Represents the actual screening area with a seat layout.
5️⃣ Show

A combination of movie, screen, and timing.
6️⃣ Seat

Represents individual seats within a screen.
7️⃣ Booking

Stores ticket booking information.
8️⃣ Payment

Manages payment transactions.
9️⃣ Notification

Sends confirmation and alerts.

📌 Step 3: Design Patterns Used
✅ Singleton Pattern
Used for managing instances of Theater and Payment services (ensuring a single instance is used).

✅ Factory Pattern
Used for creating different types of Seats (Normal, Premium, VIP).

✅ Observer Pattern
Used for the Notification service (email, SMS, push notifications).

✅ Strategy Pattern
Used to support multiple payment methods (Credit Card, PayPal, UPI).

✅ Concurrency Handling (Optimistic Locking & Distributed Locks)
Avoids race conditions in seat booking by using database transactions or Redis-based locking.

📌 Step 3: Low-Level Design (LLD)

```
Class	         Responsibility	Design                                Pattern
User	            Stores user details	                              None
Movie	            Stores movie details	                          None
Theater	            Stores theater and screens	                      None
Show	            Represents a movie show at a particular time	  None
Seat	            Represents a seat in a theater	                  None
Booking	            Manages bookings and payments	                  Singleton Pattern
Payment	            Handles payments	                              Strategy Pattern
NotificationService	Sends notifications	                              Observer Pattern
BookingManager	    Manages seat allocation	                          Factory Pattern
CacheManager	    Stores recent bookings for fast retrieval	      Proxy Pattern
```

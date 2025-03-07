# Design Patterns

Design patterns provide reusable solutions to common software design problems. They help make code more maintainable, scalable, and efficient.

1️⃣ Creational Patterns (Object Creation)

1. Factory Pattern ✅
2. Singleton Pattern ✅

2️⃣ Structural Patterns (Object Composition & Relationships)

1. Adapter Pattern ✅
2. Decorator Pattern ✅

3️⃣ Behavioral Patterns (Object Interaction & Communication)

1. Observer Pattern ✅
2. Strategy Pattern ✅

1) Factory Pattern
   ✅ Factory Pattern (Used when creating objects dynamically)
   📌 Problem: If we create objects using new Class(), it makes the code tightly coupled. Factory Pattern solves this by creating objects dynamically.
   📌 Why Use It?
   ✅ Centralized object creation, avoiding direct use of new.
   ✅ Useful when multiple object types share a common interface.

2) Singleton Pattern
   ✅ Singleton Pattern (Only One Instance Allowed)
   📌 Problem: If multiple instances of a class exist, it can cause inconsistencies. Singleton ensures only one instance of a class is created.
   📌 Why Use It?
   ✅ Ensures a single source of truth (e.g., configuration, logging, database connection).
   ✅ Prevents redundant object creation, saving memory.

3) Strategy Pattern
   The Strategy Pattern is used when we have multiple algorithms (strategies) for a task, and we want to switch between them dynamically without modifying the code.
   🔹 Key Concept: Define a family of algorithms, encapsulate each one as a separate class, and allow them to be interchangeable.
   🔹 Why Use It?
   Avoids long if-else or switch-case statements.
   Makes the code scalable, maintainable, and flexible.
   Helps in implementing open/closed principle (OCP) (new strategies can be added without modifying existing code).
   Let's say we are building an e-commerce application where users can pay using Credit Card, PayPal, or Bitcoin.

4) Observer Pattern

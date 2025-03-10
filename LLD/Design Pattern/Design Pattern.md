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
   The Observer Pattern is used when multiple objects (observers) need to be notified automatically when the state of another object (subject) changes.
   Key Concept: A subject (publisher) maintains a list of observers (subscribers) and notifies them of any changes.
   🔹 Why Use It?
   Helps decouple the subject from the observers.
   Ensures that changes in one object reflect in all dependent objects.
   Implements event-driven programming. Just like in youtube notification system.
   No modification needed, just add a new clas
   🎯 When to Use Observer Pattern?
   ✅ When multiple objects need to be updated when a subject changes (e.g., event-driven applications).
   ✅ When you want to decouple subjects and observers for flexibility.
   ✅ When you need real-time notifications (e.g., news updates, social media notifications).
   ✅ When implementing publish-subscribe models.

5) Decorator Pattern
   The Decorator Pattern is a structural pattern that allows you to dynamically add new behaviors to an object without modifying its existing code.
   It follows the Open-Closed Principle (OCP) from SOLID, meaning the system is open for extension but closed for modification.
   ie we have F1, Wrap in F2 feature which is a decorator and that F2 can also wrap in F3 to add new features and so on like F1 + F2 + F3 + ..... Fn

   ✅ Real-World Example: Coffee Customization System
   Imagine a coffee shop where a customer can order a basic coffee and add extra features like milk, sugar, or whipped cream without modifying the base class.

   🎯 Key Components
   Component → The base object (e.g., Coffee).
   Concrete Component → A specific implementation of the base object (e.g., Basic Coffee).
   Decorator → The abstract class that extends behavior.
   Concrete Decorators → Different add-ons (Milk, Sugar, Whipped Cream).

   Why need this?
   To fix problem like Class Explosion
   Ex -> A vehicle
   Base Car + AC
   Base Cart + AC + Power Steering and so on
   It leads to creation of too many classes that it became hard to manage

# Factory Pattern vs. Abstract Factory Pattern

Both Factory Pattern and Abstract Factory Pattern are creational design patterns that help create objects without specifying their exact class. However, they differ in their purpose and complexity.

1️⃣ Factory Pattern

✅ Used when: You need to create objects of the same family/type but want to hide object creation logic from the client.

🔹 Key Features:

    Returns one type of object based on input.
    Encapsulates object creation into a single method.
    Simplifies code maintenance (hides new keyword).

✅ Scenario: Create a notification service that returns Email or SMS notifications.
🔹 When to Use Factory Pattern?

    When object creation logic is complex and should be centralized.
    When clients should not know the exact class name (decoupling).

2️⃣ Abstract Factory Pattern

✅ Used when: You need to create multiple related families of objects but ensure that they are compatible.

🔹 Key Features:

    Provides a higher-level factory to create factories.
    Returns a group of related objects instead of a single object.
    Ensures products remain compatible by enforcing object families.

✅ Scenario: You need a Notification Factory, but notifications can have different platforms (Web, Mobile), and you need to return the correct type of notifications per platform.
🔹 When to Use Abstract Factory Pattern?

    When you need to ensure compatibility across multiple products.
    When multiple families of related objects exist.
    When creating different object types should be centralized.

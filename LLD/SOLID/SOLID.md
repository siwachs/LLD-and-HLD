# SOLID

# Single Responsiblity, Open / Closed, Liskov Substitution, Interface Segmented And Dependency Inverse

Helps in

1. Avoid code duplication
2. Easy to maintain and understand
3. Flexible Software and Reduce Complexity

1) Single Responsiblity: A class should have only one responsiblity ie one reason to change.
   Ex A order class it can calculate total order. But for Invoice there should be another class
   ie class Order and class InvoicePrinter

2) Open / Closed
   A class should be open for extension but closed for modification.

3) Liskov Substitution Principle (LSP)
   A subclass should fully replace its parent class without breaking functionality.
   TO follow liskov Put Every generic methods that are common for all in Parent class.

4) Interface Segregation Principle (ISP)
   A class should not be forced to implement unnecessary methods.

5) Dependency Inversion Principle (DIP)
   Classes should depend on abstractions/interfaces, not concrete implementations.
   High-level modules should not depend on low-level modules. Both should depend on abstractions.
   Reduces tight coupling between classes.

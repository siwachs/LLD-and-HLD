🚀 Low-Level Design (LLD) of a Logging System using Chain of Responsibility Pattern

📌 Objective:
Design a Logging System that supports different log levels (INFO, DEBUG, ERROR) and allows flexible logging with a scalable architecture.

📌 Design Pattern Used:
✅ Chain of Responsibility – Requests (log messages) are passed along a chain of handlers until a suitable handler processes it.

📌 Real-World Use Case:

    In a distributed system, logging should be modular, extensible, and configurable.
    Log messages should be filtered based on severity before being processed.

📌 Step 1: Understanding the Requirements
🎯 Functional Requirements

✔ Support multiple log levels (INFO, DEBUG, ERROR)
✔ Each log message is passed to the appropriate handler
✔ Messages can be handled by multiple loggers (e.g., Console, File, Database)
✔ Loggers can be dynamically configured (set logging levels, change handlers)
⚡ Non-Functional Requirements

✔ Scalability – New log levels or handlers should be easy to add.
✔ Performance – Avoid unnecessary processing for unneeded logs.
✔ Extensibility – Should support adding more loggers without modifying existing ones.
✔ Decoupling – Logging system should be independent of application logic.

📌 Step 2: Key Classes & Design Components
🔷 1. Abstract Logger Class (Base Handler)

    Defines a setNext(handler) method to set the next logger in the chain.
    Implements logMessage(level, message), which checks if it can handle the message.
    If it cannot handle the message, it forwards it to the next logger.

🔷 2. Concrete Logger Classes

Each logger processes only messages of its severity level or higher.

    ConsoleLogger – Logs messages to the console.
    FileLogger – Logs messages to a file.
    DatabaseLogger – Stores logs in a database.

🔷 3. Logger Levels (Enum)

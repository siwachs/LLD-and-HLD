🚀 Facade Pattern – Low-Level Design (LLD) Breakdown
📌 Step 1: Understanding the Problem
What is the Facade Pattern?

    A structural design pattern that provides a simplified interface to a complex system.
    Instead of exposing multiple interdependent subsystems, it defines a single entry point (Facade) to interact with them.

📌 Real-World Analogy

Imagine a smart home system that includes:
✅ Lights
✅ Thermostat
✅ Security System

Instead of controlling each device separately, you have a single app (Facade) that allows one-click automation.
📌 Step 2: Why Do We Need the Facade Pattern?

💡 Common Problem:

    In large systems, clients must interact with multiple subsystems.
    This leads to tight coupling and makes maintenance difficult.
    Code readability and flexibility decrease as the system grows.

💡 Solution:

    Introduce a Facade Class that abstracts the complexity.
    The client interacts with only the Facade, which delegates calls to subsystems.
    This ensures loose coupling and better organization.

📌 Step 3: Key Classes & Their Relationships
🎯 Class Breakdown
Class Name Responsibility Relationship
VideoDecoder Decodes the video file Used by Facade
VideoTranscoder Converts the video into the required format Used by Facade
VideoPlayer Plays the video after processing Used by Facade
VideoStreamingFacade Main Facade Class that simplifies the system Controls all
🔗 UML-Class Relationship (Facade)

Client → [VideoStreamingFacade] → (VideoDecoder, VideoTranscoder, VideoPlayer)

---

🚀 Chain of Responsibility (CoR) Pattern – Low-Level Design (LLD) Breakdown
📌 Step 1: Understanding the Problem
What is the Chain of Responsibility Pattern?

    A behavioral design pattern that allows a request to pass through a chain of handlers.
    Each handler decides whether to process the request or pass it to the next handler.
    Promotes loose coupling between senders and receivers.

📌 Step 2: Real-World Analogy
🔹 Example: Customer Support System

When you raise a support ticket:

    Level 1 Support (Chatbot) tries to handle the issue.
    If unresolved, it moves to Level 2 Support (Agent).
    If still unresolved, it moves to Level 3 (Manager).
    The request stops when a handler resolves the issue.

💡 Key Idea: Each handler has a responsibility but can delegate if necessary.
📌 Step 3: Why Do We Need the Chain of Responsibility Pattern?
❌ Common Problem Without CoR:

    Tightly coupled logic where all handlers are aware of each other.
    Code duplication as each class manually checks the conditions.
    Difficult to extend because adding a new handler requires modifying existing logic.

✅ Solution With CoR:

    Handlers are independent and can be added/removed dynamically.
    Encapsulation ensures that request processing logic stays modular.
    Uses polymorphism so new handlers can be added without modifying existing ones.

📌 Step 4: Key Classes & Their Relationships
Class Name Responsibility Relationship
Handler (Interface) Defines the structure for handling requests Parent Class
ConcreteHandler1 Processes request or forwards it Implements Handler
ConcreteHandler2 Processes request or forwards it Implements Handler
ConcreteHandlerN Last handler in chain, final decision Implements Handler
🔗 UML-Class Relationship

Client → [Handler] → [Handler1] → [Handler2] → [HandlerN] (Stops Processing)

Real usecase are:

1. ATM or Vending Machine
2. Logger

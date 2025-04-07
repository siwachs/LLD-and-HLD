🚀 Proxy Design Pattern

📌 Definition
The Proxy Pattern is a structural design pattern that provides a surrogate or placeholder for another object to control access to it. It is used to add an extra layer of control without modifying the original object.
it request to real object kind of a middleware
A User request internet a Proxy is in middle having list of blocked websites
can be use in caching or Access Control or Preprocess and Postprocess like notify

🎯 When to Use the Proxy Pattern?
✅ Access Control – Restricts access to certain resources.
✅ Lazy Initialization – Delays the creation of an object until it is needed.
✅ Logging/Monitoring – Adds logging or monitoring before invoking an operation.
✅ Security – Controls permissions before granting access to a resource.
✅ Caching – Stores already computed results to avoid unnecessary calculations.
✅ Remote Proxy – Handles communication between a client and a remote object (e.g., API calls).

🔥 Types of Proxy Patterns
1️⃣ Virtual Proxy – Lazy initialization, creating expensive objects only when needed.
2️⃣ Protection Proxy – Restricts access based on permissions.
3️⃣ Remote Proxy – Represents an object that exists in another location (e.g., network proxy).
4️⃣ Cache Proxy – Caches expensive computations or frequently accessed data.
5️⃣ Logging Proxy – Logs interactions with the real object.

⚡ Real-World Use Cases
🔹 Database Connection Proxy – Controls access to a database to prevent excessive connections.
🔹 API Gateway Proxy – Handles API calls to third-party services with caching and security.
🔹 Virtual Proxy for Expensive Objects – Loads heavy resources only when needed (e.g., images, files).
🔹 Authentication Proxy – Validates user access before executing an operation.
🔹 CDN (Content Delivery Network) Proxy – Caches content to improve website performance.

```
┌────────────────────┐
│      Subject       │◄──────────────────┐
│  + request(): void │                   │
└────────────────────┘                   │
         ▲                               │
         │                               │
┌────────────────────┐       ┌──────────────────────┐
│  RealSubject       │       │       Proxy          │
│  + request(): void │       │  + request(): void   │
└────────────────────┘       └──────────────────────┘
                                    │
                         ┌──────────┴──────────┐
                         │ Controls Access to  │
                         │  RealSubject        │
                         └─────────────────────┘

```

⚡ Key Takeaways
✔ Proxy adds an extra layer of control without modifying the original object.
✔ Can be used for access control, caching, logging, security, lazy loading, and remote access.
✔ Does not replace the real object, but instead acts as an intermediary.
✔ Can be implemented in multiple ways based on use cases like Virtual Proxy, Protection Proxy, Remote Proxy, Cache Proxy, and Logging Proxy.

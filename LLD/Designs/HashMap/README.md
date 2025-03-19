🔥 Hashing: A Complete Breakdown
📌 What is Hashing?

Hashing is a technique used to map data (keys) to a fixed-size value (hash code) using a hash function. It is commonly used for:
✅ Fast data retrieval (O(1) in best case)
✅ Efficient indexing (Databases, Caches, Hash Tables)
✅ Cryptographic security (Passwords, Digital Signatures)

🏗 How Hashing Works

    A key (input data) is passed to a hash function.
    The function generates a hash code (integer value).
    This hash code is mapped to an index in a data structure (e.g., an array).
    If multiple keys map to the same index, we handle collisions (explained later).

1. Functional Requirements
   Mapping Keys to Values:
   Efficiently map arbitrary keys (e.g., strings) to values.
   Fast Operations:
   Aim for O(1) average-case performance for set, get, and delete.
   Collision Handling:
   Support scenarios where different keys produce the same hash index.
   Rehashing:
   Automatically resize and rehash the internal storage when the load factor exceeds a threshold.

2. Non-Functional Requirements
   Scalability:
   Must handle large numbers of keys by dynamically resizing.
   Extensibility:
   Allow plugging in different collision resolution strategies.
   Configurability:
   Support custom settings (e.g., default size, load factor threshold).

3. Design Approach & Pattern Justification
   A. Key Components & Their Responsibilities
   HashMap Core Class:
   Manages an internal array (buckets) for storing key-value pairs.
   Provides APIs: set(key, value), get(key), and delete(key).
   Hash Function:
   Computes an integer hash from a key and then maps it to an index (via modulo operation).
   Must distribute keys evenly.
   Collision Resolution Strategy:
   We’ll use Separate Chaining by default (each bucket is a linked list or dynamic array).
   Using the Strategy Pattern, we can swap in an alternative (e.g., Open Addressing) later.
   Load Factor & Rehashing:

A load factor threshold (e.g., 0.75) is maintained.
When the number of items divided by the bucket count exceeds the threshold, the table is resized (typically doubled) and all keys are rehashed.
Configuration/Builder:

Use the Builder Pattern (or Factory Pattern) to allow configuring default size, load factor threshold, and collision strategy.

4. Applied Design Patterns & Rationale
   Factory/Builder Pattern:
   To create a configurable HashMap instance. This pattern enables clients to specify default capacity and load factor.
   Strategy Pattern:
   For collision resolution, so that we can plug in alternative strategies (e.g., separate chaining vs. open addressing) without changing the HashMap’s core logic.
   Singleton Pattern:
   Not strictly necessary here, but if a global instance is needed (e.g., for caching), it can be wrapped as a Singleton.
   Encapsulation & Separation of Concerns:
   Each module (hash function, collision handler, rehash logic) is separate and testable.

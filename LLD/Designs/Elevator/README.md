# Designing an Elevator System

🔍 Problem Statement

Design a scalable, efficient, and object-oriented Elevator System that handles multiple elevators across different floors, with multiple users requesting up/down rides.

📌 Step 1: Functional Requirements

✅ Basic Features

    Support multiple elevators in a building.
    Users can request an elevator from any floor.
    Users can select a destination once inside.
    The elevator moves optimally to serve requests.
    Doors open/close automatically.

✅ Advanced Features (for future scalability)

    Multiple elevator algorithms (FCFS, Nearest Car, etc.).
    Priority handling for emergency situations.
    Maintenance mode for elevators.
    Weight sensors to detect overload.

📌 Step 2: Non-Functional Requirements

    Concurrency Handling 🏢: Multiple users can request at the same time.
    Fault Tolerance ⚡: Elevator should handle failures gracefully.
    Scalability 🔄: Should support high-rise buildings with 50+ floors.

📌 Step 3: Identifying Core Entities

To follow SOLID principles, we break down the elevator system into modular classes.
Key Classes & Relationships

1️⃣ ElevatorSystem (Manages all elevators, handles requests)
2️⃣ Elevator (Represents an elevator, processes requests)
3️⃣ Floor (Represents a floor, users request from here)
4️⃣ Request (Stores user request: Source/Destination)
5️⃣ Controller (Decides elevator movements using an algorithm)
6️⃣ Door (Handles door opening/closing)
7️⃣ Display (Shows elevator status)

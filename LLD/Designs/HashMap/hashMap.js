function hashForString(key, buncketCount) {
  let hash = 0;

  for (let i = 0; i < key.length; i++) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash) % buncketCount;
}

class CollisionResolutionStrategy {
  set(bucket, key, value) {
    throw new Error("Not Implemented");
  }

  get(bucket, key) {
    throw new Error("Not Implemented");
  }

  delete(bucket, key) {
    throw new Error("Not Implemented");
  }
}

// Separate Chaining Strategy (each bucket is a list)
class SeparateChainingStrategy extends CollisionResolutionStrategy {
  set(bucket, key, value) {
    for (const pair of bucket) {
      if (pair.key === key) {
        bucket.value = value;
        return;
      }
    }

    bucket.push({ key, value });
  }

  get(bucket, key) {
    for (const pair of bucket) {
      if (pair.key === key) return pair.value;
    }

    return null;
  }

  delete(bucket, key) {
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1);
        return true;
      }
    }

    return false;
  }
}

class HashMap {
  constructor({
    initialCapacity = 16,
    loadFactor = 0.75,
    collisionStrategy = new SeparateChainingStrategy(),
  } = {}) {
    this.initialCapacity = initialCapacity;
    this.loadFactor = loadFactor;
    this.collisionStrategy = collisionStrategy;

    this.bucketCount = initialCapacity;
    this.size = 0;
    this.buckets = Array.from({ length: this.bucketCount }, () => []);
  }

  _hash(key) {
    return hashForString(key, this.bucketCount);
  }

  _rehash() {
    const oldBuckets = this.buckets;
    this.bucketCount *= 2;

    this.buckets = Array.from({ length: this.bucketCount }, () => []);
    this.size = 0;

    for (const bucket of oldBuckets) {
      for (const pair of bucket) this.set(pair.key, pair.value);
    }
  }

  set(key, value) {
    const hash = this._hash(key);
    const bucket = this.buckets[hash];

    const prevSize = bucket.length;
    this.collisionStrategy.set(bucket, key, value);

    if (bucket.length > prevSize) {
      this.size++;

      if (this.size / this.bucketCount > this.loadFactor) this._rehash();
    }
  }

  get(key) {
    const hash = this._hash(key);
    const bucket = this.buckets[hash];

    return this.collisionStrategy.get(bucket, key);
  }

  delete(key) {
    const hash = this._hash(key);
    const bucket = this.buckets[hash];

    const result = this.collisionStrategy.delete(bucket, key);
    if (result) {
      this.size--;
    }

    return result;
  }
}

// -------------------------------
// Demo Usage of the HashMap
// -------------------------------
const hashMap = new HashMap({ initialCapacity: 8, loadFactor: 0.75 });

// Insert some values.
hashMap.set("apple", 10);
hashMap.set("banana", 20);
hashMap.set("orange", 30);
hashMap.set("grape", 40);

console.log("apple:", hashMap.get("apple")); // Expected: 10
console.log("banana:", hashMap.get("banana")); // Expected: 20

// Test collision: keys that produce same hash index might be added
hashMap.set("melon", 50);
console.log("melon:", hashMap.get("melon"));

// Delete a key.
hashMap.delete("orange");
console.log("orange:", hashMap.get("orange")); // Expected: null

// Check rehashing by adding more keys.
for (let i = 0; i < 20; i++) {
  hashMap.set(`key${i}`, i);
}
console.log("Size after inserts:", hashMap.size);

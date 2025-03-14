const LogLevel = {
  INFO: 1,
  DEBUG: 2,
  ERROR: 3,
  CLOUD: 4,
};

class Logger {
  constructor(level) {
    this.level = level;
    this.nextLogger = null;
  }

  setNext(logger) {
    this.setNext = logger;
    return logger;
  }

  logMessage(level, message) {
    if (level >= this.level) {
      this.write(message);
    } else if (this.nextLogger) this.nextLogger.logMessage(level, message);
  }

  write(message) {
    throw new Error("Method 'write()' must be implemented.");
  }
}

class ConsoleLogger extends Logger {
  write(message) {
    console.log(`Console Logger :${message}`);
  }
}

class FileLogger extends Logger {
  write(message) {
    console.log(`Writing to File: ${message}`);
  }
}

class DatabaseLogger extends Logger {
  write(message) {
    console.log(`Saving to Database: ${message}`);
  }
}

class CloudLogger extends Logger {
  write(message) {
    console.log(`Log into cloud: ${message}`);
  }
}

// 📌 Step 4: Setting Up the Logger Chain
const consoleLogger = new ConsoleLogger(LogLevel.INFO);
const fileLogger = new FileLogger(LogLevel.DEBUG);
const databaseLogger = new DatabaseLogger(LogLevel.ERROR);
const clouldLogger = new CloudLogger();

consoleLogger.setNext(fileLogger).setNext(databaseLogger).setNext(clouldLogger);

// 📌 Step 5: Testing the Logging System
console.log("\n🔹 Log Level: INFO");
consoleLogger.logMessage(LogLevel.INFO, "This is an INFO log.");

console.log("\n🔹 Log Level: DEBUG");
consoleLogger.logMessage(LogLevel.DEBUG, "This is a DEBUG log.");

console.log("\n🔹 Log Level: ERROR");
consoleLogger.logMessage(LogLevel.ERROR, "This is an ERROR log.");

console.log("\n🔹 Log Level: CLOUD");
consoleLogger.logMessage(LogLevel.CLOUD, "This is an Cloud log.");

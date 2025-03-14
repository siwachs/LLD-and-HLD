class Hander {
  setNext(handler) {
    this.nextHandler = handler;
    return handler;
  }

  handleRequest() {
    if (this.nextHandler) return this.nextHandler.handleRequest();

    console.log("No handler could process the request.");
  }
}

class Chatbot extends Hander {
  handleRequest(request) {
    if (request === "basic issue") console.log("Chatbot is resolving...");
    else {
      console.log("Chatbot: Forwarding request...");
      super.handleRequest(request);
    }
  }
}

class AgentSupport extends Hander {
  handleRequest(request) {
    if (request === "moderate issue") console.log("Agent is resolving...");
    else {
      console.log("AgentSupport: Forwarding request...");
      super.handleRequest(request);
    }
  }
}

class ManagerSupport extends Hander {
  handleRequest(request) {
    if (request === "complex issue") console.log("Manager is resolving...");
    else console.log("Manager: Cannot resolve this issue.");
  }
}

// 🎯 Client Code
const chatbot = new Chatbot();
const agent = new AgentSupport();
const manager = new ManagerSupport();

chatbot.setNext(agent).setNext(manager);

// Testing Different Requests
console.log("\nRequest: basic issue");
chatbot.handleRequest("basic issue");

console.log("\nRequest: moderate issue");
chatbot.handleRequest("moderate issue");

console.log("\nRequest: complex issue");
chatbot.handleRequest("complex issue");

console.log("\nRequest: unknown issue");
chatbot.handleRequest("unknown issue");

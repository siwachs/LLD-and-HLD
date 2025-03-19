// Factory Pattern
class EmailNotification {
  send() {
    return "Sending Email Notification";
  }
}

class SMSNotification {
  send() {
    return "Sending SMS Notification";
  }
}

class NotificationFactory {
  static getNotification(channel) {
    if (channel === "email") return new EmailNotification();
    if (channel === "sms") return new SMSNotification();
    throw new Error("Invalid notification type");
  }
}

// Client code
const notif = NotificationFactory.getNotification("email");
console.log(notif.send()); // Output: Sending Email Notification

// Abstract Factory Pattern
class EmailNotification {
  send() {
    return "Sending Email Notification";
  }
}

class SMSNotification {
  send() {
    return "Sending SMS Notification";
  }
}

class WebPushNotification {
  send() {
    return "Sending Web Push Notification";
  }
}

// Abstract Factory
class NotificationFactory {
  createEmailNotification() {}
  createSMSNotification() {}
}

// Concrete Factory for Mobile
class MobileNotificationFactory extends NotificationFactory {
  createEmailNotification() {
    return new EmailNotification();
  }
  createSMSNotification() {
    return new SMSNotification();
  }
}

// Concrete Factory for Web
class WebNotificationFactory extends NotificationFactory {
  createEmailNotification() {
    return new WebPushNotification();
  }
  createSMSNotification() {
    return new SMSNotification();
  }
}

// Client Code
const factory = new MobileNotificationFactory(); // Can switch to WebNotificationFactory()
const emailNotif = factory.createEmailNotification();
console.log(emailNotif.send()); // Output: Sending Email Notification

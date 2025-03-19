/*
📍 Real-World Example: YouTube Notification System

Think of YouTube.

    A YouTuber (Subject) has Subscribers (Observers).
    When the YouTuber uploads a new video, all subscribers get notified.
*/

/*
class YouTubeChannel:
    def __init__(self):
        self.subscribers = []

    def add_subscriber(self, subscriber):
        self.subscribers.append(subscriber)

    def upload_video(self, video_title):
        print(f"New video uploaded: {video_title}")
        for subscriber in self.subscribers:
            subscriber.notify(video_title)
*/

/*
Problems:
    The channel directly manages all subscribers.
    Adding new types of subscribers requires modifying this class.
    Violates Open/Closed Principle (OCP).

Solution:
    Subject (Observable) → Manages observers and notifies them.
    Observer (Subscriber) → Gets notified when subject changes.
*/

// Step 1: Define Observer Interface
class Subscriber {
  notify(videoTitle) {
    throw new Error("notify() method must be implemented");
  }
}

// Step 2: Implement Concrete Observers (Subscribers)
class EmailSubscriber extends Subscriber {
  notify(videoTitle) {
    console.log(`📧 Email Notification: New video '${videoTitle}' uploaded!`);
  }
}

class SMSSubscriber extends Subscriber {
  notify(videoTitle) {
    console.log(`📩 SMS Notification: New video '${videoTitle}' uploaded!`);
  }
}

class PushSubscriber extends Subscriber {
  notify(videoTitle) {
    console.log(`🔔 Push Notification: New video '${videoTitle}' uploaded!`);
  }
}

// Step 3: Define Subject (YouTube Channel)
class YouTubeChannel {
  constructor() {
    this.subscribers = [];
  }

  addSubscriber(subscriber) {
    this.subscribers.push(subscriber);
  }

  removeSubscriber(subscriber) {
    this.subscribers = this.subscribers.filter((sub) => sub !== subscriber);
  }

  uploadVideo(videoTitle) {
    console.log(`\n🎥 New Video Uploaded: ${videoTitle}`);
    this.subscribers.forEach((subscriber) => subscriber.notify(videoTitle));
  }
}

// Usage
const channel = new YouTubeChannel();

// Creating Subscribers
const emailSub = new EmailSubscriber();
const smsSub = new SMSSubscriber();
const pushSub = new PushSubscriber();

// Adding Subscribers
channel.addSubscriber(emailSub);
channel.addSubscriber(smsSub);
channel.addSubscriber(pushSub);

// Uploading Video (All subscribers get notified)
channel.uploadVideo("Observer Pattern Tutorial");

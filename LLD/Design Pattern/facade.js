// Subsystems (Complex Components)
class VideoDecoder {
  decode(video) {
    console.log(`Decoding video: ${video}`);
  }
}

class VideoTranscoder {
  transcode(video, format) {
    console.log(`Transcoding ${video} to ${format}`);
  }
}

class VideoPlayer {
  play(video) {
    console.log(`Playing video: ${video}`);
  }
}

// Facade Class
class VideoStreamingFacade {
  constructor() {
    this.decoder = new VideoDecoder();
    this.transcoder = new VideoTranscoder();
    this.player = new VideoPlayer();
  }

  streamVideo(video, format) {
    console.log("🎬 Starting Video Streaming...");
    this.decoder.decode(video);
    this.transcoder.transcode(video, format);
    this.player.play(video);
    console.log("✅ Streaming Started!");
  }
}

// 🎯 Client Code
const videoStreaming = new VideoStreamingFacade();
videoStreaming.streamVideo("anime.mp4", "HLS");

new Vue({
  el: '#app',
  data: {
    currentView: 'reels',
    stream: null
  },
  methods: {
    // 1. Request camera access
    async requestCameraAccess() {
      if (this.stream) {
        this.stopCamera();
      }
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        
        const videoElement = this.$refs.cameraFeed;
        videoElement.srcObject = mediaStream;
        
        this.stream = mediaStream;
        console.log("Camera access granted.");

      } catch (err) {
        console.error("Error accessing camera:", err);
        alert("Failed to access camera. Check permissions.");
      }
    },
    
    // 2. Take photo and prepare for publication
    takePhoto() {
      if (!this.stream) {
        alert("Open the camera first!");
        return;
      }
      
      const video = this.$refs.cameraFeed;
      const canvas = this.$refs.photoCanvas;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const photoDataUrl = canvas.toDataURL('image/png');
      
      // The photoDataUrl variable contains your image data.
      console.log("Photo ready for upload (Data URL):", photoDataUrl.substring(0, 50) + "...");
      alert("Photo taken! You can now 'command' to send it to the server.");
      
      this.stopCamera();
    },

    // Stop camera stream
    stopCamera() {
       if (this.stream) {
          this.stream.getTracks().forEach(track => track.stop());
          this.stream = null;
          this.$refs.cameraFeed.srcObject = null;
       }
    }
  }
});
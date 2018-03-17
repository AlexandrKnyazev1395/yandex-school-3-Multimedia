function playCameraStream(video, stream, videoOptions) {
  // добавляем поток в видео
  video.src = window.URL.createObjectURL(stream);
  // проигрываем видео
  video.autoPlay = true;
  //video.play();
  if(videoOptions.isMuted) {
    video.muted = true;
  }
}

export default playCameraStream;

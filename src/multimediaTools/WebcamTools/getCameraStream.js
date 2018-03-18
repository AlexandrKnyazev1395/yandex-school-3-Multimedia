function getCameraStream() {
  //проверяем, если браузер поддерживает возможность работы с mediaDevices
  if (navigator.mediaDevices.getUserMedia) {
    //запрашиваем разрешение на видео
    const constraints = {
      audio: true,
      video: {
        facingMode: "user"
      }
    }
    //возвращается Promise
    return navigator.mediaDevices.getUserMedia(constraints);
  }
}

export default getCameraStream;
function getCameraStream() {
  //проверяем, если браузер поддерживает возможность работы с mediaDevices
  if (navigator.mediaDevices.getUserMedia) {
    //запрашиваем разрешение на видео
    const constraints = {
      audio: {
        /*"mandatory": {
          "googEchoCancellation": "false",
          "googAutoGainControl": "false",
          "googNoiseSuppression": "false",
          "googHighpassFilter": "false"
        },*/
      },
      video: {
        /*width: { min: 800, ideal: 800, max: 800 },
        height: { min: 600, ideal: 600, max: 600 },*/
        facingMode: "user"
      }
    }
    //возвращается Promise
    return navigator.mediaDevices.getUserMedia(constraints);
  }
}

export default getCameraStream;
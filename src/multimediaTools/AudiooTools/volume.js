//https://dzone.com/articles/exploring-html5-web-audio

export default function (audioContext) {

  const analyser = audioContext.createAnalyser();
  analyser.smoothingTimeConstant = 0.3; //параметр, который делает разброс значений меньше
  analyser.fftSize = 512; //размер аудио-фрагмента (сэмпла)
  //js-узел, прослушивающий аудиоконтекст. вызываетеся, когда проанализированы 2058 фреймов
  const processor = audioContext.createScriptProcessor(2048)
  
  processor.onaudioprocess = function (event) {
    // get the average, bincount is fftsize / 2
    var array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);

    var average = getAverageVolume(array);
    function getAverageVolume(array) {
      console.log(array)
      var values = 0;
      var average;

      var length = array.length;

      // get all the frequency amplitudes
      for (var i = 0; i < length; i++) {
        values += array[i];
      }
      average = values / length;
      return average;
    }
    /*
    // clear the current state
    ctx.clearRect(0, 0, 60, 130);

    // set the fill style
    ctx.fillStyle = gradient;

    // create the meters
    ctx.fillRect(0, 130 - average, 25, 130);*/
  }
  processor.connect(audioContext.destination);
}
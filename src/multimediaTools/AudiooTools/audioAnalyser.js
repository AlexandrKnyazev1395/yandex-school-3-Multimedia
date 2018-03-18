/*
	этот анализатор построен на основе скрипта из 
	https://github.com/cwilso/volume-meter
*/

function audioAnalyser(audioContext, averaging) {
	let bufLength = 256;
	let processor = audioContext.createScriptProcessor(bufLength);
	processor.onaudioprocess = volumeAudioProcess;
	processor.volume = 0;
	processor.frequencyData = [];
	processor.averaging = averaging || 0.45; //насколько сглаживать громкость со временем
	processor.connect(audioContext.destination);
	return processor;

	function volumeAudioProcess(event) {
		let buf = event.inputBuffer.getChannelData(0); //массив частот размера bufLength
		let sum = 0; //сумма квадратов фрагментов частот(сэмплов)
		let frequencyData = [];
		for (var i = 0; i < bufLength; i++) {
			let x = buf[i];
			frequencyData.push(x)
			sum += x * x;
		}
		// считаем среднеквадратичное
		let RMS = Math.sqrt(sum / bufLength);
		this.volume = Math.max(RMS, this.volume * this.averaging);
		this.frequencyData = frequencyData;
	}
}



export default audioAnalyser;
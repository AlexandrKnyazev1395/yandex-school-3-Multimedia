import React, { Component } from 'react';

import AudioFrequency from './AudioFrequency';
import AudioVolume from './AudioVolume';

import AudioTools from '../../multimediaTools/AudiooTools';

import './index.css';

import audio1 from '../../assets/audio/1.mp3'

const SONGS = {
  1: audio1
}

export default class AudioPanel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      songMode: false,
      audioVolume: 0,
      frequencyData: [],
      currentAudioContext: null,
      rafID: null
    }
    this.processSong = this.processSong.bind(this);
    this.processStreamVoice = this.processStreamVoice.bind(this);
    this.analyseAudio = this.analyseAudio.bind(this);
    this.addHeadphonesSwitcher = this.addHeadphonesSwitcher.bind(this);
    this.addHeadphonesSwitcher();
  }

  addHeadphonesSwitcher() {
    document.addEventListener('keydown', (e) => {
      if (this.state.currentAudioContext) {
        this.state.currentAudioContext.close();
      }
      if (this.state.rafID) {
        cancelAnimationFrame(this.state.rafID)
      }

      if (e.keyCode === 72) {
        this.setState({
          songMode: !this.state.songMode,
          currentAudioContext: null
        })
      }
    })
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { songMode, currentAudioContext } = this.state;
    const { webcamStream } = this.props;
    if (!currentAudioContext) {
      //если не включен режим песни
      if (!songMode) {
        this.processStreamVoice(webcamStream);
        this.props.makeActionByAudio('setWebcam');
      }
      else if (songMode) {
        this.processSong();
        this.props.makeActionByAudio('setSong');
      }
    }
  }

  processStreamVoice(webcamStream) {
    const audioContext = new AudioContext();
    var mediaStreamSource = audioContext.createMediaStreamSource(webcamStream);
    this.analyseAudio(audioContext, mediaStreamSource);

    this.setState({
      currentAudioContext: audioContext
    })
  }

  processSong() {
    const audio = document.createElement('audio');
    audio.src = SONGS[1];
    audio.autoplay = true
    const audioContext = new AudioContext();
    var mediaElementSource = audioContext.createMediaElementSource(audio);
    this.analyseAudio(audioContext, mediaElementSource);
    mediaElementSource.connect(audioContext.destination); //play music
    this.setState({
      currentAudioContext: audioContext
    })
  }

  analyseAudio(audioContext, mediaSource) {
    const audioTools = new AudioTools();
    var analyser = audioTools.audioAnalyser(audioContext);
    mediaSource.connect(analyser);
    setAudioData.apply(this);
    function setAudioData() {
      this.setState({
        audioVolume: analyser.volume,
        frequencyData: analyser.frequencyData
      })
      const bassLevel = 0.55; //значение получено экспериментально
      if (this.state.songMode && analyser.volume > bassLevel) {
        this.props.makeActionByAudio('bass');
      }
      var rafID = requestAnimationFrame(setAudioData.bind(this));
      this.setState({
        rafID
      })
    };
  }

  render() {
    return (
      <div className="AudioPanel">
        <AudioVolume audioVolume={this.state.audioVolume} />
        <AudioFrequency frequencyData={this.state.frequencyData} />
      </div>
    )
  }
}

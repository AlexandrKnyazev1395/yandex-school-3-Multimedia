import React, { Component } from 'react';

import ScaleItem from './ScaleItem';

import AudioTools from '../../multimediaTools/AudiooTools';

import './index.css';

import audio1 from '../../assets/audio/1.mp3'
import audio2 from '../../assets/audio/2.mp3'

const SONGS = {
  1: audio1,
  2: audio2
}

export default class AudioPanel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      songMode: false,
      audioVolume: 0,
      currentAudioContext: null,
      rafID: null
    }
    this.processSong = this.processSong.bind(this);
    this.processStreamVoice = this.processStreamVoice.bind(this);
    this.lookForVolume = this.lookForVolume.bind(this);
    this.addHeadphonesSwitcher = this.addHeadphonesSwitcher.bind(this);
    this.addHeadphonesSwitcher();
  }

  addHeadphonesSwitcher() {
    document.addEventListener('keydown', (e) => {
      if(this.state.currentAudioContext) {
        this.state.currentAudioContext.close();
      }
      if(this.state.rafID) {
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
    this.lookForVolume(audioContext, mediaStreamSource);

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
    this.lookForVolume(audioContext, mediaElementSource);
    mediaElementSource.connect(audioContext.destination); //play music
    this.setState({
      currentAudioContext: audioContext
    })
  }

  lookForVolume(audioContext, mediaSource) {
    const audioTools = new AudioTools();
    var meter = audioTools.volumeMeter(audioContext);
    mediaSource.connect(meter);
    setAudioVolume.apply(this);

    function setAudioVolume(time) {
      this.setState({
        audioVolume: meter.volume
      })
      const bassLevel = 0.55;
      if (meter.volume > bassLevel) {
        this.props.makeActionByAudio('bass');
      }
      var rafID = requestAnimationFrame(setAudioVolume.bind(this));
      this.setState({
        rafID
      })
    };
  }

  makeAudioScaleItems(audioVolume) {
    const scaleItems = [];
    const amountScaleItems = 15; //количество элементов на шкале громкости
    const levelModificator = 1.3; //для большего разброса значений
    const drawingLevel = amountScaleItems * audioVolume * levelModificator; //количество закрашиваемых элементов на шкале
    for (let i = 0; i < amountScaleItems; i++) {
      const isLoaded = i <= drawingLevel;
      scaleItems.push(
        <ScaleItem
          key={"scale" + i}
          heightPercent={100 / amountScaleItems}
          isLoaded={isLoaded}
        />)
    }
    return scaleItems;
  }

  render() {
    const audioScaleElements = this.makeAudioScaleItems(this.state.audioVolume);
    return (
      <div className="AudioPanel">
        {audioScaleElements}
      </div>
    )
  }
}

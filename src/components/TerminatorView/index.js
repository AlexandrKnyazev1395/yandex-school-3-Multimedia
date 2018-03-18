import React, { Component } from 'react';

import InfoPanel from '../InfoPanel';
import WebcamView from '../WebcamView';
import AudioPanel from '../AudioPanel';

import './index.css'

export default class TerminatorView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      webcamStream: null,
      webcamViewOptions: {
        backgroundColor: 'rgb(211, 80, 80)',
        isDanceWebcam: false
      },
      infoPanelOptions: {
        isDanceContent: false
      }
    }
    this.getWebcamStream = this.getWebcamStream.bind(this);
    this.makeActionByAudio = this.makeActionByAudio.bind(this);
  }

  getWebcamStream(webcamStream) {
    this.setState({
      webcamStream: webcamStream
    })
  }

  makeActionByAudio(actionMode) {
    if (actionMode === 'bass') {
      const rgbArray = Array(3).fill().map(() => Math.floor(50 + Math.random() * (220 + 1 - 20)))
      this.setState({
        webcamViewOptions: {
          backgroundColor: `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`,
          isDanceWebcam: true
        },
        infoPanelOptions: {
          isDanceContent: true
        }
      })
    }
    else if (actionMode === 'setWebcam') {
      this.setState({
        webcamViewOptions: {
          backgroundColor: 'rgb(211, 80, 80)',
          isDanceWebcam: false
        },
        infoPanelOptions: {
          isDanceContent: false
        }
      })
    }
    else if (actionMode === 'setSong') {
      this.setState({
        webcamViewOptions: {
          backgroundColor: 'rgb(228, 98, 189)',
          isDanceWebcam: false
        },
        infoPanelOptions: {
          isDanceContent: false
        }
      })
    }
  }

  render() {
    const { infoPanelOptions, webcamViewOptions, webcamStream } = this.state;
    return (
      <div className="TerminatorView">
        <InfoPanel infoPanelOptions={infoPanelOptions} />
        <WebcamView
          getWebcamStream={this.getWebcamStream}
          webcamViewOptions={webcamViewOptions}
        />
        <AudioPanel
          webcamStream={webcamStream}
          makeActionByAudio={this.makeActionByAudio}
        />
      </div>
    )
  }
}

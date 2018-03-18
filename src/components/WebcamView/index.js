import React, { Component } from 'react'
import classNames from 'classnames'

import GlassesClipPath from './GlassesClipPath';

import WebcamTools from '../../multimediaTools/WebcamTools'
import CanvasTools from '../../multimediaTools/CanvasTools'

import './index.css'

export default class WebCamera extends Component {
  constructor(props) {
    super(props);
    this.setCanvasRef = this.setCanvasRef.bind(this);
  }

  setCanvasRef(canvas) {
    const webcamTools = new WebcamTools();
    const canvasTools = new CanvasTools();
    webcamTools.getCameraStream()
      .then((stream) => {
        const video = document.createElement('video');
        const isMuted = true;
        webcamTools.playCameraStream(video, stream, { isMuted });
        webcamTools.videoToCanvas(canvas, video);
        canvasTools.interferenceToCanvas(canvas);
        this.props.getWebcamStream(stream);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    const { webcamViewOptions } = this.props;
    const canvasClasses = classNames({
      'Video-Canvas': true,
      'Video-Canvas_isScaled': webcamViewOptions.isDanceWebcam === true
    })
    return (
      <div className="Video">
        <GlassesClipPath>
          <div
            className="Video-ColorFilter"
            style={{ backgroundColor: webcamViewOptions.backgroundColor }}
          >
            <canvas
              className={canvasClasses}
              width="800px"
              height="600px"
              ref={this.setCanvasRef}
            >
            </canvas>
          </div>
        </GlassesClipPath>
      </div>
    )
  }
}

import React, { Component } from 'react'

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
      //обработчик для случаев, когда используется старый браузер
      //или когда не найдена видео-камера
    })
  }

  render() {
    const { webcamViewOptions } = this.props;
    return (
        <div className="Video">
          <div 
            className="Video-ColorFilter" 
            style={{backgroundColor: webcamViewOptions.backgroundColor}}
          >
            <canvas
                className="Video-Canvas"
                width="800px"
                height="600px"
                ref={this.setCanvasRef}
              >
              </canvas>
          </div>
          <svg style={{ width: 0, height: 0}}>
            <clipPath id="glassesSvg" clipPathUnits="objectBoundingBox">
              <path d="
                M 0 0.2
                C 0 0, 0.5 0, 0.5 0.13
                C 0.5 0, 1 0, 1 0.2
                L 1 0.8
                C 1 1, 0.5 1, 0.5 0.87
                C 0.5 1, 0 1, 0 0.8 
              " />
            </clipPath>
          </svg>
        </div>
    )
  }
}

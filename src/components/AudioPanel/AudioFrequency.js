import React, { Component } from 'react'

import './index.css'

import AudioFrequencyColumn from './AudioFrequencyColumn'

export default class AudioFrequency extends Component {

  makeAudioFrequencySpectrum() {
    const modificatorFrequency = 100;
    const amountOfColumns = 10;
    const { frequencyData } = this.props;
    if(!frequencyData.length) return null

    let columnsData = [];
    const amountdataInColumn = Math.floor(frequencyData.length / amountOfColumns);
    for(let i = 0; i < amountOfColumns; i++) {
      columnsData[i] = 0;
      for(let y = 0; y < amountdataInColumn; y++) {
        columnsData[i] = (columnsData[i] + frequencyData[i+y]) / 2;
      }
    }
    return columnsData.map((el, index) => {
      let value = el * modificatorFrequency;
      return <AudioFrequencyColumn key={index} value={value} />
    })
  }

  render() {
    const audioFrequencySpectrum = this.makeAudioFrequencySpectrum();
    return (
      <div className="AudioPanel-AudioFrequency">
        {audioFrequencySpectrum}
      </div>
    )
  }
}

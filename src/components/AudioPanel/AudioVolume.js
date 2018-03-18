import React from 'react'

import AudioVolumeItem from './AudioVolumeItem'

export default (props) => {
  const { audioVolume } = props;
  function makeAudioScaleItems() {
    const scaleItems = [];
    const amountScaleItems = 15; //количество элементов на шкале громкости
    const levelModificator = 1.3; //для большего разброса значений
    const drawingLevel = amountScaleItems * audioVolume * levelModificator; //количество закрашиваемых элементов на шкале
    for (let i = 0; i < amountScaleItems; i++) {
      const isLoaded = i <= drawingLevel;
      scaleItems.push(
        <AudioVolumeItem
          key={"scale" + i}
          heightPercent={100 / amountScaleItems}
          isLoaded={isLoaded}
        />)
    }
    return scaleItems
  }

  const scaleItems = makeAudioScaleItems()
  return (
    <div className="AudioPanel-Volume"> 
      {scaleItems} 
    </div>
  )
}

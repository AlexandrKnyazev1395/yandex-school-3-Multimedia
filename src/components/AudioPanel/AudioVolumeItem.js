import React from 'react';
import classNames from 'classnames';

export default (props) => {
  const scaleItemClasses = classNames({
    'AudioPanel-ScaleItem': true,
    'AudioPanel-ScaleItem_isLoaded': props.isLoaded
  })
  return (
    <div 
      className={scaleItemClasses} 
      style={{height:  props.heightPercent + '%'}}
    >
    </div>
  )
}


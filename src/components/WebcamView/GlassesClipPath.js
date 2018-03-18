import React from 'react'

export default (props) => {
  return (
      <div>
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
        {props.children}
      </div>
  )
}

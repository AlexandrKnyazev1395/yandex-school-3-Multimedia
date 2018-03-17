import React from 'react'

export default (props) => {
  const { itemData } = props;
  return (
    <li>
      <span>{itemData[0]}</span>
      <span>{itemData[1]}</span>
      <span>{itemData[2]}</span>
    </li>
  )
}

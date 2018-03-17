import React, { Component } from 'react';
import InfoPanelItem from './InfoPanelItem';

import './index.css'


export default class InfoPanel extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      infoPanelData: [],
      amountInfoRows: 10,
      frequencyInfoUpdating: 400 //ms
    }
  }

  componentDidMount() {
    setInterval(function() {
      const randomHex1 = Math.floor(Math.random()*16777215).toString(16);
      const randomHex2 = Math.floor(Math.random()*16777215).toString(16);
      const randomHex3 = Math.floor(Math.random()*16777215).toString(16);
      let newData = this.state.infoPanelData;
      newData.push([randomHex1, randomHex2, randomHex3]);
      if(newData.length === this.state.amountInfoRows) {
        newData.shift();
      }
      this.setState({
        infoPanelData: newData
      })

    }.bind(this), this.state.frequencyInfoUpdating)
  }

  makeInfoPanelList(infoPanelData) {
    const InfoPanelItems = infoPanelData.map((itemData, index) => {
      return (
        <InfoPanelItem itemData={itemData} indexData={index}  />
      )
    });
    return (
      <ul className="InfoPanel-List">
        {InfoPanelItems}
      </ul>
    )
  }

  
  render() {
    const infoPanelList = this.makeInfoPanelList(this.state.infoPanelData);
    return (
      <div className="InfoPanel">
        {infoPanelList}
      </div>
    )
  }
}

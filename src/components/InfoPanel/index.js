import React, { Component } from 'react';
import InfoPanelItem from './InfoPanelItem';

import './index.css'

export default class InfoPanel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      infoPanelData: [],
      amountInfoRows: 11,
      frequencyInfoUpdating: 500, //ms
      currentUpdatingInterval: null
    }
    this.createUpdatingInterval = this.createUpdatingInterval.bind(this);
  }

  componentDidMount() {
    const { infoPanelOptions } = this.props;
    const currentUpdatingInterval = this.createUpdatingInterval(infoPanelOptions.isDanceContent);
    this.setState({
      currentUpdatingInterval
    })
  }

  componentWillReceiveProps = (nextProps) => {
    const isDanceContent = nextProps.infoPanelOptions.isDanceContent;
    const oldIsDanceContent = this.props.infoPanelOptions.isDanceContent;
    if (isDanceContent != oldIsDanceContent) {
      if (this.state.currentUpdatingInterval) {
        clearInterval(this.state.currentUpdatingInterval)
        const currentUpdatingInterval = this.createUpdatingInterval(isDanceContent);
        this.setState({
          currentUpdatingInterval
        })
      }
    }
  }

  createUpdatingInterval(isDanceContent) {
    const frequencyInfoUpdating = isDanceContent ? 80 : 500;
    return setInterval(function () {
      const randomData = this.getRandomData(3, isDanceContent);
      let newData = this.state.infoPanelData;
      newData.push(randomData);
      if (newData.length === this.state.amountInfoRows) {
        newData.shift();
      }
      this.setState({
        infoPanelData: newData,
        frequencyInfoUpdating,
      })
    }.bind(this), frequencyInfoUpdating)
  }

  getRandomData(arrayLength, isDanceContent) {
    let result = [];
    for (let i = 0; i < arrayLength; i++) {
      result.push(Math.floor(Math.random() * 16777215).toString(16))
    }
    return result
  }

  makeInfoPanelList(infoPanelData) {
    const InfoPanelItems = infoPanelData.map((itemData, index) => (
      <InfoPanelItem key={index} itemData={itemData} indexData={index} />
    ))
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

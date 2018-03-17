import React, { Component } from 'react'

import './index.css'

export default class ControlPanel extends Component {
  constructor(props) {
    super(props)
    this.handleHeadphonesClick = this.handleHeadphonesClick.bind(this);
  }
  

  handleHeadphonesClick() {
    let newMode;
    if(this.props.songMode) {
      newMode = false;
    }
    else {
      newMode = 1
    }
    this.props.changeSongMode(newMode);
  }


  render() {
    return (
      <div className="ControlPanel">
        <button onClick={this.handleHeadphonesClick}>
          put {!this.props.songMode ? 'on' : 'off' } headphones
        </button>
      </div>
    )
  }
}

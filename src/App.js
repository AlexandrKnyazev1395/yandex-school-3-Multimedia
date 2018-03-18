import React, { Component } from 'react';
import './App.css';

import TerminatorView from './components/TerminatorView';
import ControlPanel from './components/ControlPanel';

class App extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div className="App">
        <div className="TerminatorPanel">
          <TerminatorView />
          <ControlPanel />
        </div>
      </div>
    );
  }
}

export default App;

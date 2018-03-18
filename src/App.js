import React, { Component } from 'react';
import './App.css';

import TerminatorView from './components/TerminatorView';
import ControlPanel from './components/ControlPanel';

class App extends Component {
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

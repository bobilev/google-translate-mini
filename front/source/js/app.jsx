import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Editor from './Editor/Editor.jsx'
// import { hot } from 'react-hot-loader'

class Main extends Component {
  render() {
    return (
      <div id='main'>
        <Editor />
      </div>
    );
  }
}

ReactDOM.render(<Main />,document.getElementById('app'));

import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  render () {
    return (
      <div>
        <div>Hello World</div>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
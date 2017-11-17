import React from "react";
import { render } from "react-dom";
import {
  HashRouter as Router,
  Route,
  Link
} from "react-router-dom";
import {
  Container,
  Menu,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import ConverterContainer from "./components/ConverterContainer.jsx";
import ExampleContainer from "./components/ExampleContainer.jsx";

// eslint-disable-next-line no-undef
new Clipboard(".btn");

class App extends React.Component {
  render () {
    return (
      <Router>
        <div>
          <Menu fixed="top" inverted>
            <Container>
              <Link to="/">
                <Menu.Item header> 
                  Mahjong Tiles Converter
                </Menu.Item>
              </Link>
              <Link to="/">
                <Menu.Item>ホーム</Menu.Item>
              </Link>
              <Link to="/examples">
                <Menu.Item>使い方</Menu.Item>
              </Link>
            </Container>
          </Menu>
          <Route exact path="/" component={ConverterContainer} />
          <Route path="/examples" component={ExampleContainer} />
        </div>
      </Router>
    );
  }
}

render(<App/>, document.getElementById("app"));
import React from "react";
import { render } from "react-dom";
import {
  Container,
  Menu,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import ConverterContainer from "./components/ConverterContainer.jsx";

// eslint-disable-next-line no-undef
new Clipboard(".btn");

class App extends React.Component {
  render () {
    return (
      <div>
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item as="a" header>
              Mahjong Tiles Converter
            </Menu.Item>
          </Container>
        </Menu>
        <ConverterContainer />
      </div>
    );
  }
}

render(<App/>, document.getElementById("app"));
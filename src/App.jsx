import React from "react";
import { render } from "react-dom";
import {
  HashRouter as Router,
  Route,
  Link
} from "react-router-dom";
import {
  Container,
  Header,
  Menu,
  Modal,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import ConverterContainer from "./components/ConverterContainer.jsx";
import ExampleContainer from "./components/ExampleContainer.jsx";

// eslint-disable-next-line no-undef
new Clipboard(".btn");

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      aboutDialogOpen: false,
    };
  }

  handleAboutDialogOpen = () => {
    this.setState({ aboutDialogOpen: true });
  }

  handleAboutDialogClose = () => {
    this.setState({ aboutDialogOpen: false });
  }

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
              <Menu.Item
                position="right"
                onClick={this.handleAboutDialogOpen}
              >About</Menu.Item>
            </Container>
          </Menu>
          <Route exact path="/" component={ConverterContainer} />
          <Route path="/examples" component={ExampleContainer} />
          <Modal
            open={this.state.aboutDialogOpen}
            onClose={this.handleAboutDialogClose}
          >
            <Modal.Header>About</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Header as="span">Mahjong Tiles Converter </Header><Header as="span" sub>1.0.0-beta.1</Header>
                <p>MIT©2017 <a href="http://ssdh233.me">まつまつ</a></p>
                <Header as="span">Thanks</Header>
                <ul>
                  <li><a href="https://react.semantic-ui.com/introduction">Semantic UI React</a></li>
                  <li><a href="https://pages.github.com/">GitHub Pages</a></li>
                  <li><a href="www.mj-dragon.com">麻雀の雀龍.com</a></li>
                  <li><a href="yabejp.web.fc2.com">現代麻雀技術論</a></li>
                </ul>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </div>
      </Router>
    );
  }
}

render(<App/>, document.getElementById("app"));
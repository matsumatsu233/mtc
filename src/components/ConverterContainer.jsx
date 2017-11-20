import React from "react";
import {
  Button,
  Container,
  Form,
  TextArea,
} from "semantic-ui-react";

import ConvertOptionsForm from "./ConvertOptionsForm.jsx";
import ConvertResult from "./ConvertResult.jsx";
import { convert } from "../core/MahjongTextToHtmlConverter.js";
import { DEFAULT_OPTIONS } from "../constants/constants.js";

class ConverterContainer extends React.Component {
  constructor() {
    super();

    const defaultState = {
      inputText: "",
      result: {
        convertedHtml: "",
        tilesCount: undefined,
      },
      options: DEFAULT_OPTIONS,
    };

    let savedState = this.getStateFromLocalStorage();

    this.state = savedState || defaultState;
  }

  handleConvert = (options) => {
    const convertResult = convert(this.state.inputText, options);
    this.setState({
      result: {
        convertedHtml: convertResult,
      }
    });
  }

  handleChangeInputText = (event) => {
    this.setState({
      inputText: event.target.value,
    });
  }

  handleChangeOptions = (options) => {
    this.setState({ options: options });
    this.handleConvert(options);
  }

  saveStateToLocalStorage = () => {
    localStorage.setItem("ConverterContainerState", JSON.stringify(this.state));
  }

  getStateFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("ConverterContainerState"));
  }

  render() {
    this.saveStateToLocalStorage();

    return (
      <Container style={{ marginTop: 85 }}>
        <Form>
          <TextArea
            autoHeight
            placeholder="牌を入力してください 例: 114s514m19p19z810s"
            value={this.state.inputText}
            style={{
              fontFamily: "Lato,\"Helvetica Neue\",Arial,Helvetica,sans-serif",
              marginBottom: 10,
            }}
            onChange={this.handleChangeInputText}
          />
          <Button
            fluid
            style={{ marginBottom: 15 }}
            onClick={() => this.handleConvert(this.state.options)}
          >
            変換
          </Button>
        </Form>
        <ConvertOptionsForm
          style={this.state.style}
          options={this.state.options}
          handleChangeOptions={this.handleChangeOptions}
        />
        <ConvertResult
          result={this.state.result}
        />
      </Container>
    );
  }
}

export default ConverterContainer;
import React from "react";
import {
  Button,
  Container,
  Form,
  Label,
  TextArea,
} from "semantic-ui-react";

import ConvertOptionsForm from "./ConvertOptionsForm.jsx";
import ConvertResult from "./ConvertResult.jsx";
import { convert, CONVERT_RESULT } from "../core/MahjongTextToHtmlConverter.js";
import { DEFAULT_OPTIONS } from "../constants/constants.js";

class ConverterContainer extends React.Component {
  constructor() {
    super();

    const defaultState = {
      inputText: "",
      parseError: false,
      result: {
        convertedHtml: "",
        tilesCount: undefined,
      },
      options: DEFAULT_OPTIONS,
      resultActiveSegment: "プレビュー",
    };

    let savedState = this.getStateFromLocalStorage();

    this.state = savedState || defaultState;
  }

  handleConvert = (options) => {
    const convertResult = convert(this.state.inputText, options);
    if (convertResult.status === CONVERT_RESULT.PARSE_ERROR) {
      // TODO show error position
      this.setState({ parseError: true });
    } else {
      this.setState({
        result: {
          convertedHtml: convertResult.convertedHtml,
          tilesCount: convertResult.tilesCount,
        }
      });
    }
  }

  handleChangeInputText = (event) => {
    this.setState({
      inputText: event.target.value,
      parseError: false,
    });
  }

  handleChangeOptions = (options) => {
    this.setState({ options: options });
    this.handleConvert(options);
  }

  saveStateToLocalStorage = () => {
    localStorage.setItem("state", JSON.stringify(this.state));
  }

  getStateFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("state"));
  }

  handleSwitchSegment = (e, { name }) => this.setState({ resultActiveSegment: name })

  render() {
    this.saveStateToLocalStorage();

    return (
      <Container style={{ marginTop: 85 }}>
        <Form>
          { this.state.parseError &&
            <Label
              basic
              color='red'
              pointing='below'
              style={{
                position: "absolute",
                top: -37,
              }}
            >フォーマットが間違っています</Label>
          }
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
          resultActiveSegment={this.state.resultActiveSegment}
          handleSwitchSegment={this.handleSwitchSegment}
        />
      </Container>
    );
  }
}

export default ConverterContainer;
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
import { parse } from "../core/MahjongTextParser.js";
import { convert } from "../core/MahjongTilesToHtmlConverter.js";
import { PARSE_RESULT, DEFAULT_OPTIONS } from "../constants/constants.js";

class ConverterContainer extends React.Component {
  constructor() {
    super();

    const defaultState = {
      inputValue: "",
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
    const parseResult = parse(this.state.inputValue);
    if (parseResult.status === PARSE_RESULT.INVALID_INPUT) {
      this.setState({ parseError: true });
    } else {
      const convertedHtml = convert(parseResult.outputSet, options);
      this.setState({
        result: {
          convertedHtml: convertedHtml,
          tilesCount: parseResult.tilesCount,
        }
      });
    }
  }

  handleChangeInputValue = (event) => {
    this.setState({
      inputValue: event.target.value,
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
            value={this.state.inputValue}
            style={{
              fontFamily: "Lato,\"Helvetica Neue\",Arial,Helvetica,sans-serif",
              marginBottom: 10,
            }}
            onChange={this.handleChangeInputValue}
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
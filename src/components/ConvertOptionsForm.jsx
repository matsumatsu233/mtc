import React from "react";
import {
  Form,
  Header,
  Input,
  Label,
  Segment,
} from "semantic-ui-react";

import { STYLES, SIZES } from "../constants/constants.js";

class ConvertOptionsForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      sizeValueError: false,
      sourceOption: "default",
    };
  }

  handleChangeStyle = (event, {value}) => {
    let newOptions = Object.assign({}, this.props.options);
    newOptions.style = value;
    this.props.handleChangeOptions(newOptions);
  }

  handleChangeSizeOption = (event, {value}) => {
    let newOptions = Object.assign({}, this.props.options);
    if (value !== SIZES.custom.name) {
      newOptions.size = SIZES[value].value;
    } 
    newOptions.sizeOption = value;
    this.props.handleChangeOptions(newOptions);
    this.setState({
      sizeValueError: false,
    });
  }

  handleChangeSizeValue = (event) => {
    let newOptions = Object.assign({}, this.props.options);
    newOptions.size = event.target.value;
    this.setState({
      sizeValueError: !isNormalInteger(newOptions.size),
    });
    this.props.handleChangeOptions(newOptions);
  }

  handleChangeSourceOption = (event, {value}) => {
    this.setState({
      sourceOption: value,
    });
  }

  handleChangeSourceCustomValue = (event) => {
    this.setState({ sourceCustomValue: event.target.value });
  }

  render() {
    return (
      <div style={{ marginBottom: 15 }}>
        <Header as='h4' textAlign='left' attached='top'>
          オプション
        </Header>
        <Segment attached>
          <Form>
            <Form.Group inline style={{ height: 38 }}>
              <label style={{ width: 60 }}>スタイル</label>
              <Form.Radio
                label="麻雀の雀龍.com"
                value={STYLES.mjDragon}
                checked={this.props.options.style === STYLES.mjDragon}
                onChange={this.handleChangeStyle}
              />
              <Form.Radio
                label="現代麻雀技術論"
                value={STYLES.mjTactics}
                checked={this.props.options.style === STYLES.mjTactics}
                onChange={this.handleChangeStyle}
              />
            </Form.Group>
            <Form.Group inline>
              <label style={{ width: 60 }}>サイズ</label>
              <Form.Radio
                label="小"
                value={SIZES.small.name}
                checked={this.props.options.sizeOption === SIZES.small.name}
                onChange={this.handleChangeSizeOption}
              />
              <Form.Radio
                label="中"
                value={SIZES.medium.name}
                checked={this.props.options.sizeOption === SIZES.medium.name}
                onChange={this.handleChangeSizeOption}
              />
              <Form.Radio
                label="大"
                value={SIZES.large.name}
                checked={this.props.options.sizeOption === SIZES.large.name}
                onChange={this.handleChangeSizeOption}
              />
              <Form.Radio
                label="カスタム"
                value={SIZES.custom.name}
                checked={this.props.options.sizeOption === SIZES.custom.name}
                onChange={this.handleChangeSizeOption}
              />
              <Input
                disabled={this.props.options.sizeOption !== SIZES.custom.name}
                label={{ basic: true, content: "px" }}
                labelPosition="right"
                placeholder="高さ"
                style={{
                  width: 55,
                  marginRight: 45,
                }}
                value={this.props.options.size}
                onChange={this.handleChangeSizeValue}
              />
              { this.state.sizeValueError &&
                <Label basic color='red' pointing='left'>数字を入力してください</Label>
              }
            </Form.Group>
            <Form.Group inline>
              <label style={{ width: 60 }}>ソース</label>
              <Form.Radio
                label="デフォルト"
                value="default"
                checked={this.state.sourceOption === "default"}
                onChange={this.handleChangeSourceOption}
              />
              <Form.Radio
                disabled
                label="カスタム"
                value="custom"
                checked={this.state.sourceOption === "custom"}
                onChange={this.handleChangeSourceOption}
              />
              <Input
                disabled={this.state.sourceOption !== "custom"}
                style={{ width: 300 }}
                onChange={this.handleChangeSourceCustomValue}
              />
            </Form.Group>
          </Form>
        </Segment>
      </div>
    );
  }
}

function isNormalInteger(str) {
  return /^\+?(0|[1-9]\d*)$/.test(str);
}

export default ConvertOptionsForm;
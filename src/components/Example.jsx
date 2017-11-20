import React from "react";
import {
  Header,
  Input,
  Message,
} from "semantic-ui-react";

import { convert } from "../core/MahjongTextToHtmlConverter.js";
import { DEFAULT_OPTIONS } from "../constants/constants.js";

class Example extends React.Component {

  render() {
    const convertedHtml = convert(this.props.inputText, this.props.options || DEFAULT_OPTIONS);
    return (
      <div style={{ marginBottom: 30 }}>
        <Header as='h3'>
          {this.props.header}
        </Header>
        <Message visible>
          <Input
            fluid
            transparent
            value={this.props.inputText}
          />
        </Message>
        <div dangerouslySetInnerHTML={{ __html: convertedHtml }} />
      </div>
    );
  }
}

export default Example;
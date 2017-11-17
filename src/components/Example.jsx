import React from "react";
import {
  Header,
  Message,
} from "semantic-ui-react";

import { parse } from "../core/MahjongTextParser.js";
import { convert } from "../core/MahjongPaiToHtmlConverter.js";
import { DEFAULT_OPTIONS } from "../constants/constants.js";

class Example extends React.Component {

  render() {
    const parseResult = parse(this.props.inputValue);
    const convertedHtml = convert(parseResult.outputSet, DEFAULT_OPTIONS);
    return (
      <div style={{ marginBottom: 30 }}>
        <Header as='h3' dividing>
          {this.props.header}
        </Header>
        <Message visible>
          {this.props.inputValue}
        </Message>
        <div dangerouslySetInnerHTML={{ __html: convertedHtml }} />
      </div>
    );
  }
}

export default Example;
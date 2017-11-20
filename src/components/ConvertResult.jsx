import React from "react";

import {
  Button,
  Form,
  Menu,
  Segment,
  TextArea,
} from "semantic-ui-react";

import { addCount } from "../core/MahjongTilesCounter";

class ConvertResult extends React.Component {

  constructor(props) {
    super(props);

    const defaultState = {
      activeSegment: "プレビュー",
    };

    let savedState = this.getStateFromLocalStorage();

    this.state = savedState || defaultState;
  }

  saveStateToLocalStorage = () => {
    localStorage.setItem("ConvertResultState", JSON.stringify(this.state));
  }

  getStateFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("ConvertResultState"));
  }

  handleSwitchSegment = (e, { name }) => this.setState({ activeSegment: name });

  handleHtmlTextAreaFocus = (event) => {
    event.target.select();
  }

  render() {
    return (
      <div>
        <Menu attached='top' tabular>
          <Menu.Item
            name='プレビュー'
            active={this.state.activeSegment === "プレビュー"}
            onClick={this.handleSwitchSegment}
          />
          <Menu.Item
            name='HTML'
            active={this.state.activeSegment === "HTML"}
            onClick={this.handleSwitchSegment}
          />
          <Menu.Item position='right'>
            <Button
              className="btn"
              data-clipboard-text={this.props.result.convertedHtml}
            >クリップボードにコピー</Button>
          </Menu.Item>
        </Menu>

        <Segment attached="bottom" style={{ whiteSpace: "pre-line" }}>
          { this.state.activeSegment === "プレビュー" &&
            <div>
              <div
                style={{ lineHeight: "50px" }}
                dangerouslySetInnerHTML={{ __html: 
                  addCount(this.props.result.convertedHtml) || "まだ何もありません"
                }} />
            </div>
          }
          { this.state.activeSegment === "HTML" &&
            <Form>
              <TextArea
                id="converted"
                autoHeight
                value={this.props.result.convertedHtml}
                style={{
                  fontFamily: "Lato,\"Helvetica Neue\",Arial,Helvetica,sans-serif",
                  marginBottom: 10,
                  maxHeight: 300,
                }}
                onFocus={this.handleHtmlTextAreaFocus}
              />
            </Form>
          }
        </Segment>
      </div>
    );
  }
}

export default ConvertResult;
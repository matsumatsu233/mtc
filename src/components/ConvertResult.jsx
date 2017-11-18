import React from "react";

import {
  Button,
  Form,
  Menu,
  Segment,
  TextArea,
} from "semantic-ui-react";

class ConvertResult extends React.Component {

  handleHtmlTextAreaFocus = (event) => {
    event.target.select();
  }

  render() {
    return (
      <div>
        <Menu attached='top' tabular>
          <Menu.Item
            name='プレビュー'
            active={this.props.resultActiveSegment === "プレビュー"}
            onClick={this.props.handleSwitchSegment}
          />
          <Menu.Item
            name='HTML'
            active={this.props.resultActiveSegment === "HTML"}
            onClick={this.props.handleSwitchSegment}
          />
          <Menu.Item position='right'>
            <Button
              className="btn"
              data-clipboard-text={this.props.result.convertedHtml}
            >クリップボードにコピー</Button>
          </Menu.Item>
        </Menu>

        <Segment attached="bottom" textAlign='center'>
          { this.props.resultActiveSegment === "プレビュー" &&
            <div>
              <div dangerouslySetInnerHTML={{ __html: 
                this.props.result.convertedHtml || "まだ何もありません"
              }} />
              {
                this.props.result.tilesCount
                  ? <div>{`(${this.props.result.tilesCount}枚)`}</div>
                  : <div></div>
              }
            </div>
          }
          { this.props.resultActiveSegment === "HTML" &&
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
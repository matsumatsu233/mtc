import React from "react";
import {
  Container,
  Header,
} from "semantic-ui-react";

import Example from "./Example.jsx";

class ExampleContainer extends React.Component {

  render() {
    return (
      <Container style={{ marginTop: 85 }}>
        <Header as='h2' dividing>
          麻雀牌の記述方法
        </Header>
        <Example header="基本" inputValue="7p l7p r7p b7p L77p R77p" />
        <Example header="スペースで既存の牌とツモ牌を区別する" inputValue="1112345678999m 0m" />
        <Example header={"\"|\"で鳴いた牌と鳴いていない牌を区別する"}  inputValue="1123456m 1m | 78r9m 1l11z" />
        <Example header={"\"b\"+数字で牌の裏面を表示する（暗カンした場合）"} inputValue="b222b2p b333b3p 4445p 0p| l1111p" />
        <Example header={"\"L,R\"+数字+数字で重なった横向きの二つの牌を表示する（加カンした場合）"} inputValue="5z 5z | 1L111z 2L222z 3R333z 4R444z" />
      </Container>
    );
  }
}

export default ExampleContainer;
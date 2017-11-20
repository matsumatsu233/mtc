import React from "react";
import {
  Container,
  Header,
} from "semantic-ui-react";

import Example from "./Example.jsx";
import { STYLES } from "../constants/constants.js";

class ExampleContainer extends React.Component {

  render() {
    return (
      <Container style={{ marginTop: 85 }}>
        <Header as='h2' dividing>
          麻雀牌の記述方法
        </Header>
        <Example header="基本" inputText="7p l7p r7p b7p L77p R77p" />
        <Example header="スペースで既存の牌とツモ牌を区別する" inputText="1112345678999m 0m" />
        <Example header="二つ以上のスペースで鳴いた牌と鳴いていない牌を区別する"  inputText="1123456m 1m      78r9m 1l11z" />
        <Example header={"\"b\"+数字で牌の裏面を表示する（暗カンした場合）"} inputText="b222b2p b333b3p 4445p 0p l1111p" />
        <Example header={"\"L,R\"+数字+数字で重なった横向きの二つの牌を表示する（加カンした場合）"} inputText="5z 5z  1L111z 2L222z 3R333z 4R444z" />
        <Header as='h2' dividing>
          文章に埋め込んでいる麻雀牌を変換する
        </Header>
        <Example
          header={""}
          inputText={"ピンフ形でも、12378m33456p3357sのようにリャンメン変化に大差がある場合はカンチャントイツ残しで打7sとする 『現代麻雀技術論』より"}
          options={{
            style: STYLES.mjDragon,
            size: 24,
            hostUrl: "https://raw.githubusercontent.com/matsumatsu233/mtc/master/sources/"
          }}
        />
        <Header as='h3'>
          裏技
        </Header>
        上の『現代麻雀技術論』の文章を選んでコピーすると、以下のようなテキストが得られる。それをまた本ツールを使って変換することができる。
        <Example
          header={""}
          inputText={"ピンフ形でも、1m2m3m7m8m3p3p4p5p6p3s3s5s7sのようにリャンメン変化に大差がある場合はカンチャントイツ残しで打7sとする 『現代麻雀技術論』より"}
          options={{
            style: STYLES.mjTactics,
            size: 24,
            hostUrl: "https://raw.githubusercontent.com/matsumatsu233/mtc/master/sources/"
          }}
        />

      </Container>
    );
  }
}

export default ExampleContainer;
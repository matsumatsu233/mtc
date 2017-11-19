/* eslint-disable no-undef */

import { parse, PARSE_RESULT } from "../core/MahjongTextParser.js";

const basicTiles = "123p";
test(`basic, ${basicTiles}`, () => {
  expect(parse(basicTiles)).toMatchObject({
    status: PARSE_RESULT.SUCCESS,
    outputSet: ["1p", "2p", "3p"],
    tilesCount: 3
  });
});

const prefixTiles1 = "l7p r7p b7p";
test(`prefix 1, ${prefixTiles1}`, () => {
  expect(parse(prefixTiles1)).toMatchObject({
    status: PARSE_RESULT.SUCCESS,
    outputSet: ["l7p", " ", "r7p", " ", "b7p"],
    tilesCount: 3
  });
});

const prefixTiles2 = "L77p R77p";
test(`prefix 2, ${prefixTiles2}`, () => {
  expect(parse(prefixTiles2)).toMatchObject({
    status: PARSE_RESULT.SUCCESS,
    outputSet: ["L7p", " ", "R7p"],
    tilesCount: 4
  });
});

const spaceTiles = "1123456m 1m      78r9m 1l11z";
test(`space and spilter, ${spaceTiles}`, () => {
  expect(parse(spaceTiles)).toMatchObject({
    status: PARSE_RESULT.SUCCESS,
    outputSet: ["1m", "1m", "2m", "3m", "4m", "5m", "6m", " ", "1m", "  ", "7m", "8m", "r9m", " ", "1z", "l1z", "1z"],
    tilesCount: 14
  });
});

const emptyTiles = "";
test(`empty, ${emptyTiles}`, () => {
  expect(parse(emptyTiles)).toMatchObject({
    status: PARSE_RESULT.SUCCESS,
    outputSet: [],
    tilesCount: 0
  });
});

const failedTiles = "123s 56m 7";
test(`parse should fail, ${failedTiles}`, () => {
  expect(parse(failedTiles)).toMatchObject({
    status: PARSE_RESULT.INVALID_INPUT,
  });
});

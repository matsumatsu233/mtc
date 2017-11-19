import { parse, PARSE_RESULT } from "./MahjongTextParser.js";

export const CONVERT_RESULT = {
  SUCCESS: "SUCCESS",
  PARSE_ERROR: "PARSE_ERROR",
};

export function convert(inputText, options) {
  const parseResult = parse(inputText);
  if (parseResult.status === PARSE_RESULT.INVALID_INPUT) {
    // do something
    return {
      status: CONVERT_RESULT.PARSE_ERROR
    };
  } else {
    const convertedHtml = convertParseResultToHtml(parseResult.outputSet, options);
    return {
      status: CONVERT_RESULT.SUCCESS,
      convertedHtml: convertedHtml,
      tilesCount: parseResult.tilesCount,
    };
  }
}

function convertParseResultToHtml(outputSet, options) {
  let url = options.hostUrl + options.style + "/";
  let scale = getScaleFromSize(options.size);
  let outputHtml = "";

  outputSet.forEach((tile) => {
    if (isSpace(tile)) {
      outputHtml += `<span title='test' style='margin-right:${10 * scale}px'>&nbsp;</span>`;
    } else if (isTwoSpaces(tile)) {
      outputHtml += `<span style='margin-right:${30 * scale}px'>&nbsp;&nbsp;</span>`;
    } else if (isKan(tile)) {
      let srcTile = tile[0].toLowerCase() + tile.substring(1);
      outputHtml += `<span style='display: inline-block; height:${60 * scale}px'>`;
      outputHtml += `<img style='display: block' alt='${tile.slice(0,2)}' src='${url + srcTile}.gif' height='${30 * scale}px'>`;
      outputHtml += `<img style='display: block' alt='${tile.slice(1,3)}' src='${url + srcTile}.gif' height='${30 * scale}px'>`;
      outputHtml += "</span>";
    } else if (isRotation(tile)) {
      if (tile[0] === "b") {
        outputHtml += `<img src='${url}ura.gif' alt='${tile}' height='${40 * scale}px'>`;
      } else {
        outputHtml += `<img src='${url + tile}.gif' alt='${tile}' height='${30 * scale}px'>`;
      }
    } else {
      outputHtml += `<img src='${url + tile}.gif' alt='${tile}' height='${40 * scale}px'>`;
    }
  });

  return outputHtml;
}

function isSpace(tile) {
  return tile === " ";
}

function isTwoSpaces(tile) {
  return tile === "  ";
}

function isKan(tile) {
  return tile[0] === "L" || tile[0] === "R";
}

function isRotation(tile) {
  return tile[0] === "l" || tile[0] === "r" || tile[0] === "b";
}

function getScaleFromSize(size) {
  let standardSize = 40;
  return size / standardSize;
}

export function convert(outputSet, options) {
  let url = options.hostUrl + options.style + "/";
  let scale = getScaleFromSize(options.size);
  let outputHtml = "";

  outputSet.forEach((tile) => {
    if (isSpace(tile)) {
      outputHtml += `<span style='margin-right:${10 * scale}px'></span>`;
    } else if (isSpilter(tile)) {
      outputHtml += `<span style='margin-right:${30 * scale}px'></span>`;
    } else if (isKan(tile)) {
      tile = tile[0].toLowerCase() + tile.substring(1);
      outputHtml += `<span style='display: inline-block; height:${60 * scale}px'>`;
      outputHtml += `<img style='display: block' src='${url + tile}.gif' height='${30 * scale}px'>`;
      outputHtml += `<img style='display: block' src='${url + tile}.gif' height='${30 * scale}px'>`;
      outputHtml += "</span>";
    } else if (isRotation(tile)) {
      if (tile[0] === "b") {
        outputHtml += `<img src='${url + tile}.gif' height='${40 * scale}px'>`;
      } else {
        outputHtml += `<img src='${url + tile}.gif' height='${30 * scale}px'>`;
      }
    } else {
      outputHtml += `<img src='${url + tile}.gif' height='${40 * scale}px'>`;
    }
  });

  return outputHtml;
}

function isSpace(tile) {
  return tile === " ";
}

function isSpilter(tile) {
  return tile === "|";
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

export function convert(outputSet, options) {
  let url = options.hostUrl + options.style + "/";
  let scale = getScaleFromSize(options.size);
  let outputHtml = "";

  outputSet.forEach((pai) => {
    if (isSpace(pai)) {
      outputHtml += "<span style='margin-right:" + (10 * scale) + "px'></span>";
    } else if (isSpilter(pai)) {
      outputHtml += "<span style='margin-right:" + (30 * scale) + "px'></span>";
    } else if (isKan(pai)) {
      pai = pai[0].toLowerCase() + pai.substring(1);
      outputHtml += "<span style='display: inline-block; height: " + (60 * scale) + "px'>";
      outputHtml += "<img style='display: block' src='" + url + pai + ".gif' height='" + (30 * scale) + "px'>";
      outputHtml += "<img style='display: block' src='" + url + pai + ".gif' height='" + (30 * scale) + "px'>";
      outputHtml += "</span>";
    } else if (isRotation(pai)) {
      if (pai[0] === "b") {
        outputHtml += "<img src='" + url + "ura.gif' height='" + (40 * scale) + "px'>";
      } else {
        outputHtml += "<img src='" + url + pai + ".gif' height='" + (30 * scale) + "px'>";
      }
    } else {
      outputHtml += "<img src='" + url + pai + ".gif' height='" + (40 * scale) + "px'>";
    }
  });

  return outputHtml;
}

function isSpace(pai) {
  return pai === " ";
}

function isSpilter(pai) {
  return pai === "|";
}

function isKan(pai) {
  return pai[0] === "L" || pai[0] === "R";
}

function isRotation(pai) {
  return pai[0] === "l" || pai[0] === "r" || pai[0] === "b";
}

function getScaleFromSize(size) {
  let standardSize = 40;
  return size / standardSize;
}

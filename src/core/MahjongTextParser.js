export const PARSE_RESULT = {
  SUCCESS: "SUCCESS",
  INVALID_INPUT: "INVALID_INPUT",
};

export function parse(inputText) {
  //let inputTextBlock = inputText.replace(/\s+/g," ").split("|");
  let inputTextBlock = inputText.replace(/\s{2,}/g,"  ").split("  ");
  let outputSet = [];
  try {
    inputTextBlock.forEach((input) => {
      let inputTextBlock = input.trim();
      let blockParseResult = parseOneBlock(inputTextBlock);
      if (blockParseResult.status === PARSE_RESULT.SUCCESS) {
        outputSet = outputSet.concat(blockParseResult.outputSet);
        outputSet.push("  ");
      } else {
        throw "Invalid input";
      }
    });
  } catch (e) {
    return {
      status: PARSE_RESULT.INVALID_INPUT,
    };
  }
  // remove redundant spliter(two spaces)
  outputSet.pop();

  return {
    status: PARSE_RESULT.SUCCESS,
    outputSet: outputSet,
    tilesCount: getTilesCount(outputSet)
  };
}

function parseOneBlock(inputText) {
  let status = 0;
  let pos = 0;
  let preTiles = {};
  let preTilesStack = [];
  let outputSet = [];
  while (pos < inputText.length) {
    let char = inputText.charAt(pos);
    /*
    console.log("status", status);
    console.log("pos", pos);
    console.log("char", char);
    console.log("preTiles", preTiles);
    console.log("preTilesStack", JSON.stringify(preTilesStack));
    console.log("outputSet", outputSet);
    console.log("-------------");
    */
    switch (status) {
    case 0:
      if (isNumber(char)) {
        preTiles.number = char;
        preTilesStack.push(preTiles);
        preTiles = {};
        status = 1;
        pos++;
      } else if (isSpace(char)) {
        outputSet.push(" ");
        pos++;
        status = 0;
      } else if (isRotation(char)) {
        preTiles.prefix = char;
        pos++;
        status = 2;
      } else if (isKan(char)) {
        preTiles.prefix = char;
        pos++;
        status = 3;
      } else {
        return {
          status: PARSE_RESULT.INVALID_INPUT
        };
      }
      break;
    case 1:
      if (isNumber(char)) {
        preTiles.number = char;
        preTilesStack.push(preTiles);
        preTiles = {};
        status = 1;
        pos++;
      }  else if (isRotation(char)) {
        preTiles = {};
        preTiles.prefix = char;
        pos++;
        status = 2;
      } else if (isKan(char)) {
        preTiles = {};
        preTiles.prefix = char;
        pos++;
        status = 3;
      } else if (isSymbol(char)) {
        let symbol = char;
        try {
          preTilesStack.forEach( (preTiles) => {
            if (isInvalidCombination(preTiles.number, symbol)) {
              throw "Invalide combination";
            }

            let Tiles = preTiles.number + symbol;
            if (preTiles.prefix) {
              Tiles = preTiles.prefix + Tiles;
            }
            outputSet.push(Tiles);
          });
        } catch (e) {
          return {
            status: PARSE_RESULT.INVALID_INPUT
          };
        }
        preTilesStack = [];
        pos++;
        status = 0;
      } else {
        return {
          status: PARSE_RESULT.INVALID_INPUT
        };
      }
      break;
    case 2:
      if (isNumber(char)) {
        preTiles.number = char;
        preTilesStack.push(preTiles);
        preTiles = {};
        status = 1;
        pos++;
      } else {
        return {
          status: PARSE_RESULT.INVALID_INPUT
        };
      }
      break;
    case 3:
      if (isNumber(char) && char === inputText.charAt(pos+1)) {
        preTiles.number = char;
        preTilesStack.push(preTiles);
        preTiles = {};
        status = 1;
        pos += 2;
      } else {
        return {
          status: PARSE_RESULT.INVALID_INPUT
        };
      }
      break;
    default:
      return {
        status: PARSE_RESULT.INVALID_INPUT
      };
    }
  }

  //console.log("outputSet", outputSet);
  // when input text doesn't end with a symbol
  if (preTilesStack.length !== 0) {
    return {
      status: PARSE_RESULT.INVALID_INPUT
    };
  } else {
    return {
      status: PARSE_RESULT.SUCCESS,
      outputSet: outputSet
    };
  }
}

function isNumber(char) {
  return /^[0-9]$/.test(char);
}

function isSpace(char) {
  return char === " ";
}

function isTwoSpaces(string) {
  return string === "  "; 
}

function isRotation(char) {
  return char === "l" || char === "r" || char === "b";
}

function isKan(char) {
  return char === "L" || char ==="R";
}

function isSymbol(char) {
  return (char === "m") || (char === "p") || (char === "s") || (char === "z");
}

function isInvalidCombination(Tiles) {
  return (Tiles === "0z") || (Tiles === "8z") || (Tiles === "9z");
}

function getTilesCount(outputSet) {
  return outputSet.filter((tileStr) => (!isSpace(tileStr) && !isTwoSpaces(tileStr))).length + outputSet.filter((tileStr) => isKan(tileStr[0])).length;
}

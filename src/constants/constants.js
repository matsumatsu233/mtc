export const SIZES = {
  small: {
    name: "small",
    value: "24",
  },
  medium: {
    name: "medium",
    value: "32",
  },
  large: {
    name: "large",
    value: "40",
  },
  custom: {
    name: "custom",
  }
};

export const STYLES = {
  //"mjDragon": "mjDragon",
  "mjDragon": "mj-dragon",
  //"mjTactics": "mjTactics",
  "mjTactics": "mj-tactics",
};

export const PARSE_RESULT = {
  SUCCESS: "SUCCESS",
  INVALID_INPUT: "INVALID_INPUT",
};

export const DEFAULT_OPTIONS = {
  style: STYLES.mjDragon,
  size: 40,
  hostUrl: "https://raw.githubusercontent.com/matsumatsu233/mahjong-pai-converter/master/sources/",
};
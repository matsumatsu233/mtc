const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");

const SOURCE_DIR = path.resolve(__dirname, "src");
const PUBLIC_DIR = path.resolve(__dirname, "bundle");

var config = {
  entry: SOURCE_DIR + "/App.jsx",
  output: {
    path: PUBLIC_DIR,
    filename: "bundle.js"
  },
  module: {
    rules : [
      {
        test : /\.jsx?/,
        include : SOURCE_DIR,
        use : [ "babel-loader", "eslint-loader" ]
      },
      {
        test: /\.css$/,
        use: [ "style-loader", "css-loader" ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000"
      }
    ]
  },
  plugins: [
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
    })
  ],
};

module.exports = config;
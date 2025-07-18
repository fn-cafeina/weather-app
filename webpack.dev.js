/* eslint-disable no-undef */
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    open: true,
    watchFiles: ["./index.html"],
    client: {
      overlay: true,
    },
  },
});

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlInlineScriptPlugin = require("html-inline-script-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    index: "./src/index.js",
    "foo.inline": "./src/foo.inline.js",
    "bar.inline": "./src/bar.inline.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    server: "https",
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "This is an html webpack plugin example with inline scripts.",
      template: "src/index.ejs",
      chunks: ["index", "foo.inline", "bar.inline"],
    }),
    new HtmlInlineScriptPlugin({
      scriptMatchPattern: [/\.inline\.js$/], // matches inline JS files
    }),
  ],
};

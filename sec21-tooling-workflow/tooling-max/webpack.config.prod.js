/* eslint-disable eol-last */
const path = require("path");
// node.js 에 있는 path 패키지 import
const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/app.js",
  output: {
    filename: "app.js", // npm run build:prod로 만든 최적화 파일의 이름을 해쉬이름으로 바꾼다. 꼭[contenthash]라고 써야함
    path: path.resolve(__dirname, "assets", "scripts"),
    // eslint-disable-next-line comma-dangle
    publicPath: "assets/scripts/",
    // eslint-disable-next-line comma-dangle
  },
  devtool: "cheap-source-map",
  plugins: [new CleanPlugin.CleanWebpackPlugin()],
};

// clean-webpack-plugin : npm install --save-dev clean-webpack-plugin 으로 다운받고 사용
// const CleanPlugin = require("clean-webpack-plugin"); 를 추가하고
// plugins: [new CleanPlugin.CleanWebpackPlugin()], 를 output에 변수로 넣고
// npm run build:prod 를 하면 npm build로 만들어진 여러 종류의 js 파일들이 하나로 정리된다.
// 사용되지 않는 파일이 정리되는 것임

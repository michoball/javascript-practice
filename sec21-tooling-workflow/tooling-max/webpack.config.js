/* eslint-disable no-multiple-empty-lines */
/* eslint-disable eol-last */
const path = require("path");
// node.js 에 있는 path 패키지 import
// const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "development", // 개발자 모드로 최적화를 진행하게 한다. 코드를 보기 수월하다.
  entry: "./src/app.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "assets", "scripts"),
    // eslint-disable-next-line comma-dangle
    publicPath: "assets/scripts/", // lazy loading같은 일을 시키면 경로를 헷갈려하는 일이 발생할 수 있어서 js파일의 경로가 어디에 있는지 알려준다.
    // eslint-disable-next-line comma-dangle
  },
  // devtool: "cheap-source-map",
  // devServer: {
  //   port: 9000,
  // },
  // plugins: [new CleanPlugin.CleanWebpackPlugin()],
};

// basic webpack setup이다.
// 여러개로 나눈 js 파일들을 최적화 하는 데 사용한다.
// entry에서 보듯 app.js를 시작으로 다른 파일들을 import를 보면서 다니며 합쳐서 최적화를 진행한다.
// __dirname 은 현재파일의 위치 이고 여기에 /assets경로에 /scripts경로를 가진다는 말
// 이렇게하면 assets/scripts 파일의 위치에 최적화를 한 app.js 파일이 생긴다
// 할 때 package.json 파일에 script 부분에 "build" : "webpack"이라고 써두면
// npm  run build 로 webpack을 실행시킬 수 있다.
// 또 다른 파일들에서 import 로 경로 끝에 .js 를 붙였었는데 이제 그거는 빼야한다.
// 이렇게 해서 만들면 app.js 1.app.js 이렇게 두개의 파일이 생긴다.
// app.js는 모든걸 통합하여 페이지 로딩시 한꺼번에 작동되는 파일이고
// 1.app.js는 lazy loading 으로 ProjextItem.js 파일에 있는
// import("./Tooltip.js").then((module) => {
// const tooltip = new module.Tooltip(
//     () => {
//       this.hasActiveTooltip = false;
//     },
//     tooltipText,
//     this.id
//   );
//   tooltip.attach();
//   this.hasActiveTooltip = true;
// });

// 이부분 때문에 이 코드가 실행 될때 필요한 dependency를 넣어서 작동하도록 만든 최적화 파일이다.

// webpact 으로 최적화를 진행하다보면 entry point에 따를 여러개의 최적화 파일이 생길 수 있다. (큰 프로젝트로 갈수록 더)
//  예를들면 이렇다
// entry: {
//     welcome: './src/welcome-page/welcome.js',
//     about: './src/about-page/about.js',
//     // etc.
// }
// 한 HTML 당 필요한 entry point를 잘 정하면 그에 맞게 entry에 넣기만하면 webpack이 알아서 최적화를 진행해줄테니
// 만일 HTML이 여러개의 script를 공유하거나 script가 필요없다면 위에 규칙을 따지지 않아도 된다.

// You can learn more about multiple entry points with these two resources:
// Code Splitting (i.e. generating more than one bundle): https://webpack.js.org/guides/code-splitting/
// Entry Point Configuration: https://webpack.js.org/concepts/#entry
// And in general, check out the official Webpack docs to dive into it in detail: https://webpack.js.org/guides/

// webpack-dev-server serve나 live-server 같은기능을 내는 webpack
// 로컬호스트 8080에 접속하게 한다.
// package.json에 "script"에  "build:dev": "webpack-dev-server"를 추가하면 사용할 수 있다.
// 앞에 "build:dev"는 다르게 만들어도 가능하다.
// 만든 명령어로 npm run 을 하면 된다.
// 물론 npm install --save-dev webpack-dev-server로 다운을 받고나서 해야만한다.

// 웹팩은 react를 npx create-react-app으로 받아서 사용할 경우 기본적으로 같이 받아져서 온다
// 즉 react로 npm start를 하는 것이 npm run build:dev로 devserver를 동작하는 것이고
// npm build가 npm run build로 최적화 파일을 만드는 행위인 것
// 리액트에서 배포를 위한 빌드 행위가 어떤일을 하는 것인지 웹팩을 통해서 알아봤다.
// 살짝 복잡하다

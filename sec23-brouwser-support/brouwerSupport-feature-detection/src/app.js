const button = document.querySelector("button");
const textParagraph = document.querySelector("p");

button.addEventListener("click", () => {
  const text = textParagraph.textContent;
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    alert("Feature not available, please copy manually!");
  }
});

// 만드는 페이지에 원하는 기능을 브라우져가 지원하는지 않아는지에 따라서 동작을 조절하려면
// feature Detection을 사용한다.
// 위 처럼 예를 들어서 클립보드 기능을 지원하지 않는 브라우져에 대해서는
// if 체크를 해서 알람이 뜨도록 조절하여 코드를 짠다.

// Polyfill

// 이용을 원하는 브라우져가 지원하지 않는 기능을 사용할 수 있도록 만들어주는 도구
// https://github.com/github/fetch 에서 fetch api를 예시로 살펴볼 수 있다.
// https://caniuse.com/ 에서 원하는 기능을 검색후 resources 에 가면 polyfill을 확인할 수 있다.

// babel

// Polyfill 처럼 ES6에서 나온 새로운 문법을 지원하지 않는 브라우져가
// 이해할 수 있는 문법으로 변환해서 build를 해주는 컴파일러이다.
// npm install --save-dev babel-loader @babel/core @babel/preset-env로 필요한 페키지를 다운 받는다
// webpack에 다음을 추가한다. 이는 babel-loader가 하는 부분이고, webpack에서
// 어떻게 module을 다뤄야하는 지에 대한 규칙을 작성한 것이다.

// module: {
//     rules: [ // 규칙이 쓰이는 부분
//       {
//         test: /\.m?js$/,
// 파일을 어떤 이름으로 변환할 지에 대한 규칙 정규표현식이고 mjs, js로 끝나는 파일로 변환한다.
//         exclude: /(node_modules)/,

//         use: {
//           loader: "babel-loader",
//           options: {
//             presets: [["@babel/preset-env", { targets: "defaults" }]],
//           },
//         },
//       },
//     ],
//   },

// package.json 에 "browserslist": "> 0.2%, not dead", 를 추가한다.
// https://babeljs.io/docs/en/babel-preset-env 를 보면 "browserslist" 이외에 어떤것을 추가할 수 잇는지 나온다
// "> 0.2%" 는 브라우져 시장에서 0.2% 이상 사용하는 문법을 기준으로 한다는 의미
// 즉 숫자가 낮아질수록 예전에 사용한 문법을 사용해야한다는 뜻

//core-js, regenerator-runtime
//core-js, regenerator-runtime -> 그냥 babel의 트랜스파일링만으로는 해결하기 힘든
// 문법들 때문에 필요한 별도의 polyfill 들

//core-js, regenerator-runtime 을 다운받고 webpack에 preset 부분에
//  { useBuiltIns: "usage", corejs: { version: 3 } }, 를 포함시키면
// 바벨이 나의 코드를 확인해서 promise와 같은 문법이 있으면
// 이용하고자 하는 브라우져의 상태에 맞게 지원가능한 상태로 변환하는 기능을 가지고 있다.

// core-js는 ES6 문법들 promises, symbols, collections, iterators, typed arrays, many other features
// 같은 것들을 어떤 브라우져에서든 사용 가능하게 해주는 라이브러리이다.
// 위 처럼 webpack의 preset부분에 위처럼 추가해주지 않으면 js파일에 직접 import를 해야하고
// 모든 문법을 사용할 수 있도록 다 빌드에 넣기 때문에 빋드된 js파일의 용량의 크게 만든다.

// useBuiltIns는 preset-env의 ployfill 삽입 방식을 설정하는 부분
//  usage, entry, false를 줄 수 있고 기본 값은  false
//  false가 아니면 core-js를 어떻게 import 할 지를 정할 수 있다.

// entry는 core-js/stable과 regenerator-runtime/runtime 모듈을 전역 스코프에 직접 삽입한 경우에만 가능
// 해당 설정은 전체 core-js import를 corejs 하위 특정 모듈들의 import으로 변경시켜,
// 타깃 환경에 필요한 폴리필만 전역 스코프에 추가되도록 합니다.

// usage 설정은 실제 사용한 폴리필만 삽입함
//import 문 변경이 아닌 삽입이므로 core-js/stable과 regenerator-runtime/runtime 모듈을 전역 스코프에 삽입하지 않아도 됨

// import * as _ from "loadsh"; // webpack에 loadsh 받아서 사용하기
// npm install --save loadsh 하고 위 처럼 import 해서 사용하면
// webpack이 이 라이브러리가 있는지 확인하고 사용할 수 있게 해준다.

import { ProjectList } from "./App/ProjectList.js";

// console.log(_.difference([0, 1], [1, 2]));

class App {
  static init() {
    const activeProjectsList = new ProjectList("active");
    const finishedProjectsList = new ProjectList("finished");
    activeProjectsList.setSwitchHandlerFunction(
      finishedProjectsList.addProject.bind(finishedProjectsList)
    );
    finishedProjectsList.setSwitchHandlerFunction(
      activeProjectsList.addProject.bind(activeProjectsList)
    );
  }

  static startAnalytics() {
    const analyticsScript = document.createElement("script");
    analyticsScript.src = "assets/scripts/Utility/Analytics.js";
    analyticsScript.defer = true;
    document.head.append(analyticsScript);
  }
}

App.init();

// https://webpack.js.org/ --> npm install webpack webpack-cli --save-dev

// ESLint = 잘 정리된 코드을 작성하기 위해서 사용하는 툴
// 어떤 라이브러리를 쓰는지 어떤 형식에 맞춰서 코드를 작성할 지 선택하고 다운받으면
// 새롭게 에러가 있는 곳이 뜨게 되고 eslintrc.json 같은 파일에서
// 에러가 난 원인이 되는 내용을 켜고 끄면서 사용한다
// https://eslint.org/ --> npm install eslint --save-dev  -->  npm init @eslint/config

import { ProjectList } from "./App/ProjectList.js";

//const DEFAULT_VALUE = "MAX";
// 위 const 를 다른 파일에서 console을 찍으면 찍힐까?
// 아니다. 파일 내에서 쓰인 변수는 그 안에서만 사용이 가능하다.
// 하지만 window와 같은 전역 변수는 어디서든 쓰임이 가능하다. 그래서 window에 위 변수를 집어넣으면
// window.DEFAULT_VALUE = "MAX"; 처럼하면 projectList.js에서 전역으로 바로 쓸 수는 없지만 (페이지가 render 될 때 import 된 파일들이 먼저 한 번씩 실해되기 때문)
// projectList.js의 함수안에 넣어서 쓰면 실행 가능하다.

//아니면 globalThis.DEFAULT_VALUE = "MAX";로 대체 사용이 가능하다.
// globalThis는 어디서든 전역 변수를 가리키는 것을 보장한다.

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

export function doSomething() {}

export default class Component {
  // default 로 내보내면 import 하는 쪽에서는 이름을 인식하지 못한다.
  // default 로 내보낸 것은 import anyName from "~경로" 로 import 하면
  // anyName으로 사용할 수 있다.
  // default로 내보낸 파일에서 다른 function을 가져오고 싶으면
  // import anyName, {doSomehting} from "~경로" 로 옆에 붙여서 가져오면 된다.

  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = insertBefore;
  }

  detach() {
    if (this.element) {
      this.element.remove();
      // this.element.parentElement.removeChild(this.element);
    }
  }

  attach() {
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? "afterbegin" : "beforeend",
      this.element
    );
  }
}

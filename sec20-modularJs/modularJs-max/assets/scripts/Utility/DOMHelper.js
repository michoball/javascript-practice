console.log("DOM Helper executing");
// 위 코드는 index.html이 처음 화면에 뜰 때 실행될까?
// 그렇다. 모듈안에있는 모든 코드는 페이지에 받아질 때 1번 실행이 된다.(그 이후에는 실행 안됨)
// 동적으로 받아오는 코드의 경우는 그 코드가 실행될 때 받아오면서 1번 실행하게 된다.

export class DOMHelper {
  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }

  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);
    element.scrollIntoView({ behavior: "smooth" });
  }
}

export function clearEventListeners(element) {
  const clonedElement = element.cloneNode(true);
  element.replaceWith(clonedElement);
  return clonedElement;
}

export function moveElement(elementId, newDestinationSelector) {
  const element = document.getElementById(elementId);
  const destinationElement = document.querySelector(newDestinationSelector);
  destinationElement.append(element);
  element.scrollIntoView({ behavior: "smooth" });
}

// class를 export 하는데 class 밖의 function도 export 가능하다.
// 뭐든 export 할 수 있는데 import 하는 곳에서 import 를 다른 방식으로 해야한다.
// import { class명 } from ~ 으로 class명이 오는게 아니라 함수 명이 와야한다.
// 그래야 export 한 함수를 쓸 수 잇다.

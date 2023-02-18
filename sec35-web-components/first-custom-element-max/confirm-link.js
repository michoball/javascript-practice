class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener("click", (event) => {
      if (!confirm("Do you really want to leave?")) {
        event.preventDefault();
      }
    });
  }
}

customElements.define("uc-confirm-link", ConfirmLink, { extends: "a" });

// -------- //////////////////////////////////////////////////////////////////////////////// --------  //
//
//  Extending bulit-in Elements
//   HTMLAnchorElement
//
//   기존에 tooltip.js 에서 봤던 것처럼 HTMLElement를 extends 한 경우는 그냥 바로
//   html 코드에서 바로 정의한 이름을 태그로 쓸 수 있었지만
//   여기처럼 특정한 태그의 역할에 얻혀서 어떤 custom component를 만들고 싶을 때는
//   뒤에 3번째 dependency로 extends 값을 넣어줘야한다.
//
//  예시)
//  customElements.define("uc-confirm-link", ConfirmLink, { extends: "a" });
//
//  여기서는 a 태그에 확장판으로 쓰겠다는 의미라 보면된다.
//   html 코드에서  a 태그의 속성값 is =""로 정의한 custom component 이름을 보내주면 된다

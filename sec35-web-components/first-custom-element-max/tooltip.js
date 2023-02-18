class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = "Some dummy tooltip text.";
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        div{
          background-color: black;
          color: white;
          position: absolute;
          z-index: 10;
        }
      </style>
      <slot>Some default</slot>
      <span> (?)</span>
      `;
    // const template = document.querySelector("#tooltip-template");
    // this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    if (this.hasAttribute("text")) {
      this._tooltipText = this.getAttribute("text");
    }
    const tooltipIcon = this.shadowRoot.querySelector("span");
    tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));

    this.shadowRoot.appendChild(tooltipIcon);
    this.style.position = "relative";
  }

  _showTooltip() {
    // 언더바(_) 로 시작하는 함수는 클래스 내부에서만 작동한다는 표시이다.
    // private 로 원래 앞에 써주면 되는데 지원하지 않는 브라우져들이 있어서 이렇게 씀
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = this._tooltipText;
    // this._tooltipContainer.style.backgroundColor = "black";
    // this._tooltipContainer.style.color = "white";
    // this._tooltipContainer.style.position = "absolute";
    // this._tooltipContainer.style.zIndex = "10";

    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define("uc-tooltip", Tooltip);

// HTMLElement
// custom component 를 만들기 위해서 꼭 extends 해야하는 인터페이스
// extends 를 했으니 constructor 에 super()를 꼭 해야함

// 마지막에 정의한 custom component를 사용하기 위해서는
//  customElements.define( 1 , 2 ); 를 해서
// 첫번째 요소로 사용할 이름을 -> "일반적으로 만든사람을 나타내는 표시 - 컴포넌트를 나타내는 이름" 으로 만든다.
// 두번째 요소로 컴포넌트의 기능이 들어있는 클래스 명을 넣는다.
//
//
//
//
// -------- //////////////////////////////////////////////////////////////////////////////// --------  //
//
//       connectedCallback()
//
//      일반적으로 클래스를 만들듯이 만들어서 customElements.define()으로 dom과 소통하면
//      처음 만든 태그를 사용할때 한번 실행되고 만다.
//      하지만 connectedCallback() 을 사용하면 요소가 DOM에 추가되는 순간 실행된다.
//                                              |
//                                              |
//                                              |
//                                              |
//                                             \/
//      만약 connectedCallback()를 쓰지 않고 돔 요소를 constructor에서 바로 추가하면
//
//       예시)
//      constructor() {
//       super();
//       const tooltipIcon = document.createElement('span');
//       tooltipIcon.textContent = ' (?)';
//       this.appendChild(tooltipIcon);
//       }
//
//      html 에서 cutom component 를 불러올 때 아직 돔 요소에 들어오지 않은 상태에서
//      이미 코드는 실행이되어 제일 밑에 잇는 appendChild는 어디에 append해야할지 몰라서 에러를 띄운다.
//
//
//
// -------- //////////////////////////////////////////////////////////////////////////////// --------  //
//
//
//
//
// -------- //////////////////////////////////////////////////////////////////////////////// --------  //
//
//   using Attributes on Custom Components
//
// Attribute 속성값은 태그에 어떤 속성값을 주고 싶을때 사용한다.
// 예를 들면 <a> 태그의 href 나 class나  id  <img> 의 src 등등이 있다.
//
// html에서 사용한 속성 값을 가져올 때는 getAttribute method를 쓰는데
// 클래스 전체에서 쓰기위해 constructor에 넣으면 작동이 안된다.
// 이것도 connectedCallback() 함수안에 넣어야 제대로 작동이된다.
//
//
// -------- //////////////////////////////////////////////////////////////////////////////// --------  //
//
//
//
// -------- //////////////////////////////////////////////////////////////////////////////// --------  //
//
// styling Custom Components
//
//  js 코드로 스타일 주는 것처럼 똑같이 스타일을 입히면 되는데
//  위 코드에서 us-tooltip은 div 태그로 만들어져 있기 때문에
//  따로 css 파일에서 전체 div에 스타일을 입히면 자동으로 custom 에도 입혀진다.
//  이럴때 shadow dom 이나 template를 상용해서 문제를 피할 수 있다.
//
//  this.attachShadow({ mode: "open" }); 을 constructor에 추가하면  shadow dom을 사용할 수 있다.
//  여기서 mode는 함수를 open으로 하면 이 js 외부 root에서 shadow dom 에 접근할 수 있도록 열어둔다는 의미
//  close로 해두면 접근이 안됨 close를 쓸일은 거의 없을 것 거진 open 으로 하면 됨
//
//  이렇게 this.attachShadow({ mode: "open" }); 를 하고
//  만든 custom components 를 append할 때 shadowRoot에 다가 appendChild를 한다
//
//
//  예시)
// _hideTooltip() {
//   this.shadowRoot.removeChild(this._tooltipContainer);
// }
// ------- >  아까 mode를 close로 했으면 여기 shadowRoot는 return값이 null이라 append가 안됐을 것
// 위 처럼 shadow dom 에 append 나 remove를 하면
// 작동은 잘 되나 문제가 생긴다.
//
//  내가 만든 <uc-tooltip> </uc-tooltip> 안에 쓴 내용이 모두 사라진다.
//  이를 다시 살리기 위해서는 template를 쓴다.
//  html 쪽에 template 태그로 하나의 청사진을 만들고 id를 넣는다.
//
//
// 예시)
{
  /* <template id="tooltip-template">
       <span> (?)</span>
       </template> */
}
//
//

//  그리고 constructor에 등록을 한다.
//   const template = document.querySelector('#tooltip-template')
//   등록한 template를 shadowRoot에 append 하는데 template 태그에 쓴 모든 태그들을 포함에서 다 가져오려면
//  cloneNide에  true 값을 보낸다.
//  this.shadowRoot.appendChild(template.content.cloneNode(true))
//  false면 template안의 최상위 자식노드만 복제된다.
//  이렇게 하면 외부 스타일링에 관계없이 사용이 가능해지지만
//  아직 태그 안에 넣을 글자를 볼 수 없는 것을 변함 없음
//
//  이때 <slot> 을 쓴다. <slot></slot> 을 넣은 부분은 이제 content가 들어갈 수 있는 공간이 된다
//  <slot> 안에는 기본 content를 넣을 수도 있는데 <slot>의 여는태그와 닫는 태그 사이에 원하는 기본값을 넣어주면 된다.
//  그럼 값이 없는 곳에 그 content를 보여준다.
//
//  template 안에 쓴 예시)
//
// <template id="tooltip-template">
// <slot>Some default</slot><span> (?)</span>
// </template>
//
//
// -------- //////////////////////////////////////////////////////////////////////////////// --------  //
//
//
//
//
// -------- //////////////////////////////////////////////////////////////////////////////// --------  //
//
//
//    Defining Template  in JS
//
//   html 코드 안에 Template 태그를 쓰지않고 재사용이 용이하게 JS 안에 코드를 짜는 법
//
//   Template 태그를 만들지 않고 shadowRoot에 innerHTML로 ``을 써서
//   template 태그안에 들어갈 내용만 집어 넣는다.
//
//   예시)
//   this.shadowRoot.innerHTML = `
//   <slot>Some default</slot>
//   <span> (?)</span>
//   `;
//    appendChild와 다르게 얘는 constructor에 넣어도 되는데 이유는
//   얘는 안에 들어갈 준비만하고 있다가 실제로 불렸을 때만 dom 안으로 가기 때문에
//   상관이 없는 것이다.
//
//  스타일도 this.shadowRoot.innerHTML = `` 안에 넣어주면 됨
//   <style>
//     div{
//       background-color: black;
//       color: white;
//       position: absolute;
//       z-index: 10;
//     }
//   </style>
//
//  div로 스타일을 넣어도 shadow dom 에 스타일을 넣을 거라 외부 css에서 스타일을 넣은것과 중복되지 않는다.
//

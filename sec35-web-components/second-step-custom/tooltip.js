class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipIcon;
    this._tooltipVisible = false;
    this._tooltipText = "Some dummy tooltip text.";
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        div{
          font-weight: normal;
          background-color: black;
          color: white;
          position: absolute;
          top: 1.5rem;
          left: 0.75rem;
          z-index: 10;
          padding: 0.15rem;
          border-radius: 3px;
          box-shadow: 1px 1px 6px rgba(0,0,0,0.6);
        }
        :host{
          position: relative;
        }

        :host(.important) {
          background: var(--color-primary, #ccc); 
          padding: 0.15rem
        }

        :host-context(p){
          font-weight: bold;
        }

        .highlight {
          background-color: red;
        }

        ::slotted(.highlight){
          border-bottom: 3px dotted red;
        }

        .icon{
          background: black;
          color: white;
          padding: 0.15rem 0.5rem;
          text-align: center;
          border-radius: 50%;
        }
      </style>
      <slot>Some default</slot>
      <span class="icon">?</span>

    
      `;
  }

  connectedCallback() {
    if (this.hasAttribute("text")) {
      this._tooltipText = this.getAttribute("text");
    }
    this._tooltipIcon = this.shadowRoot.querySelector("span");
    this._tooltipIcon.addEventListener(
      "mouseenter",
      this._showTooltip.bind(this)
    );
    this._tooltipIcon.addEventListener(
      "mouseleave",
      this._hideTooltip.bind(this)
    );

    this.shadowRoot.appendChild(tooltipIcon);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }
    if (name === "text") {
      this._tooltipText = newValue;
    }
  }

  static get observedAttributes() {
    return ["text"];
  }

  disconnectedCallback() {
    this._tooltipIcon.removeEventListener("mouseenter", this._showTooltip);
    this._tooltipIcon.removeEventListener("mouseleave", this._hideTooltip);
  }

  _render() {
    let _tooltipContainer = this.shadowRoot.querySelector("div");

    if (this._tooltipVisible) {
      _tooltipContainer = document.createElement("div");
      _tooltipContainer.textContent = this._tooltipText;
      this.shadowRoot.appendChild(_tooltipContainer);
    } else {
      if (_tooltipContainer) {
        this.shadowRoot.removeChild(_tooltipContainer);
      }
    }
  }

  _showTooltip() {
    this._tooltipVisible = true;
    this._render();
  }

  _hideTooltip() {
    this._tooltipVisible = false;
    this._render();
  }
}

customElements.define("uc-tooltip", Tooltip);

// ****   --------------------------------------------------------------------------------------------------------------------------  ***** //
//
//   shadow dom의 이해와 스타일링
//
//  위에서 쓴 slot은 shadow dom에 공간을 만들어 content를 들어갈 수 잇게 만들어 준다.
//  그런데 이때 slot 안에 들어간 content는 브라우져 검사를 통해 확인하면
//  실제 slot안에 쓰여있지 않고 shadow dom 밖에 위치하고 있다.  --> shadow dom 이 아니라는 소리
//
//  styling 을 해보면 알 수 있는데 slot 안의 어떤 태그에 style을 입힐 때 shadow dom 안에서 하면
//  전혀 style이 입혀지지 않는 걸 볼 수 잇다.
//
//  그치만 그래도 shadow dom 안에서 styling할 수 있는 방법이 있다.
//  ::slotted() {}을 쓰는 것
//  () 안에는 style을 입히고 싶은 태그명을 쓰면 되는데 nested tag를 선택하는 것은 안된다. [ex) span a]
//  slot안의 모든 태그를 선택하고 싶을 때는   ::slotted(*)로 하면 된다.
//
//  ::slotted(){}로 style을 작성해도  밖에서 똑같은 곳에 스타일을 입히면
//  ::slotted에 작성한거위에  override 된다.
//
//  다른 테그들에 직접 스타일을 입힐 수 잇는 것처럼
//  custom 에도 직접 스타일을 입힐 수 있다 ,  class 와 id 를 사용해도 된다
//
//  custom을 shaode dom에서 스타일링하려면  :host라는 키워드로 작성해야한다.
//  :host에 ()를 열고 안에 host element 여기서는 uc-tooltip 에 있는 class, id, attribute를 넣으면
//  그 속성을 갖는 host element 만 style을 입힐 수 있다.
//
//
//  또다른 방법으로 내 custom component 를 감싸고 있는 태그에 스타일링을 할 수 있다.
//  :host-context() 라고 하고 () 안에 감싸는 태그 명이나 클래스, 아이디 명을 같이 써주면 해당 태그에 스타일링이 가능하다.
//
//
//  css 에서 :root 로 var()로 쓸 요소들을 만들듯이 여기서도 :root 나 html안에 정의한 요소를
//  shadow dom에서 쓸 수 있다.
//   background: var(--color-primary, #ccc);   (,) 를 쓰고 뒤에  #ccc 를 쓴 이유는 만약 --color-primary 가 없으면 쓸 색깔을 넣은것
//
// ****   --------------------------------------------------------------------------------------------------------------------------  ***** //
//
//  attributeChangedCallback()
//
//  attribute 값이 update 되었을 때에 실행되는 콜백함수
//
//  attributeChangedCallback(name, oldValue, newValue) 이렇게 3가지 dependency 가 존재
//  name에 해당하는 attribute의 이전값과 변경 값을 다룬다는 것
//  근데 그냥 쓰면 안되고
//
//   static get observedAttributes() {
//     return ["text"];
//   }
//  로 값이 변하는지 관찰하고 싶은 attribute가 무엇인지 선택해줘야한다.
//  이를 이용해서

//  attributeChangedCallback(name, oldValue, newValue) {
//    if(oldValue === newValue){
//      return;
//    }
//    if(name === 'text'){
//      this._tooltipText = newValue;
//    }
//  }
//  이렇게 코드를 짜면 결국 text 속성값이 변하는 것에 바로 반응하는 코드를 만들 수가 있는 것이다.
//
//
// ****   --------------------------------------------------------------------------------------------------------------------------  ***** //
//
//
//     disconnectedCallback()
//
//   내가 정의한 custom component에서 무언가 제거될 때 반응하는 함수
//
//    disconnectedCallback() {
//      this._tooltipIcon.removeEventListener("mouseenter", this._showTooltip);
//      this._tooltipIcon.removeEventListener("mouseleave", this._hideTooltip);
//    }
//
//    어떤 이유로 이벤트리스너가 포함된 <uc-tooltip> 이 제거될 때 이 이벤트도 함게 제거하도록 하는 것
//
//   실제로는 이벤트리스너 제거 콜백을 하지않아도 메모리 유출이 되지 않는다
//   그리고 bind(this)로 클래스 안에 있는 함수와 연결한게 아니라 따지고보면 같은 함수를 지운것도 아님
//   보여주기 식으로 쓴 코드이나
//   http 요청을 제거하는 것이나 다른 제거 과정이 필요한 곳에는 이런 식으로 쓸 수 있다는 의미
//
//
// ****   --------------------------------------------------------------------------------------------------------------------------  ***** //
//
//
//

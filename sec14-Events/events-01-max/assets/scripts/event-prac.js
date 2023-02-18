const button = document.querySelector("button");

const buttonClickHandler = () => {
  alert("aslefjal;sejf");
};

button.addEventListener("click", buttonClickHandler);

const div = document.querySelector("div");

div.addEventListener("click", (e) => {
  console.log("CLICKED DIV");
  console.log(e);
});

button.addEventListener("click", function (e) {
  e.stopPropagation(); // 이벤트 버블링을 막고 여기 이벤트만 일어나도록 함
  e.stopImmediatePropagation(); // 위와 비슷하나 같은 요소에 여러개의 이벤트를 등록했을때
  console.log("CLICKED BUTTON");
  console.log(e);
  console.log(this);
});

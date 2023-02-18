 const button = document.querySelector("button");
const form = document.querySelector("form");
// button.onclick = function() {
// }

const buttons = document.querySelectorAll("button");

const buttonClickHandler = (e) => {
  //   e.target.disabled = true;
  console.log(e);
};

const anotherButtonClickHandler = () => {
  console.log("This was Clicked!");
};

// button.onclick = buttonClickHandler; //  이건 작동 안됨 이러면
// button.onclick = anotherButtonClickHandler;

const boundFn = buttonClickHandler.bind(this);

// button.addEventListener("click", boundFn);

// setTimeout(() => {
//   button.removeEventListener("click", boundFn);
//   console.log("Button Event is deleted!");
// }, 2000);

// buttons.forEach((btn) => {
//   btn.addEventListener("click", buttonClickHandler);
// });

// let curElementNumber = 0;

// function scrollHandler() {
//   const distanceToBottom = document.body.getBoundingClientRect().bottom;

//   if (distanceToBottom < document.documentElement.clientHeight + 150) {
//     const newDataElement = document.createElement("div");
//     curElementNumber++;
//     newDataElement.innerHTML = `<p>Element ${curElementNumber}</p>`;
//     document.body.append(newDataElement);

//   }
// }

// window.addEventListener("scroll", scrollHandler);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e);
});

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

const listItems = document.querySelectorAll("li");

// listItems.forEach((listItem) => {
//   listItem.addEventListener("click", (e) => {
//     e.target.classList.toggle("highlight");
//   });
// });

const list = document.querySelector("ul");
list.addEventListener("click", (e) => {
  // e.target.classList.toggle("highlight");
  e.target.closest("li").classList.toggle("highlight");
  form.click();
});

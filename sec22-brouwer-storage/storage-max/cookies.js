const storeBtn = document.getElementById("store-btn");
const retrBtn = document.getElementById("retrieve-btn");

storeBtn.addEventListener("click", () => {
  const userId = "u123";
  const user = {
    name: "Max",
    age: 30,
  };
  document.cookie = `uid=${userId}; max-age=2`;
  document.cookie = `user=${JSON.stringify(user)}`;
});

retrBtn.addEventListener("click", () => {
  const cookieData = document.cookie.split(";");
  const data = cookieData.map((i) => {
    return i.trim();
  });
  console.log(data[1].split("=")[1]); // user value를 나타내는 법
});

// 쿠키는 로컬이나 세션과는 다르게 네트워크에 연결이 되어 있어야 데이터를 저장할 수 있다.
// document.cookie로 쿠키에 닿을 수 있다.
// 쿠키를 다룰 때는 key와 value가 string 값으로 다룰 수 있다.
// 따라서 string에 쓸 수 있는 함수를 쓸 수 있다.
// 쿠키가 여러개면 ;로 값이 구분되는데 document.cookie.split(";") 로 값들을 구분해서 배열로 나타낼 수 잇다.
// 세션과 로컬에 비해 다루기 복잡하다.
// 세션은 브라우져가 닫힐때 없어지지만
// 쿠키는 그렇지 않다 브라우져 사용자가 원할 때 제거가 가능한데
// 따로 max-age나 expire로 제거 되는 시간을 코드에서 다룰 수 있다.
// 이렇게 제거되는 시간을 다루면 데이터가 사라지고 다시 생성되는 거라
// 데이터의 위치가 바뀐다. 어쩔때는 원하는 값이 나오지 않을 수 잇다.

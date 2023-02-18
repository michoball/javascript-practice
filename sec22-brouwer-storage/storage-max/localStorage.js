const storeBtn = document.getElementById("store-btn");
const retrBtn = document.getElementById("retrieve-btn");

const userId = "u123";
const user = {
  name: "Max",
  age: 30,
  hobbies: ["Sports", "Copking"],
};

storeBtn.addEventListener("click", () => {
  sessionStorage.setItem("uid", userId);
  localStorage.setItem("user", JSON.stringify(user));
});

retrBtn.addEventListener("click", () => {
  const extractedId = sessionStorage.getItem("uid");
  const extractedUser = JSON.parse(localStorage.getItem("user"));
  console.log(extractedUser);
  if (extractedId) {
    console.log("Got the id - " + extractedId);
  } else {
    console.log("Could not find id.");
  }
});

// 브라우저 스토리지
// 서버에 저장하지 않고 유저가 브라우져를 이용하는 동안 잠시동안만 필요한 데이터들을 모아두는 곳
// 장바구니나 유저 로그인 정보 등등

// 로컬스토리지 세션스토리지 쿠키 indexedDB 가 있는데 이외에도 웹SQL이라고 있는데 이건 안씀

// localStorage  setItem으로 키와 값을 전달해서 브라우져에 저장
// getItem으로 저장된 데이터 중 키값에 맞는 값 불러오기
// object의 경우 JSON.stringify로 변환해서 저장하고 JSON.parse로 해석해서 불러오기

// sessionStorage 도 localStorage와 비슷한방식으로 다룰수 있다.
// 다만 둘의 차이점은 브라우져를 닫고 다시 켰을 때 session은 바로 사라지고
// local을 데이터가 남아있다.

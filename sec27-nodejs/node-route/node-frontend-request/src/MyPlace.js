import { Map } from "./UI/Map";

class LoadedPlace {
  constructor(coordinates, address) {
    new Map(coordinates);
    const headerTitleEl = document.querySelector("header h1");
    headerTitleEl.textContent = address;
  }
}

const url = new URL(location.href);
const queryParams = url.searchParams;
// const coords = {
//   lat: parseFloat(queryParams.get('lat')),
//   lng: +queryParams.get('lng')
// };
// const address = queryParams.get('address');
// url에 있는 params를 가지고 좌표와 주소를 보내지 않을거라 코멘트 처리
const locId = queryParams.get("location");

//selectPlace 로 post 해서 얻은 locId를 가지고 get 메소드로 서버와 통신
fetch("http://localhost:3000/location/" + locId)
  .then((res) => {
    if (res.status === 404) {
      throw new Error("Could not find location!");
    } // 에러 다루기 백엔드 location.js에 써놔서 넣음
    return res.json();
  })
  .then((data) => {
    new LoadedPlace(data.coordinates, data.address);
  }) // 데이터를 받으면 그중 좌표와 주소를 위 class로 보냄
  .catch((err) => {
    alert(err.message);
  });

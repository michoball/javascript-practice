const express = require("express");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const router = express.Router();

const url =
  "mongodb+srv://kang:astronomy1@cluster0.7qv61.mongodb.net/locations?retryWrites=true&w=majority";

const client = new MongoClient(url);

console.log(client);
const locationStorage = {
  locations: [],
};

router.post("/add-location", (req, res, next) => {
  // const id = Math.random();

  client.connect(function (err, client) {
    const db = client.db("locations");

    db.collection("user-locations").insertOne(
      {
        address: req.body.address,
        coords: { lat: req.body.lat, lng: req.body.lng },
      },
      function (err, r) {
        console.log(r);
        res.json({ message: "Stored location", locId: r.insertedId });
      }
    );
  });
  client.close();

  // locationStorage.locations.push({
  //   id: id,
  //   address: req.body.address,
  //   coords: { lat: req.body.lat, lng: req.body.lng },
  // });
  // res.json({ message: "Stored location", locId: id });
});

//주소뒤에 /location을하고 그 뒤에 /:locId 를 함으로써 동적으로 /뒤에 값을 다룰 수 있게 해줌
// react router에서도 쓰임

router.get("/location/:locId", (req, res, next) => {
  //mongodb를 이용한 get request
  const locationId = req.params.locId;
  client.connect(function (err, client) {
    const db = client.db("locations");

    db.collection("user-locations").findOne(
      {
        _id: new mongodb.ObjectId(locationId),
      },
      function (err, doc) {
        if (!doc) {
          return res.status(404).json({ message: "Not found! " });
        }
        res.json({ address: doc.address, coordinates: doc.coords });
      }
    );
  });

  // mongodb 없이 get 요청

  // const locationId = +req.params.locId;
  //   const location = locationStorage.locations.find((loc) => {
  //     return loc.id === locationId;
  //   }); // post 요청으로 locationStorage에 들어간 id 중에서 get요청으로 들어온 locId와 일치하는 object 찾기
  //   if (!location) {
  //     return res.status(404).json({ message: "Not found! " });
  //   }
  //   res.json({ address: location.address, coordinates: location.coords });
  //   // 찾은 object의 address 와 coords값을 address 와 coordinates라는 이름으로 json 값 보내기
});

module.exports = router;

// ** CROS 에러 **
// 위와같은 클라이언트 서버와 통신을 위한 코드를 짜고
// frontend 쪽에서 fetch api로 백 서버를 호출할 때
// 기본적으로 도메인이 다르면 예) 이 코드에서 서버는 로컬호스트3000, 클라이언트는 8080임
// 다른 도메인끼리는 원하는 데이터 자원을 공유할 수 없게 막혀있는게
// CROS  Cross-Origin Resource Sharing 에러  즉 도메인이 다른 서버끼리는 정보공유가 막혀있다.

// 이를 해결하기 위해서는 백엔드 서버에다가 추가로 이 서버와는 통신을 해도 괜찮다는 header를 추가해줘야한다.
// --> app.js 에 해당 코드가 있음

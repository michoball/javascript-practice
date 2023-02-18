const express = require("express");
const bodyParser = require("body-parser");

const locationRoutes = require("./routes/location");

const app = express();

// app.set('view engine', 'ejs');
// app.set('views', 'views');

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Method", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // 위에 코드는 * 즉 어떤 url 에서든 이 서버와의 통신을 허락한다는 뜻이다.
  //  밑에 코드는 근데 통신할때 메소드로 POST와 GET 메소드로하는 통신이 괜찮다고 해줄거임
  // 브라우져가 가끔 자동으로 OPTIONS 요청으로 데이터를 통신할 때가 있다. 그래서 OPTIONS도 넣음
  next();
  // 다음 미들웨어인 route로 진행
});

app.use(locationRoutes);

app.listen(3000);

// app.use((req, res, next) => {
//   res.setHeader('Content-Type', 'text/html');
//   next();
// });

// app.use((req, res, next) => {
//   const userName = req.body.username || 'Unknown User';
//   res.render('index', {
//     user: userName
//   });
// });

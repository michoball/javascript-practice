// 순수 노드js 만으로는 큰 프로젝트의 어플의 백엔드를 담당하기에는 어려움이 있다.
// 코드가 너무 복잡해지고 많아져서 다루기 힘듬
// 그래서 프론트에 프레임워크같은 라이브러리인 리액트가 있듯이
// 노드에도 express라는 프레임워크가 있다.

const express = require("express");
const bodyParser = require("body-parser"); // pure-nodejs에서 buffer로 저장되는 body를 알아서 parsing해주는 라이브러리

//express는 function이다
const app = express();
// express함수 실행

app.set("view engine", "ejs"); // 원래 js에 쓴 코드가 화면에 보여지려면 html코드를 작성해야하는데
// npm install --save ejs 로 다운받은 ejs 라이브러리로 이를 대신하겠다는 뜻
app.set("views", "views"); // 옆에 만든 views 파일 views 셋팅
// 여기서는 파일이름이 views니까 views가 두번째인자로 온것이고 파일이 이름이 다르다면 두번째 인자는 그이름을 따라간다
// 이러면 views 파일에 ejs파일을 만들면 여기에 html코드를 작성해서 쓸 수 잇다.

//express 는 middleware-driven framework다
// 여러개의 middleware 들이 밑에처럼 있고 이들을 이어주며 req와 res를 주고 받게 해주는 역할을 한다는 의미
// 밑에 use 에서 next() 함수를 실행하는 것이 res를 하고 끝내지 않고 다음 middleware의 req를 부르라는 의미이다.
// next() 를 안쓰면 더이상 진행하지 않겠다는 뜻

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Content-Type", "text/html");
  next();
});

app.use((req, res, next) => {
  const userName = req.body.username || "Unknown User";
  res.render("index", {
    user: userName,
  }); // views/index.ejs 를 render 하겠다는 의미
  // 따로 views에 있는 index.ejs라고 안한건 위에 app.set("views", "views") 로 설정을 해놨기 때문
  // 두번째 인자는 index.ejs 파일에 노드와 연동하여 사용할  data를 <%= user %> 이렇게 설정해놨기 때문에
  // user가 여기서 어떤 값을 가르키는지 알려주는 역할을 한다.
});

app.listen(3000);

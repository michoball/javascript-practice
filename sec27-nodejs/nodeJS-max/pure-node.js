const http = require("http");
// http모듈을 불러오기
// http요청과 응답을 할 수 있는 것은 아님
// 보통 서버를 들어오는 요청에 대한 반응을 설정하기위한 용도로 사용
// webpack이나 다른 서버개발용 서버들은 노드로 기본 웹서버에 대한 셋팅이 되어져잇다

// 서버 만들기,  기본적으로 요청과 응답 두가지 인자가 필요하고 그에 따른 결과가 들어간다.
// end() 함수는 말그대로 응답을 끝낸다는 표시
const server = http.createServer((request, response) => {
  let body = [];

  request.on("data", (chunk) => {
    body.push(chunk);
  });
  // on 메소드는 onclick, onsubmit처럼 event리스너 역할을 한다.
  //위는 data에 접근한다는 뜻이고 접근한 data를 chunk라고 했을 때 이것을 위 body에 넣겠다는 뜻이다.
  // 보시다시피 body는 배열이기 때문에 배열을 다루는 메소드인 map, filter 같을걸 사용할 수 있다.
  // data는 버퍼 데이터로 body에 들어간다.

  request.on("end", () => {
    body = Buffer.concat(body).toString();
    console.log(body);
    let userName = "Unknown User";
    if (body && body.split("=")[1].trim().length !== 0) {
      userName = body.split("=")[1];
    }

    // 이거는 요청이 끝났을 때 할 행동을 표시한다.
    //body에 들어간 버퍼데이터를 다시 string으로 변환해서 넣고
    // 밑에서 input에 name을 user로 했기 때문에 body에는 user={input값}이 string으로 들어가있다

    console.log(request.method, request.url);
    // request로 처음 서버가 만들어졌을때 어떤 방식의 요청이 들어갔나 url은 어떻게 찍히나 보려고 한 코드
    // 처음에는 GET 요청이 찍히고 localhost:3000 이니까 url은 / 만 찍힌다. /?가 찍힐 때도 있는데
    // localhost:3000/로 다시 새로고침하면 / 만으로 바뀐다.

    response.setHeader("Content-Type", "text/html");
    // 클라이언트 쪽에서 헤더에 요청을 보냈던 것처럼 서버에서 헤더를 설정할 수 잇다.
    // 다음은 text로 들어온 값을 html 코드로 인식해서 변환하겠다는 뜻이다.
    // 만약 text/plan 으로 하면  밑의 값의 태그도 같이 포함되서 화면에 보여질 것이다.
    // response.write("<h1>hello there!</h1>");
    response.write(
      `<h1>Hi ${userName}</h1><form method="POST" action ="/"><input name="user" type="text"><button type="submit">Send</button></form>`
    );
    // form 태그로 button을 누르면 POST 요청이 submit 되게 하는 html코드
    response.end();
  });
});
// request.on('end') 쪽에서 response를 다뤄야 어떤 이벤트 리스너가 끝났을 때 그 결과에 따른
// 맞는 데이터를 다룰 수 있다.

// 처음 서버를 만들고 data를 보면 data는 아무 것도 없다.
// 이상태에서 end가 되면 그때의 body에 들어간 data를 다루게 되는데
// 만약 response 값을 end 밖에서 다루면 아무것도 없는 body 값을 가지고 동적으로 다루는 것이 진행되지 않고 에러가 뜬다
// 따라서 request.on('end')에서 response를 다뤄야 동적으로 data를 다룰 수 있게 된다.

server.listen(3000);
// 이걸해야 서버가 시작된다.
// 안에 들어가는 숫자는 연결 포트이다.
// 로컬호스트 3000에 연결하겠다는 뜻

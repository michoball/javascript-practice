const fs = require("fs"); // file system 을 불러온다.

fs.readFile("user-data.txt", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data.toString());
});
// 파일을 읽기
// 첫번째는 읽을 파일, 두번째는 에러와 데이터를 다루는 콜백함수

fs.writeFile("user-data.txt", "username = Max", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Wrote to file!");
  }
});
// 파일을 만드는 방법
// 첫번째 인자로 파일명과 확장자, 두번째는 안에 들어가는 내용, 세번째는 에러를 다룬다.

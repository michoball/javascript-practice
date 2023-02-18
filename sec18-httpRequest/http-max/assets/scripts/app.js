const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");

const form = document.querySelector("#new-post form");
const fetchBtn = document.querySelector("#available-posts");

const postList = document.querySelector("ul");

// https://jsonplaceholder.typicode.com/ 와 소통하며 더미 데이터로
// http 요청 다루기

function sendHttpRequest(method, url, data) {
  //const promise = new Promise((resolve, reject) => {
  //// -------------  옛날 방식의 서버통신 -----------------
  // const xhr = new XMLHttpRequest();
  //      xhr.setRequestHeader('Content-Type', 'application/json') -- 여기서는 이렇게 헤더를 추가 할 수 있음
  //     xhr.open(method, url);
  //     xhr.responseType = "json";
  //     xhr.onload = function () {
  //       if (xhr.status >= 200 && xhr.status < 300) {
  //         resolve(xhr.response);
  //       } else {
  //         reject(new Error("Something went wrong!"));
  //       }
  //     };
  //     xhr.onerror = function () {
  //       reject(new Error("Failed to send request"));
  //     };
  //     xhr.send(JSON.stringify(data));
  //---------------------------------------------------------------
  //  });
  //-----> fetch api는 promise가 기본으로 작동하기 때문에 new Promise도 사용 안해도 됨

  return fetch(url, {
    method: method,
    // body: JSON.stringify(data),
    body: data,
    // headers: {
    //   "Content-Type": "application/json",
    // },
  })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        return response.json().then((errData) => {
          console.log(errData);
          throw new Error("Something went wrong! -- server-side");
        }); //  fetch api에서 어디서 error 가 왔는지 쓸 때 이렇게 사용할 수 있지만
        // 추천하는 방식은 아님
      }
    })
    .catch((error) => {
      console.log(error);
      throw new Error("Something went wrong!");
    });
}

async function fetchPosts() {
  try {
    const reponseData = await sendHttpRequest(
      "GET",
      "https://jsonplaceholder.typicode.com/posts"
    );
    const listOfPosts = reponseData;

    for (const post of listOfPosts) {
      const postEl = document.importNode(postTemplate.content, true);
      postEl.querySelector("h2").textContent = post.title.toUpperCase();
      postEl.querySelector("p").textContent = post.body;
      postEl.querySelector("li").id = post.id;
      listElement.append(postEl);
    }
  } catch (error) {
    alert(error.message);
  }
}

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId,
  };

  // json 형식이 아닌 Formdata 라는 다른 방법으로 데이터를 서버에 전달하는 방법
  // 데이터를 저장하는 부분을 알아보기 쉽고, 새로운 file을 추가하기 쉽고
  // 자동으로 서버가 인식하는 방식으로 보내진다.
  // --> FormData() 에 form(html의 form부분 input으로 title과 body를 받는 부분이 있다.)을
  //     보내주면 알아서 서버에 formData형식으로 전송되게 할 수 있다.
  //  단 input 부분에 name 속성으로 저장될 key 이름을 써줘야 한다.

  const fd = new FormData(form);
  //   fd.append("title", title);
  //   fd.append("body", content);
  fd.append("userId", userId);
  // 모든 api 가 지원하는 방식은 아니다. api가 원하는 요청 방식을 보고 맞게 써야한다

  sendHttpRequest("POST", "https://jsonplaceholder.typicode.com/posts", fd);
}

fetchBtn.addEventListener("click", () => {
  listElement.innerHTML = "";
  fetchPosts();
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const enteredTitle = e.currentTarget.querySelector("#title").value;
  const enteredContent = e.currentTarget.querySelector("#content").value;
  createPost(enteredTitle, enteredContent);
});

postList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const postId = e.target.closest("li").id;
    sendHttpRequest(
      "DELETE",
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
  }
});

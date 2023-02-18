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
        });
      }
    })
    .catch((error) => {
      console.log(error);
      throw new Error("Something went wrong!");
    });
}

async function fetchPosts() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    const listOfPosts = response.data;

    for (const post of listOfPosts) {
      const postEl = document.importNode(postTemplate.content, true);
      postEl.querySelector("h2").textContent = post.title.toUpperCase();
      postEl.querySelector("p").textContent = post.body;
      postEl.querySelector("li").id = post.id;
      listElement.append(postEl);
    }
  } catch (error) {
    alert(error.message);
    console.log(error.response);
  }
}

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId,
  };

  const fd = new FormData(form);
  //   fd.append("title", title);
  //   fd.append("body", content);
  fd.append("userId", userId);

  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    post
  );
  // header는 axios는 따로 추가하지 않아도 알아서 해준다.
  console.log(response);
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
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  }
});

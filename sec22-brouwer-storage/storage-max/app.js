const storeBtn = document.getElementById("store-btn");
const retrBtn = document.getElementById("retrieve-btn");
let db;

const dbRequest = indexedDB.open("StorageDummy", 1);

dbRequest.onsuccess = function (event) {
  db = event.target.result;
};

// 위 요청이 성공하면 이 함수가 실행된다.
dbRequest.onupgradeneeded = function (event) {
  db = event.target.result;

  const objStore = db.createObjectStore("products", { keyPath: "id" });

  objStore.transaction.oncomplete = function (event) {
    const productsStore = db
      .transaction("products", "readwrite")
      .objectStore("products");
    productsStore.add({
      id: "p1",
      title: "A First Product",
      price: 12.99,
      tags: ["Expensive", "Luxury"],
    });
  };
};

dbRequest.onerror = function (event) {
  console.log("ERROR");
};

storeBtn.addEventListener("click", () => {
  if (!db) {
    return;
  }
  const productsStore = db
    .transaction("products", "readwrite")
    .objectStore("products");
  productsStore.add({
    id: "p2",
    title: "A Second Product",
    price: 16.99,
    tags: ["More Expensive", "More Luxury"],
  });
});

retrBtn.addEventListener("click", () => {
  const productsStore = db
    .transaction("products", "readwrite")
    .objectStore("products");
  const request = productsStore.get("p2");

  request.onsuccess = function () {
    console.log(request.result);
  };
});

// window에 indexedDB가 존재한다.
// indexedDB.open으로 여는데 첫 값으로 이름을 정한다.
// 정한 이름이 브라우져에 있으면 그 값과 연결을 해주고, 아니면 새로 만든다.
// promise then 으로 요청을 할 수는 없다.

// 대신 addEventListener로 연결할 수 있으나 여러브라우져에서 돌아가려면
// onsuccess로 연결하고 onerror로 에러 상황을 다룬다.

//처음 값을 만드는 경우에는 onupgradeneeded를 사용해야 인덱스드디비에 값이 들어간다.
// 다른 것들보다 더 다양하고 복잡한 오브젝트값을 저장하고 사용할 수 있지만 사용하기 복잡하다.
// https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
// https://github.com/jakearchibald/idb
// indexedDB에 관한 자료가 있는 곳이다.

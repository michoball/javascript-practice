const button = document.querySelector("button");
const output = document.querySelector("p");

const getPosition = (opts) => {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        resolve(success);
      },
      (error) => {
        reject(error);
      },
      opts
    );
  });
  return promise;
};

const setTimer = (duration) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Done!");
    }, duration);
  });
  return promise;
};

async function trackUserHandler() {
  // let positionData;
  let posData;
  let timerData;
  try {
    posData = await getPosition();
    timerData = await setTimer(2000);
  } catch (error) {
    console.log(error);
  }
  console.log(timerData, posData);
  // .then((posData) => {
  //   positionData = posData;
  //   return setTimer(2000);
  // })
  // .catch((err) => {
  //   console.log(err);
  // })
  // .then((data) => {
  //   console.log(data, positionData);
  // });
  //promise chaining

  // setTimer(1000).then(() => {
  //   console.log("Timer done!");
  // });

  // console.log("getting position");
}

// async await 코드는 promise then 과는 다르게 await에 있는 동작을 위에서 부터 순차적으로 진행한다.
// promise then에서는 then 블럭으로 감싼 부분만 순차적으로  큐에서 진행되고  call stack에는 함수안에 다른 코드들이 들어가서 먼저 진행되는데
// async await 는 아님
// 그리고 async await 는 함수 안에서만 사용가능하다.

button.addEventListener("click", trackUserHandler);

Promise.race([getPosition(), setTimer(1000)]).then((data) => {
  console.log(data);
});
// race 안에 array 로 들어간 promise중 빠른 녀석을 다룰때

Promise.all([getPosition(), setTimer(1000)]).then((promiseData) => {
  console.log(promiseData);
});
// all 안에 array로 들어간 promise 모두에 해당하는 data를 보여줌
// array 중 하나가 error가 뜨면 다음걸 기다리지 않고 바로 error 를 보냄

Promise.allSettled([getPosition(), setTimer(1000)]).then((promiseData) => {
  console.log(promiseData);
});

// 이거는 하나가 error가 뜨더라도 모든 promise에 대한 결과값을 가져올 수 있음

// let result = 0;

// for (let i = 0; i < 10000001; i++) {
//   result += i;
// }
// console.log(result);

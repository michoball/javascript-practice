const age = [30, 29, 54];

//푸쉬는 시간복잡도가 어떻게 될까?
//[30, 29, 54] =>[30, 29, 54, ... ]
//[0, 1, 2] => [0, 1, 2, 3]
age.push(60); // => Time Complexity =  Constant Time Complexity ; O(1)
// 푸쉬는 새로운 아이템이 배열에 들어올 때 다른 인덱스들에게 영향을 미치지 않는다.

//unshift의 시간복잡도
//[30, 29, 54] =>[ ...  ,30, 29, 54]
//[0, 1, 2] => [3, 0, 1, 2]
age.unshift(10); // Time Complexity = Linear Time Complexity ; O(n)

const myAge = age[1]; // =>  Constant Time Complexity ; O(1)

// ------------------

const namePopularity = [
  { userName: "Max", usage: 5 },
  { userName: "manu", usage: 6 },
];

const manuUsages = namePopularity.find(
  (pers) => pers.userName === "manu"
).usage;
// BEST CASE: Constant Time Complexity  O(1)
// WORST CASE: Linear Time Complexity  O(n)
// AVERAGE CASE: Linear Time Complexity  O(n)

const nameMap = {
  max: 5,
  manu: 6,
};

const manuUsages2 = nameMap["manu"]; // = Constant Time Complexity  O(1)

// const nameRealMap = new Map()

// 알고리즘 데이터구조에 대한 전반적인 내용
//https://adrianmejia.com/how-you-can-change-the-world-learning-data-structures-algorithms-free-online-course-tutorial/

// 데이터 구조 이해
//https://adrianmejia.com/data-structures-time-complexity-for-beginners-arrays-hashmaps-linked-lists-stacks-queues-tutorial/

// 알고리즘 문제
//https://github.com/trekhleb/javascript-algorithms

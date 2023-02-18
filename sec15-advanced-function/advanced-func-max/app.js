// function add(num1, num2) {
//   return num1 + num2;
// }

// console.log(add(1, 5));
// console.log(add(12, 15));

// function addRandom(num1) {
//   return num1 + Math.random();
// }

// console.log(addRandom(4));

// let multiplier = 2.3;

// function createTaxCalculator(tax) {
//   function calculateTax(amount) {
//     return amount * tax * multiplier;
//   }
//   return calculateTax;
// }

// const calculateVatAmount = createTaxCalculator(0.19);

// const calculateIncomeTaxAmount = createTaxCalculator(0.25);

// console.log(calculateVatAmount(100));
// console.log(calculateIncomeTaxAmount(200));

// let userName = "Max";

// function greetUser() {
//   let name = "Anna";
//   console.log("Hi " + name);
// }

// let name = "Maximilian";

// userName = "Manuel";

// greetUser();

// let result = 1;

// for (let i = 0; i < n; i++) {
//   result *= x;
// }

// return result;

function powerOf(x, n) {
  return n === 1 ? x : x * powerOf(x, n - 1);
}

console.log(powerOf(2, 3));

const myself = {
  name: "Max",
  friends: [
    {
      name: "Manuel",
      friends: [
        {
          name: "Chris",
          friends: [
            {
              name: "Hari",
              friends: [
                {
                  name: "kang",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Julia",
    },
  ],
};

function getFriendNames(person) {
  const collectedNames = [];

  if (!person.friends) {
    return [];
  }

  for (const friend of person.friends) {
    collectedNames.push(friend.name);
    collectedNames.push(...getFriendNames(friend));
  }
  return collectedNames;
}

console.log(getFriendNames(myself));

// regular Expression(정규표현식)

//new RexExp()로 만들 수도 있고 밑에처럼 바로 만들수도 있다
// ^ 는 시작한다는 의미 그다음 모든 종류의 단어가오고 그다음 @이 붙는다는 뜻
// 그리고 아무단어가오고  . 이 오고 다시 아무단어가 오고 $는 마무리된다는 뜻
//   \S 는 스페이스 공백이 아닌것 그냥 . 은 모든 문자열(줄바꿈은 X)인데 \특수기호로 써 . 이 오면 . 은 그냥 . 이다.
//  \특수기호가  그냥 특수기호를 나타내는 방식이기 때문
//    /이안에 쓰는 것이 regular Exp 가 되는 것/
// const regex = /^\S+@\S+\.\S+$/;

const regex1 = /hello/;
const regex2 = /(h|H)ello/; // h나  H 둘다 가능하다는 표현
const regex3 = /.ello/; // 무슨 단어로 시작하든 뒤에 ello가 붙으면 true를 출력

regex3.exec("Hi! jello"); // regex3에서 정의한 표현식이 exec안에 있는 문자열에서 어디부터 나오는지 등의 regex3에 대한 정보를 알고 싶을 때 사용
"Hi! jello".match(regex3); // 이렇게 정보를 얻어도 됨

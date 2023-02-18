"use strict";
// 타입스크립트에서 class
//  constructor 에 들어가는 변수는 field 에 먼저 자료형을 선언해줘야 사용가능하다.
// public 이라 쓰거나 안쓰면  전역으로 사용가능한 변수가되고
// private는 class 내에서만 사용 가능하다.
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    print() {
        console.log(this.name);
    }
}
// ------------------------------------------------** //
const user = new User("Max", 30);
console.log(user.name);
// console.log(user.age) user age는 private 변수
const num1Input = document.getElementById("num1");
const num2Input = document.getElementById("num2");
const btnElement = document.querySelector("button");
function add(a, b) {
    return a + b;
}
var OutputMode;
(function (OutputMode) {
    OutputMode[OutputMode["CONSOLE"] = 0] = "CONSOLE";
    OutputMode[OutputMode["ALERT"] = 1] = "ALERT";
})(OutputMode || (OutputMode = {}));
function printResult(result, printMode) {
    if (printMode === OutputMode.CONSOLE) {
        console.log(result);
    }
    else if (printMode === OutputMode.ALERT) {
        alert(result);
    }
}
//type CalculatiionResults = { res: number; print: () => void }[];
//const results: CalculatiionResults = [];
// **------------------------------------------------ //
// Generic type
//Array
//  Array 와 같이 하나의 타입으로 지정못하는 것들의 타입을 지정한다.
// Array는 array 라는 타입과 array 안에 들어가는 값들의 타입 두가지를 함께 가진다.
// 그래서 위  CalculationContainer 처럼 배열 안에 값을 정하면 다음과 같이 배열의 타입을 지정할 수있다.
const results = [];
// 이 방식의 간편식이
//const results: CalculatiionConatiner[] = []; 인것이다
//Promise
// 어떤 자료를 fetch 로 가져오면 Promise 타입으로 값이 리턴된다 그리고 그 후에
// Promise는 resolve되어 어떤 타입을 가지는 값을 반환한다. 즉, 타입이 2개 필요한것
// 밑의 식도  Generic type을 가진다
// function logAndEcho(val: any){
//   console.log(val);
//   return val
// }
// logAndEcho('Hi there!').split('')
// 여기서 위 split 함수를 사용가능할까?
//  답은 아니다.  val 의 타입이 any 이기 때문에 val로 string이 들어갔지만
// any 타입이라 split 함수를 사용하지 못한다. 이럴때 들어오는 값에 따라서
// 타입을 지정하겠다는 키워드를 쓰면 해결가능하다.
function logAndEcho(val) {
    console.log(val);
    return val;
}
logAndEcho("Hi there!").split(" ");
// 이처럼 <T> 를 쓰면 T 라는 타입을 쓰는 이는 들어오는 값에 따라 달라진다는 의미이다.
// T 일 필요는 없다 다들 알파벳도 가능하다. 그치만 T가 일반적이다
// ------------------------------------------------ **//
const names = ["Max"];
btnElement.addEventListener("click", () => {
    const num1 = +num1Input.value;
    const num2 = +num2Input.value;
    const result = add(num1, num2);
    const resultContainer = {
        res: result,
        print() {
            console.log(this.res);
        },
    };
    results.push(resultContainer);
    // results[0].print();
    printResult(result, OutputMode.CONSOLE);
    printResult(result, OutputMode.ALERT);
});
//                                                **------------------------------                                           //
//                                                **------------------------------                                           //
//                                                **------------------------------                                           //
//                   tsc app.ts 를 터미널에 쳐야 app.js 파일이 생기고 그걸로 브라우져에 콘솔을 찍어볼 수 있다.
//                   일일히 코드 작성후 tsc app.ts로 변환하기 힘드니 뒤에 -w를 붙이면 자동으로 저장되면 변환해준다.
//
//                   ts 코드 파일이 두개 이상일 때 따로 따로 tsc app.ts ,  tsc other.ts 하기 불편하니
//                   tsc init 으로 tsconfig.json 파일을 만들고  그냥 tsc 만 쓰면 모든 ts 파일을 바로 변환해준다.
//                   tsc -w 도 가능하다.
//
//                   tsconfig.json 파일에는 다양한 에러가 날 수 있는 상황에 대한 옵션들이 있다.
//                   여기서 strict: true 가 있는데 이 때문에 document.querySelector 와 같은 method는
//                   null 일 경우도 포함하기에 에러코드로 인식한다.
//                   단순히 위 기능을 끄면 되지만
//
//                   그보다는 const btnElement = document.querySelector("button")!;
//                   이처럼 뒤에 !를 써서 null일 수가 없다고 표시해주는 것도 방법인다. ( ts에만 있는 방법)
//                                                ------------------------------**                                            //
//                                                ------------------------------**                                            //
//                                                ------------------------------**                                            //
//
//
// **------------------------------//
//       기본적으로 string boolean number 등의 타입은 정할 수 있고
//       함수의 타입도 지정해줄 수 있다.
//       함수의 return값이 어떤 것이든 오도록 하려면 함수의 타임을 void로 하면된다.
//       void 는 말그대로 값을 지정하지 않는다는 뜻이고
//       any는 어떤 값이든 가능하다는 뜻이다. any로 지정하는 것은 타입스크립트를 쓰는 의미가 없으니
//       any를 사용하는 것은 좋지 않다.
//       함수에서 return를 설정하지 않거나 return; 으로만 놔두면 함수의 리턴 값은 void 가 된다.
//
//
//
//       html 코드를 가져올 때도 타입을 정해야한다.
//       위 예시처럼 input에 타입이 무엇인지 모르기때문에 타입스크립트는
//       num1Input 에 value 가 있는지 몰라서 에러를 띄운다
//       이럴때는 HTMLInputElement 와 같은 프로퍼티로 값을 지정해준다. 방법은 아래와 같다
//
//       const num1Input= document.getElementById("num1") as HTMLInputElement;
//       const num2Input = <HTMLInputElement>document.getElementById("num2");
//       1번재가 더 널리 사용되는 방식이다.
//       이렇게하면 input에 들어온 값 value 는 string으로 인식한다.
// ------------------------------**//
//
//
//
// **------------------------------//
//
//        object의 타임을 정할 수도 있다.
//        const resultContainer: { res: number } = {
//          res: result
//        }
//        : {} 안에 object의 key값에 대한 타입들을 지정해주면 된다.
//        : object로 지정도 가능하나 이는 해당 object값에 타입에 접근할 수 없다
//        실제로는 위 처럼 지정하지 않아도  타입스크립트가 알아서 지정을 해주기 때문에 지정하지 않아도 된다.
//
//        array에도 타입을 정할 수 있다.
//        let results: { res: number }[] = [];
//        results라는 배열안의 object가 가지고 있는 key값의 타입
//        object가 배열에 들어가면 위처럼 { res: number}라고 하고 뒤에 [] 를 붙여야
//        배열안에 들어잇는 object의 타입이라는 것을 인식한다.
//
//        object 가 여러가지 타입을 가지게 되면
//        예를들어 함수를 가지게 되면
//        const resultContainer: { res: number } = {
//          res: result
//        print() {
//          console.log(this.res);
//        }
//        }
//        이렇게 쓸 수 없다 print 에 대한 타입도 지정해야한다
//        지정하는 대신 여기서 : { res: number } 부분을 없애고 타입스크립트가 알아서 추론하도록 한다.
//        지정을 하려면
//        : {res: number , print: () => void} 이렇게 해주면 된다.
//
// ------------------------------**//
//
//
//
// **------------------------------//
//
//       타입을 새로 정의 할 수도 있다.
//       type CalculatiionResults = { res: number; print: () => void }[];
//       이렇게 해놓고 여기저기 이런 타입을 정의해야하는 순간이 올 때 갖다가 쓰면됨
//       type 를 지정할 때 이름 첫글짜는 대문자로
//
//
//       literal type
//        printMode:"console"| "alert"  이런식으로 직접 타입을 문자로 정의 할 수도 있다.
//       이러면 printMode 는 console 이나 alert 만 가질 수 있다.
//       여기서 |  는 '또는(or)' 을 나타내는 union type 이다
//       이 경우 뿐만아니라 다양한 타입을 지정해줄 때 사용가능하다.
//
//
//       enum
//       enum OutputMode {CONSOLE, ALERT} 위의 literal type을 좀더 많은 값을 범용적으로 사용할 때
//       {} 안에 다양한 타입을 넣어두고 필요한곳에 타입을 OutputMode로 해둔다음
//       그 값을   printResult(result, OutputMode.CONSOLE); 이런식으로 불러와서 사용한다.
//
// ------------------------------**//

// third-party library
// 코드를 짤 때 반복적인 작업이나 익숙하지만 손이 많이 가는 기능을 구현할 때
// 빠르게 코드를 짜게 도와주는 도구

const customers = ["Max", "Manuel", "Anna"];

const activeCustomers = ["Max", "Manuel"];

//예를 들어서 위와 같은 두개의 배열이 있고 inactiveCunstomer를 찾고 싶다고 할 때
// 위와 같은 상황일 때는 눈에 그 차이가 보이지만 만약 customers를 서버에서 받아온다면
// 눈에 active customer와의 차이가 보이지 않기에
//일반적으로 배열을 그냥 뺄 수는 없고 따고 함수를 짜야한다.
// 이 상황에서 3rd party library가 쓰인다.

// 여기서는 Lodash  (https://lodash.com/)
const inactiveCunstomers = _.difference(customers, activeCustomers);

console.log(inactiveCunstomers);

// library list 가 있는 사이트는 없다.
// google 검색을 잘 하거나 stack overflow를 가서 도움을 청하면
// 사용하기 좋은 library을 추천받을 수도 있다.
// ex) --> HTTP request에 좋은 라이브러리는 axios 이다.
// 깃허브에서 axios 공식 레포지토리에 가면 다양한 정보를 알 수 있다.
// XNLHttpRequest()나 fetch api에 있는 각각의 단점을 보안한 라이브러리

// 비록 lodash 같은 가벼운 라이브러리일지라도 필요한 기능이 아닌 다른 기능을 같이 사용하면
// 어플을 느리게 만들 수 있다. 특히나 인터넷 환경이 좋지 않는 곳에서는
// 그래서 라이브러리 공식페이지에는 최적화하는 법이 있다.
// 라이브러리를 이용할 때 해당 라이브러리에 버그가 있을 수도 있으니
//해당 라이브러리의 깃허브에 마지막 커밋이나 이슈, 최신버전을  확인한다.

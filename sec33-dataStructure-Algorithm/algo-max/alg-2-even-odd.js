function isEvenOdd(number) {
  //   const result = number % 2;
  //   if (result === 0) {
  //     return "Even";
  //   } else {
  //     return "Odd";
  //   }

  return number % 2 ? "Odd" : "Even";
}

//Constant Time Complexity  => O(1)

console.log(isEvenOdd(10)); // Even
console.log(isEvenOdd(11)); // odd

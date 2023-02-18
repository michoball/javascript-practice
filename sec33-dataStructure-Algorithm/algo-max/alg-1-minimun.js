function getMin(numbers) {
  if (!numbers.length) {
    throw new Error("Should not be an empty array!");
  }

  if (numbers.length === 1) {
    return numbers[0];
  }
  let currMinimum = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    if (currMinimum > numbers[i]) {
      currMinimum = numbers[i];
    }
  }

  return currMinimum;
}

function getMin2(numbers) {
  if (!numbers.length) {
    throw new Error("Should not be an empty array!");
  }

  for (let i = 0; i < numbers.length; i++) {
    let outerElement = numbers[i];
    for (let j = i + 1; j < numbers.length; j++) {
      let innerElement = numbers[j];

      if (outerElement > innerElement) {
        //swap
        numbers[i] = innerElement;
        numbers[j] = outerElement;

        outerElement = numbers[i];
        innerElement = numbers[j];
      }
    }
  }

  return numbers;
}

const testNumber = [3, 1, 2];
const testNumber2 = [3, 10, -2, 1, 2, -40, 100];

const min = getMin(testNumber);
const min2 = getMin2(testNumber2);

console.log(min);
console.log(min2);

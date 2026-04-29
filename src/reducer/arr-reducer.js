// /**
//  * @template T, U
//  * @param {(previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U} callbackFn
//  * @param {U} [initialValue]
//  * @return {U}
//  */
// Array.prototype.myReduce = function (callbackFn, initialValue) {
//   throw 'Not implemented!';
// };

// ----------------------------------------------------------------------------------------------------

/**
 * @template T, U
 * @param {(previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U} callbackFn
 * @param {U} [initialValue]
 * @return {U}
 */
Array.prototype.myReduce = function (callbackFn, initialValue) {
  // Validate callback
  if (typeof callbackFn !== "function") {
    throw new TypeError(callbackFn + " is not a function");
  }

  const array = this;
  const hasInitialValue = arguments.length > 1;

  // Empty array + no initialValue => error
  if (array.length === 0 && !hasInitialValue) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  let accumulator;
  let startIndex;

  if (hasInitialValue) {
    accumulator = initialValue;
    startIndex = 0;
  } else {
    // Find first valid element (handles sparse arrays)
    let firstIndex = 0;
    while (firstIndex < array.length && !(firstIndex in array)) {
      firstIndex++;
    }

    if (firstIndex >= array.length) {
      throw new TypeError("Reduce of empty array with no initial value");
    }

    accumulator = array[firstIndex];
    startIndex = firstIndex + 1;
  }

  // Iterate through remaining elements
  for (let i = startIndex; i < array.length; i++) {
    // Skip empty slots in sparse arrays
    if (i in array) {
      accumulator = callbackFn(accumulator, array[i], i, array);
    }
  }

  return accumulator;
};
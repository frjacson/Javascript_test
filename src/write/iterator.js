function myIterator(array) {
  let index = 0;
  return {
    next: function () {
      return index < array.length
        ? { value: array[index++], done: false }
        : { value: undefined, done: true };
    },
  };
}

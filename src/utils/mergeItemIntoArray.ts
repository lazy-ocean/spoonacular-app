const MAX_ITEMS = 10;

function mergeItemIntoArray<T>(item: T, array: Array<T>): Array<T> {
  let newArray: Array<T> = [...array];
  const itemIndex = array.indexOf(item);
  if (itemIndex !== -1) {
    newArray.splice(itemIndex, 1);
  }
  newArray.unshift(item);
  newArray.length = Math.min(newArray.length, MAX_ITEMS);
  return newArray;
}

export default mergeItemIntoArray;

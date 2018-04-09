/* HeapSort */

// 交换数组中两个数
function swap(arr, i, j) {
  const arr1 = arr;
  const t = arr[i];
  arr1[i] = arr[j];
  arr1[j] = t;
}
// 按位异或交换，节省空间
// function swap(arr, i, j) {
//   arr[i] = arr[i] ^ arr[j];
//   arr[j] = arr[i] ^ arr[j];
//   arr[i] = arr[i] ^ arr[j];
// }

// 建立大根堆
function heapInsert(arr, i) {
  let index = i;
  while (arr[index] > arr[parseInt((index - 1) / 2, 10)]) {
    swap(arr, index, parseInt((index - 1) / 2, 10));
    index = parseInt((index - 1) / 2, 10);
  }
}
// 重新整理为大根堆
function heapify(arr, size, i = 0) {
  let index = i;
  let leftIndex = (index * 2) + 1;
  while (leftIndex < size) {
    let largestIndex =
      (leftIndex + 1) < size && arr[leftIndex + 1] > arr[leftIndex] ? leftIndex + 1 : leftIndex;
    largestIndex = arr[largestIndex] > arr[index] ? largestIndex : index;
    if (largestIndex === index) break;
    swap(arr, index, largestIndex);
    index = largestIndex;
    leftIndex = (index * 2) + 1;
  }
}
function heapSort(arr, l = 0, r = arr.length - 1) {
  if (arr == null || r <= 0) {
    return;
  }
  for (let i = l; i <= r; i++) {
    heapInsert(arr, i);
  }
  let size = r + 1;
  swap(arr, l, --size);
  while (size > 0) {
    heapify(arr, size, l);
    swap(arr, l, --size);
  }
}

/* 测试 */

// 一定对的方法
function mustBeRight(arr) {
  return arr.sort((a, b) => a - b);
}

// 生成随机数组
function creatRandomArr(num, maxVal = 100) {
  const arr = [];
  for (let i = 0, j = num; i < j; i++) {
    const a = Math.floor((maxVal + 1) * Math.random()) - Math.floor(maxVal * Math.random());
    arr.push(a);
  }
  return arr;
}

// 比较两个数组是否相同
function isEqual(arr1, arr2) {
  if ((!arr1 && arr2) || (arr1 && !arr2)) {
    return false;
  }
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0, j = arr1.length; i < j; i++) {
    if (!isEqual(arr1[i], arr2[i])) return false;
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}
// 对数器
function compare() {
  const compareTimes = 10000;
  for (let i = 0; i < compareTimes; i++) {
    const arr = creatRandomArr(10, 100);
    const arrCopy = arr.slice();
    heapSort(arr);
    mustBeRight(arrCopy);
    const isSuccess = isEqual(arr, arrCopy);
    if (!isSuccess) {
      console.log("oh shit! it's wrong");
      console.log(`yourArr:${arr}`);
      console.log(`right:${arrCopy}`);
      return false;
    }
  }
  console.log('oh my god! all arrs pass the test!');
  return true;
}


// 插入排序
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

function insertionSort(arr, l = 0, r = arr.length - 1) {
  // 如果数组为空或只有一个数
  if (arr == null || arr.length < 2) {
    return;
  }
  // 从第二个数开始向后看
  for (let i = l + 1; i <= r; i++) {
    // 从当前数开始与前一个数比较，前一个数小则交换两个数
    for (let j = i - 1; j >= l && arr[j] > arr[j + 1]; j--) {
      swap(arr, j, j + 1);
    }
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
    insertionSort(arr);
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

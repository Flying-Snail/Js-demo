/* 外排 要求数组左边和右边都是有序的 */
function externalSort(arr, l = 0, r = arr.length - 1) {
  // arr是传入左右有序的数组，l是开始的索引，r是结束的索引
  // mid是中间数的索引
  const mid = Math.floor((l + ((r - l) / 2)));
  const myArr = [];
  const originArr = arr;
  let p1 = l;
  let p2 = mid + 1;
  // 当左边与右边都不越界
  while (p1 <= mid && p2 <= r) {
    myArr.push(arr[p1] < arr[p2] ? arr[p1++] : arr[p2++]);
  }
  // 右边遍历完了
  while (p1 <= mid) {
    myArr.push(arr[p1++]);
  }
  // 左边遍历完了
  while (p2 <= r) {
    myArr.push(arr[p2++]);
  }
  for (let i = 0, j = myArr.length; i < j; i++) {
    originArr[l + i] = myArr[i];
  }
  return originArr;
}
/* 归并排序 */
function mergeSort(arr, l = 0, r = arr.length - 1) {
  if (!arr || r < 1 || l === r) {
    return arr;
  }
  const mid = Math.floor(l + ((r - l) / 2));
  // 使左侧数组有序
  mergeSort(arr, l, mid);
  // 使右侧数组有序
  mergeSort(arr, mid + 1, r);
  // 使数组有序
  externalSort(arr, l, r);
  return arr;
}
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
    mergeSort(arr);
    mustBeRight(arrCopy);
    const isSuccess = isEqual(arr, arrCopy);
    if (!isSuccess) {
      console.log("oh shit! it's wrong");
      console.log(`arr:${arr}`);
      console.log(`arrCopy:${arrCopy}`);
      return false;
    }
  }
  console.log('oh my god! all arrs pass the test!');
  return true;
}


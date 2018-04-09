/* quickSort */
// 交换数组中两个数
function swap(arr, i, j) {
  if (i === j) return arr;
  const arr1 = arr;
  const t = arr[i];
  arr1[i] = arr[j];
  arr1[j] = t;
  return arr;
}
// 按位异或交换，节省空间
// function swap(arr, i, j) {
//   arr[i] = arr[i] ^ arr[j];
//   arr[j] = arr[i] ^ arr[j];
//   arr[i] = arr[i] ^ arr[j];
// }
function partition(arr, l = 0, r = arr.length - 1) {
  let left = l;
  let less = left - 1;
  let more = r + 1;
  const compareNum = arr[r];
  while (left < more) {
    if (arr[left] < compareNum) {
      swap(arr, ++less, left++);
    } else if (arr[left] > compareNum) {
      swap(arr, --more, left);
    } else {
      left++;
    }
  }
  return [less, more];
}

function quickSort(arr, l = 0, r = arr.length - 1) {
  if (arr == null || (r + 1) < 1) return arr;
  if (l < r) {
    const randomR = parseInt((((r + 1) - l) * Math.random()) + l, 10);
    swap(arr, randomR, r);
    const p = partition(arr, l, r);
    quickSort(arr, l, p[0]);
    quickSort(arr, p[1], r);
  }
  return arr;
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
    quickSort(arr);
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

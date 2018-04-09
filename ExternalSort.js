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

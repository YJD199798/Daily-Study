let arr1 = [1, 3, 5, 7, 9];
let arr2 = [1, 3, 5, 7, 9];
/*
  一个参数表示删除后面所有元素
  两个参数表示走a开始删b个元素
  两个以上表示走a开始删b个元素，再这个位置添加元素
*/
Array.prototype.mySplice = function (index, delCount, ...args) {
  // 判断this
  if (this === null || this === undefined) {
    throw new TypeError("Cannot read property 'map' of null or undefined");
  }
  let O = Object(this),
    len = O.length;
  // 第一个参数，不存在 (返回空数组)
  if (index === undefined) {
    return [];
  }
  index = Number(index);
  // 第一个参数不是数字  (全删除)
  if (isNaN(index)) {
    return delArray(O, 0);
  }
  // index若为负值或者超过length
  index = changeIndex(index, len);

  // 第二个参数没有 (后面的全删除)
  if (delCount === undefined) {
    return delArray(O, index);
  }
  // 第二个参数不是数字 (返回空数组)
  if (isNaN(delCount)) {
    return [];
  } else {
    // 第三个参数存在
    if (Array.isArray(args)) {
      return add(O, index, delCount, args);
    }
    // 不存在
    // 删除数组
    return delArray(O, index, delCount);
  }
};

function changeIndex(index, len) {
  // 若为负值
  while (index < 0) {
    index += len;
  }
  // 若为超过len的值
  if (index >= len) {
    index = len;
  }
  return index;
}
// 添加元素
function add(arr, index, count, temp) {
  // 先删除
  let a = delArray(arr, index, count);
  // 添加元素
  for (let i = 0; i < temp.length; i++) {
    // 外层循环添加次数
    for (let j = arr.length; j > index + i; j--) {
      arr[j] = arr[j - 1];
    }
    arr[index + i] = temp[i];
  }
  return a;
}
// 删除元素
function delArray(arr, index, count = arr.length) {
  let temp = [],
    len = arr.length;
  //判断有效的count
  count = len - index >= count ? count : len - index;
  for (let i = 0; i < count; i++) {
    let item = arr[index + i];
    temp.push(item);
  }
  while (count) {
    count--;
    for (let j = index; j < arr.length - 1; j++) {
      arr[j] = arr[j + 1];
    }
    let len_ = arr.length - 1;
    delete arr[len_];
    arr.length = len_;
  }
  return temp;
}
let res1 = arr1.mySplice(1, 1, 111, 222, 333);
let res2 = arr2.splice(1, 1, 111, 222, 333);
console.log(res1, arr1, res2, arr2);

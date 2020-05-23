const search = (nums: number[], target: number): number => {
  return nums.indexOf(target) >= 0 ? nums.lastIndexOf(target) - nums.indexOf(target) + 1 : 0;
};

// console.log(search([5, 7, 7, 8, 8, 10], 8));
console.log(search([1], 1));

export {};

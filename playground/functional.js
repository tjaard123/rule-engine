const combine = af => bf => (a) => af(a) && bf(a)

const length = (length) => (input) => input.length == length;
const allCaps = (input) => input == input.toUpperCase();

// console.log(length(3)("123"))
var result = combine(length(3))(allCaps)("AAA");

// console.log(length("123", 3));
// console.log(length("123", 4));

// console.log(allCaps("AAA"));
// console.log(allCaps("aaa"));

console.log(result);
const combine = (fs) => (input) => (state) => {
	if (fs.length == 1) return fs[0](input)(state);
	else {
		const state1 = fs[0](input)(state);
		return combine(fs.slice(1))(input)(state1);
	}
};

const length = (l) => (input) => (state) => {
	if (input.length != l) {
		return [...state, { rule: "length", valid: false, message: `Length must be ${l}` }];
	} else {
		return [...state, { rule: "length", valid: true }];
	}
};

const allCaps = (input) => (state) => {
	if (input.toUpperCase() != input) {
		return [...state, { rule: "allCaps", valid: false, message: "Must be all caps" }];
	} else {
		return [...state, { rule: "allCaps", valid: true }];
	}
};

const startWith = (c) => (input) => (state) => {
	if (input[0] != c) {
		return [...state, { rule: "startWith", valid: false, message: `Must start with ${c}` }];
	} else {
		return [...state, { rule: "startWith", valid: true }];
	}
};

var validate = combine([length(3), allCaps, startWith('x')]);

var validationResult = validate("AAA")([]);
var validationResult2 = validate("AAAa")([]);

console.log(validationResult);
console.log(validationResult2);

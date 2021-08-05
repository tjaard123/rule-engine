const combine2 = fs => (input) => (state) => {
	if (fs.length == 1) {
		const [a, state1] = fs[0](input)(state);
		return [a, state1]
	}
	else {
		const [a, state1] = fs[0](input)(state);
		const [b, state2] = combine2(fs.slice(1))(input)(state2)
		return [a && b, state2]
	}
}

const combine = af => bf => (input) => (state) => {
	const [a, state1] = af(input)(state)
	const [b, state2] = bf(input)(state1)
	return [ a && b, state2]
}

const length = (l) => (input) => (state) => {
	if (input.length != l) {
		return [false, [ ...state, `Length must be ${l}` ]];
	}
	else {
		return [true, state];
	}
}

const allCaps = (input) => (state) => {
	if (input.toUpperCase() != input) {
		return [false, [ ...state, "Must be all caps"]];
	}
	else {
		return [true, state];
	}
} 

// console.log(length(3)("123"))
var combineWithState = combine(length(3))(allCaps)("AAAa")
var combineList = combine2([length(3), allCaps])

// console.log(combineWithState([]));
console.log(combineList("AAA")([]));

// console.log(length("123", 3));
// console.log(length("123", 4));

// console.log(allCaps("AAA"));
// console.log(allCaps("aaa"));

// console.log(result);
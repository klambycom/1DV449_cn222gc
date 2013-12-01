/*jslint node: true */
'use strict';

// http://hackage.haskell.org/package/base-4.6.0.1/docs/Prelude.html

var zip = function (a, b) {
	var r = [],
		length = a.length < b.length ? a.length : b.length,
		i;

	for (i = 0; i < length; i += 1) {
		r.push([a[i], b[i]]);
	}

	return r;
};

var zipWith = function (fn, a, b) {
	var r = [],
		length = a.length < b.length ? a.length : b.length,
		i;

	for (i = 0; i < length; i += 1) {
		r.push(fn(a[i], b[i]));
	}

	return r;
};

var lines = function (str) {
	return str.split('\n');
};

var words = function (str) {
	return str.split(' ');
};

var unlines = function (strs) {
	return strs.join('\n');
};

var unwords = function (strs) {
	return strs.join(' ');
};

var id = function (a) { return a; }; // No const because id and const is same in javascript

var reverse = function (xs) {
	if (arguments.length === 1) { return xs.reverse(); }
	return [].slice.call(arguments).reverse(); // I don't know why I have to slice first
};

var map = function (fn, xs) { return [].slice.call(xs).map(fn); };

var filter = function (fn, xs) { return [].slice.call(xs).filter(fn); };

var even = function (n) { return n % 2 === 0; };

var odd = function (n) { return !even(n); };

var head = function (xs) { return xs[0]; };

var last = function (xs) { return xs[xs.length - 1]; };

var tail = function (xs) { var xs2 = xs.slice(0); xs2.shift(); return xs2; };

var init = function (xs) { var xs2 = xs.slice(0); xs2.pop(); return xs2; };

var foldl = function (fn, start, xs) {
	var acc = start,
		i;

	for (i = 0; i < xs.length; i += 1) {
		acc = fn(acc, xs[i]);
	}

	return acc;
};

var foldl1 = function (fn, xs) { return foldl(fn, head(xs), tail(xs)); }; // TODO test this

var foldr = function (fn, start, xs) {
	var acc = start,
		i;

	for (i = xs.length - 1; i >= 0; i -= 1) {
		acc = fn(xs[i], acc);
	}

	return acc;
};

var foldr1 = function (fn, xs) { return foldr(fn, head(xs), tail(xs)); }; // TODO test this

var any = function (fn, xs) { return xs.some(fn); };

var all = function (fn, xs) { return xs.every(fn); };

var and = function (xs) { return all(id, xs); };

var or = function (xs) { return any(id, xs); };

var sum = function (xs) {
	return foldl(function (acc, n) { return n + acc; }, 0, xs);
};

var product = function (xs) {
	return foldl(function (acc, n) { return n * acc; }, 1, xs);
};

var concat = function (xss) { return [].concat.apply([], xss); }; // TODO find out why this work

var concatMap = function (fn, xss) { return map(fn, concat(xss)); };

// TODO Maybe make strig if x is a "char"
var replicate = function (n, x) {
	var result = [], i;

	for (i = 0; i < n; i += 1) {
		result.push(x);
	}

	return result;
};

var span = function (fn, xs) {
	var a = [], b = xs.slice(0), i;

	for (i = 0; i < xs.length; i += 1) {
		if (fn(xs[i])) {
			a.push(b.shift());
		} else {
			break;
		}
	}

	return [a, b];
};

var dropWhile = function (fn, xs) {
	var result = xs.slice(0), i;

	for (i = 0; i < xs.length; i += 1) {
		if (fn(xs[i])) {
			result.shift();
		} else {
			break;
		}
	}

	return result;
};

var takeWhile = function (fn, xs) {
	var result = [], i;

	for (i = 0; i < xs.length; i += 1) {
		if (fn(xs[i])) {
			result.push(xs[i]);
		} else {
			break;
		}
	}

	return result;
};

// TODO return string if xs is string
var take = function (n, xs) {
	var result = [], i;

	for (i = 0; i < n; i += 1) {
		result.push(xs[i]);
	}

	return result;
};

var drop = function (n, xs) {
	var result = [], i;

	for (i = n; i < xs.length; i += 1) {
		result.push(xs[i]);
	}

	return result;
};

// TODO Make it work with negative n (negativ n == n = 0)
var splitAt = function (n, xs) { return [take(n, xs), drop(n, xs)]; };

var dot = function (attr) {
	var args = [].slice.call(arguments);
	args.shift();

	return function (object) {
		if (args.length > 0) { return dot(args)(object[attr]); }
		return object[attr];
	};
};

var plus = function (a, b) { return a + b; };

var times = function (a, b) { return a * b; };

var minus = function (a, b) { return a - b; };

var divide = function (a, b) { return a / b; };

var greaterThan = function (a) { return function (b) { return a < b; }; };
var lessThan = function (a) { return function (b) { return a > b; }; };
var greaterThanOrEqualTo = function (a) { return function (b) { return a <= b; }; };
var lessThanOrEqualTo = function (a) { return function (b) { return a >= b; }; };
var equalTo = function (a) { return function (b) { return a === b; }; };
var notEqualTo = function (a) { return function (b) { return a !== b; }; };

var compose = function () {
	var args = arguments;
	return function (x) {
		var acc = x, i;

		for (i = args.length - 1; i >= 0; i -= 1) {
			acc = args[i](acc);
		}

		return acc;
	};
};

var fun = function (a, b) {
	b.id = a;
	return b;
};

console.log(zipWith(fun, [1, 2, 3, 4, 5], [
	{ name: "Skånemejerier" },
	{ name: "Findus" },
	{ name: "O'boy" },
	{ name: "Pepsi" },
	{ name: "Wasa" }
]));





/*
// 99 questions -- problem 2, myButLast
console.log(last(init([1, 2, 3, 4])));
console.log(compose(last, init)([1, 2, 3, 4]));
var myButLast = compose(last, init);
console.log(myButLast([1, 2, 3, 4]));

console.log(takeWhile(lessThan(3), [1, 2, 3, 4, 5, 1, 2, 3]));
console.log(dropWhile(lessThan(3), [1, 2, 3, 4, 5, 1, 2, 3]));

console.log(splitAt(3, [1, 2, 3, 4, 5]));

console.log(take(5, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log(drop(3, [1, 2, 3, 4, 5]));

console.log(takeWhile(function (x) { return x < 3; }, [1, 2, 3, 4, 5, 1, 2, 3]));

console.log(dropWhile(function (x) { return x < 3; }, [1, 2, 3, 4, 5, 1, 2, 3]));

var arr = [1, 2, 3, 4, 1, 2, 3, 4];
console.log(span(function (x) { return x < 3; }, arr));
console.log(arr);

console.log(replicate(5, "yo"));

console.log(concatMap(function (x) { return x * x; }, [[1, 2], [3, 4], [5]]));

console.log(concat([[1, 2], [3, 4], [5]]));

console.log(sum([1, 2, 3, 4, 5]));
console.log(product([1, 2, 3, 4, 5]));

console.log(any(id, [true, true, false]));
console.log(any(id, [false, false, false]));
console.log(any(id, [true, true, true]));

console.log(and([true, true, false]));
console.log(and([false, false, false]));
console.log(and([true, true, true]));

// Not tested enough
console.log(foldl(function (acc, x) { return acc * x; }, 1, [1, 2, 3, 4, 5]));
console.log(foldl1(function (acc, x) { return acc * x; }, [1, 2, 3, 4, 5]));
console.log(foldr(function (x, acc) { return acc * x; }, 1, [1, 2, 3, 4, 5]));
console.log(foldr1(function (x, acc) { return acc * x; }, [1, 2, 3, 4, 5]));

var arr = [1, 2, 3, 4, 5];
console.log(init(arr));
console.log(arr);

var arr = [1, 2, 3, 4, 5];
console.log(tail(arr));
console.log(arr);

console.log(head([1, 2, 3, 4, 5]));
console.log(last([1, 2, 3, 4, 5]));

console.log(filter(even, [1, 2, 3, 4, 5]));
console.log((function () { return filter(even, arguments); }(1, 2, 3, 4, 5)));

console.log(filter(odd, [1, 2, 3, 4, 5]));
console.log((function () { return filter(odd, arguments); }(1, 2, 3, 4, 5)));

console.log(map(function (x) { return x * x; }, [1, 2, 3, 4, 5]));
console.log((function () {
	return map(function (x) { return x * x; }, arguments);
}(1, 2, 3, 4, 5)));

console.log(id('hej'));

console.log(reverse(1, 2, 3, 4, 5));
console.log(reverse([1, 2, 3, 4, 5]));

console.log(lines("rad1\nrad2\nrad3"));
console.log(words("hej hej hallo"));

console.log(unlines(["rad1", "rad2", "rad3"]));
console.log(unwords(["hej", "hej", "hallo"]));

console.log(zip([1, 2, 3, 4, 5], [5, 4, 3, 2, 1]));
console.log(zipWith(function (a, b) {
	return { first: a, second: b };
}, [1, 2, 3, 4, 5], [5, 4, 3, 2, 1]));
*/

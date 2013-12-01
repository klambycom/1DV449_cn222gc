/*jslint node: true */
'use strict';

module.exports = (function () {

    var dot = function (attr) {
            var args = [].slice.call(arguments);
            args.shift();

            return function (object) {
                if (args.length > 0) { return dot(args)(object[attr]); }
                return object[attr];
            };
        },

        joinStr = function (first) {
            return function (second) { return first + second; };
        },

        zipWith = function (fn, a, b) {
            var r = [],
                length = a.length < b.length ? a.length : b.length,
                i;

            for (i = 0; i < length; i += 1) {
                r.push(fn(a[i], b[i]));
            }

            return r;
        },
        
        map = function (fn, xs) {
            return [].map.call(xs, fn);
        };

    return {
        dot: dot,
        joinStr: joinStr,
        zipWith: zipWith,
        map: map
    };
}());

/*jslint node: true */
'use strict';

var curl = require('curling').connect();

var options = {
	header: "Accept: text/html",
	location: null
};

curl.get('http://www.google.com', options, function (err, result) {
	console.log(result.payload);
	console.log(result.stats);
});

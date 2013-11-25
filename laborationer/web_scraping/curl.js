/*jslint node: true */
'use strict';

var curl = require('curling').connect({
	location: null,
	'cookie-jar': 'cookie.txt',
	cookie: 'cookie.txt'
});

/*
var options = {
	header: "Accept: text/html",
	location: null,
	'cookie-jar': 'cookie.txt',
	cookie: 'cookie.txt'
};

curl.get('http://vhost3.lnu.se:20080/~1dv449/scrape', options, function (err, result) {
	console.log(result.payload);
	console.log(result.stats);
});
*/

var options = {
	data: ['username=admin', 'password=admin']
};

curl.post('http://vhost3.lnu.se:20080/~1dv449/scrape/check.php', options, function (err, result) {
	if (err) {
		console.log(err);
	}
	console.log(result.payload);
	console.log(result.stats);
});

/*jslint node: true */
'use strict';

var cheerio = require('cheerio'),
	curl = require('curling').connect({
		location: null,
		'cookie-jar': 'cookie.txt',
		cookie: 'cookie.txt'
	});

/*
curl.get('http://vhost3.lnu.se:20080/~1dv449/scrape', options, function (err, result) {
	console.log(result.payload);
	console.log(result.stats);
});
*/

var dot = function (attr) {
	var args = [].slice.call(arguments);
	args.shift();

	return function (object) {
		if (args.length > 0) {
			return dot(args)(object[attr]);
		}

		return object[attr];
	};
};

Object.prototype.map = function (fn) {
	return [].map.call(this, fn);
};

var options = {
	data: ['username=admin', 'password=admin']
};

var getCompany = function (baseUrl, fn) {
	return function (url) {
		return curl.get(baseUrl + url, fn);
	};
};

curl.post('http://vhost3.lnu.se:20080/~1dv449/scrape/check.php', options, function (err, result) {
	if (err) {
		console.log(err);
	}

	/*
	console.log(result.payload);
	console.log(result.stats);
	*/

	/*
	var dom = cheerio.load(result.payload),
		links = dom('.container a');
		*/

	var links = cheerio.load(result.payload)('.container a');

	console.log(links.map(dot('attribs', 'href')));

	/*
	links.map(dot('attribs', 'href')).map(function (link) {
		return curl.get('url', function (err, result) {
		});
	});
	*/

	links.map(dot('attribs', 'href'))
		 .map(getCompany('http://vhost3.lnu.se:20080/~1dv449/scrape/', function () {
		}));
});

var Company = function (url, name, picture) {
	this.url = url;
	this.name = name;
	this.picture = picture;
};

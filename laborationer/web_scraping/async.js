/*jslint node: true */
'use strict';

var async = require('async'),
	cheerio = require('cheerio'),
	curl = require('curling').connect({
		location: null,
		'cookie-jar': 'cookie.txt',
		cookie: 'cookie.txt'
	}),
	dot = require('tools').dot,
	join = require('tools').join,
	zipWith = require('tools').zipWith,
	map = require('tools').map,
	dot = function (attr) {
		var args = [].slice.call(arguments);
		args.shift();

		return function (object) {
			if (args.length > 0) { return dot(args)(object[attr]); }
			return object[attr];
		};
	},
	concat = function (first) {
		return function (second) { return first + second; };
	},
	get = function (options) {
		return function (url, callback) { curl.get(url, options, callback); };
	},
	zipWith = function (fn, a, b) {
		var r = [],
			length = a.length < b.length ? a.length : b.length,
			i;

		for (i = 0; i < length; i += 1) {
			r.push(fn(a[i], b[i]));
		}

		return r;
	};

Object.prototype.map = function (fn) {
	return [].map.call(this, fn);
};

exports.pages = function (callback) {
	var loginUrl = 'http://vhost3.lnu.se:20080/~1dv449/scrape/check.php',
		companyUrl = 'http://vhost3.lnu.se:20080/~1dv449/scrape/secure/',
		options = { data: ['username=admin', 'password=admin'] };

	curl.post(loginUrl, options, function (err, result) {
		if (err) {
			console.log(err);
		}

		var addUrlToObject = function (url, obj) { obj.url = url; return obj; },
			urls = cheerio.load(result.payload)('table.table-striped a')
						  .map(dot('attribs', 'href'))
						  .map(concat(companyUrl));

		zipWith(addUrlToObject, urls, []);

		async.map(urls, get(), callback);
	});
};






var addUrlToObject = function (url, obj) {
		obj.id = url; // TODO Do some work
		return obj;
	},
	extractCompanyData = function (d) {
		var page = cheerio.load(d.payload);
		return {
			name: page('.hero-unit h1').text(),
			ort: page('.ort').text().replace(/Ort: /, ''),
			url: page('.hero-unit a').attr('href'),
			picture: page('.hero-unit img').attr('src')
		};
	};

exports.companyInfo = function (callback) {
	var loginUrl = 'http://vhost3.lnu.se:20080/~1dv449/scrape/check.php',
		companyUrl = 'http://vhost3.lnu.se:20080/~1dv449/scrape/secure/',
		options = { data: ['username=admin', 'password=admin'] };

	curl.post(loginUrl, options, function (err, result) {
		if (err) { console.log(err); }

		var urls = cheerio.load(result.payload)('table.table-striped a')
						  .map(dot('attribs', 'href'))
						  .map(concat(companyUrl));

		zipWith(addUrlToObject, urls, []);

		async.map(urls, get(), function (err, pages) {
			if (err) {
				callback(err, null);
			} else {
				var data = zipWith(addUrlToObject, urls, pages.map(extractCompanyData));
				//var data = zipWith(addUrlToObject, urls, map(pages, extractCompanyData));
				//callback(null, zipWith(addUrlToObject, urls, map(pages, extractCompanyData)));
				callback(null, data);
			}
		});
	});
};





var extractCompanyData = function (callback) {
	return function (err, pages) {
		if (err) {
			callback(err, null);
		} else {
			var data = pages.map(function (d) {
				var page = cheerio.load(d.payload);
				return {
					name: page('.hero-unit h1').text(),
					ort: page('.ort').text().replace(/Ort: /, ''),
					url: page('.hero-unit a').attr('href'),
					picture: page('.hero-unit img').attr('src')
				};
			});
			callback(null, data);
		}
	};
};

var html = "<!DOCTYPE html>\n<html>\n  <head>\n    <title>Närproducerat - Våra producenter</title>\n    <link href='../../css/bootstrap.min.css' rel='stylesheet'>\n\t<meta charset='utf-8'>\n\t<style>\n\t\tbody {\n\t        padding-top: 60px; /* 60px to make the container go all the way to the bottom of the topbar */\n\t      }\n\timg {\n\t\tfloat: right;\n\t\tborder: 1px solid black;\n\t}\n\t</style>\n  </head>\n\t\n  <body>\n    \n\t<div class='navbar navbar-inverse navbar-fixed-top'>\n\t      <div class='navbar-inner'>\n\t        <div class='container'>\n\t          <a class='btn btn-navbar' data-toggle='collapse' data-target='.nav-collapse'>\n\t            <span class='icon-bar'></span>\n\t            <span class='icon-bar'></span>\n\t            <span class='icon-bar'></span>\n\t          </a>\n\t          <a class='brand' href='#'>Närproducerade varor</a>\n\t          <div class='nav-collapse collapse'>\n\t            <ul class='nav'>\n\t              \t <li><a href='../index.html'>Startsida</a></li>\n\t\t              <li class='active'><a href='#'>Producenter</a></li>\n\t              \n\t            </ul>\n\t          </div>\n\t        </div>\n\t      </div>\n\t    </div>\n\n\t    <div class='container'>\n\n\t      \t\n\t      \t<div class='hero-unit'>\n\t\t\t\t<h1>John &amp; Johans Knos</h1>\n\t\t\t\t\n\t\t\t\t<p>\t\n\t\t\t\t\t<strong>ADRESS</strong><br />\n\t\t\t\t\tAdress: Gröndahlsvägen 31<br />\n\t\t\t\t\tPostnummer: 368 54<br />\n\t\t\t\t\t<span class='ort'>Ort: Kalmar</span>\n\t\t\t\t</p>\n\t\t\t\t<p>\n\t\t\t\t\t<strong>KONTAKTINFORMATION</strong><br />\n\t\t\t\t\tHemsida: <a href='https://coursepress.lnu.se/kurs/webbteknik-ii/'>https://coursepress.lnu.se/kurs/webbteknik-ii/</a>\n\t\t\t\t</p>\n\t\t\t</div>\n\t\t\t\n\t\t\n\t\t \n\n\t    </div> \n\t\n    <script src='http://code.jquery.com/jquery-latest.js'></script>\n    <script src='../js/bootstrap.min.js'></script>\n  </body>\n</html>",
	page = cheerio.load(html);

var data = {
	name: page('.hero-unit h1').text(),
	ort: page('.ort').text().replace(/Ort: /, ''),
	url: page('.hero-unit a').attr('href'),
	picture: page('.hero-unit img').attr('src')
};

console.log(data);

/*
exports.pages(function (err, pages) {
	if (err) {
		console.log(err);
	} else {
		console.log(pages);
	}
});
*/

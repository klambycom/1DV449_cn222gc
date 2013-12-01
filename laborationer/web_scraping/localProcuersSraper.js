/*jslint node: true */
'use strict';

var async = require('async'),
    cheerio = require('cheerio'),
    curl = require('curling').connect({
        location: null,
        'cookie-jar': 'cookie.txt',
        cookie: 'cookie.txt'
    }),
    dot = require('./tools').dot,
    joinStr = require('./tools').joinStr,
    zipWith = require('./tools').zipWith,
    map = require('./tools').map;

var asyncGet = function (options) {
    return function (url, callback) { curl.get(url, options, callback); };
};

var addUrlToObject = function (url, obj) {
    obj.id = url.match(/producent_([1-9]+)/)[1];
    return obj;
};

var extractCompanyData = function (data) {
    var page = cheerio.load(data.payload);
    return {
        name: page('.hero-unit h1').text(),
        ort: page('.ort').text().replace(/Ort: /, ''),
        url: page('.hero-unit a').attr('href'),
        picture: page('.hero-unit img').attr('src')
    };
};

exports.producers = function (callback) {
    var loginUrl = 'http://vhost3.lnu.se:20080/~1dv449/scrape/check.php',
        companyUrl = 'http://vhost3.lnu.se:20080/~1dv449/scrape/secure/',
        options = { data: ['username=admin', 'password=admin'] };

    curl.post(loginUrl, options, function (err, result) {
        if (err) { callback(err, null); return; }

        var links = cheerio.load(result.payload)('table.table-striped a'),
            urls = map(joinStr(companyUrl), map(dot('attribs', 'href'), links));

        async.map(urls, asyncGet(), function (err, pages) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, zipWith(addUrlToObject, urls, map(extractCompanyData, pages)));
            }
        });
    });
};

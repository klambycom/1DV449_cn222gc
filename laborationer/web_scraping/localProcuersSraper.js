/*jslint node: true */
'use strict';

var async = require('async'),
    cheerio = require('cheerio'),
    dot = require('./tools').dot,
    joinStr = require('./tools').joinStr,
    zipWith = require('./tools').zipWith,
    map = require('./tools').map,
    curl = require('curling').connect({
        location: null,
        'cookie-jar': 'cookie.txt',
        cookie: 'cookie.txt',
        header: 'Cache-control: no-cache'
    }),
    loginUrl = 'http://vhost3.lnu.se:20080/~1dv449/scrape/check.php',
    companyUrl = 'http://vhost3.lnu.se:20080/~1dv449/scrape/secure/',
    options = { data: ['username=admin', 'password=admin'] };

var asyncGet = function (options) {
    return function (url, callback) { curl.get(url, options, callback); };
};

var addIdToObject = function (url, obj) {
    return ((obj.id = url.match(/producent_([1-9]+)/)[1]) !== null) && obj; // Sometimes jslint sucks!
};

var extractCompanyData = function (data) {
    var page = cheerio.load(data.payload),
        image = page('.hero-unit img').attr('src'),
        returnData = {
            name: page('.hero-unit h1').text(),
            location: page('.ort').text().replace(/Ort: /, ''),
            url: page('.hero-unit a').attr('href')
        };

    if (image) { returnData.picture = companyUrl + image; }

    return returnData;
};

exports.producers = function (callback) {
    curl.post(loginUrl, options, function (err, result) {
        if (err) { callback(err, null); return; }

        var links = cheerio.load(result.payload)('table.table-striped a'),
            urls = map(joinStr(companyUrl), map(dot('attribs', 'href'), links));

        async.map(urls, asyncGet(), function (err, pages) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, zipWith(addIdToObject, urls, map(extractCompanyData, pages)));
            }
        });
    });
};

exports.producers(function (err, producers) {
    console.log(producers);
});

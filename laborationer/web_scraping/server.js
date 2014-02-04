/*jslint node: true */
'use strict';

var express = require('express'),
    app = express(),
    scraper = require('./localProcuersScraper'),
    mongoose = require('mongoose'),
    Producer = require('./database'),
    hbs = require('hbs'),
    moment = require('moment'),
    async = require('async');

// Settings
app.configure(function () {
    app.set('view engine', 'hbs');
    app.use(express['static']('public'));
});

app.configure('development', function () {
    app.set('db', 'mongodb://localhost/test');
});

app.configure('production', function () {
    app.set('db', 'hemligt');
});

mongoose.connect(app.get('db'));

// Handlebar
hbs.registerHelper('producer_link', function (producer) {
    if (producer.url === "#" || producer.url === "Unknown") {
        return producer.name;
    }

    return new hbs.handlebars.SafeString('<a href="' + producer.url + '">' + producer.name + '</a>');
});

hbs.registerHelper('each_to_limit', function (context, limit, options) {
    var toLimit = context
        .reverse()
        .slice(0, limit)
        .map(options.fn)
        .join('');

    if (limit < context.length) {
        return toLimit + options.inverse({ nr_of_more_times: context.length - limit });
    }

    return toLimit;
});

hbs.registerHelper('date', function (date, format) {
    moment.lang('sv');
    return moment(date).format(format);
});

// Routes
app.get('/', function (req, res) {
    Producer.find({}, function (err, producers) {
        if (err) { console.log(err); }
        res.render('index', { producers: producers });
    });
});

app.get('/skrapa', function (req, res) {
    scraper.producers(function (err, data) {
        var producers = data.map(function (x) { return new Producer(x); });

        async.each(producers,
            function (item, callback) {
                item.createOrUpdate(callback);
            },
            function (err) {
                if (err) { console.log("Error when saving"); }
                res.redirect('/');
            });
    });
});

// Show error messages
app.use(express.errorHandler({ dumpExceptions: true }));

// Start server
app.listen(3000);
console.log('Listening on port 3000');

/*jslint node: true */
'use strict';

var express = require('express'),
    app = express(),
    scraper = require('./localProcuersScraper'),
    mongoose = require('mongoose'),
    Producer = require('./database'),
    hbs = require('hbs'),
    moment = require('moment');

// Settings
app.configure(function () {
    app.set('view engine', 'hbs');
    app.use(express['static']('public'));
});

app.configure('development', function () {
    app.set('db', 'mongodb://localhost/test');
});

app.configure('production', function () {
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
app.get('/hello.txt', function (req, res) {
    res.send('Hello, World');
});

app.get('/', function (req, res) {
    Producer.find({}, function (err, producers) {
        if (err) { console.log(err); }
        res.render('index', { producers: producers });
    });
});

app.get('/skrapa', function (req, res) {
    scraper.producers(function (err, data) {
        data.forEach(function (d) {
            var producer = new Producer(d);
            producer.createOrUpdate(function (err, result) {
                if (err) { console.log("Error when saving"); }
            });
        });
        res.send("ok");
    });
});

// Show error messages
app.use(express.errorHandler({ dumpExceptions: true }));

// Start server
app.listen(3000);
console.log('Listening on port 3000');

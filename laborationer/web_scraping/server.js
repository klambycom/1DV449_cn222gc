/*jslint node: true */
'use strict';

var express = require('express'),
    app = express(),
    scraper = require('./localProcuersScraper'),
    mongoose = require('mongoose'),
    Producer = require('./database');

// Settings
app.configure(function () {
});

app.configure('development', function () {
    app.set('db', 'mongodb://localhost/test');
});

app.configure('production', function () {
});

mongoose.connect(app.get('db'));

// Routes
app.get('/hello.txt', function (req, res) {
    res.send('Hello, World');
});

app.get('/', function (req, res) {
    Producer.find({ name: /^P1/ }, function (err, producer) {
        if (err) { console.log(err); }
        console.log(producer);
        res.send(producer);
    });
});

app.get('/skrapa', function (req, res) {
    scraper.producers(function (err, data) {
        res.send(data);
    });
});

// Show error messages
app.use(express.errorHandler({ dumpExceptions: true }));

// Start server
app.listen(3000);
console.log('Listening on port 3000');

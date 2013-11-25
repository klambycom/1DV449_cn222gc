/*jslint node: true */
'use strict';

var express = require('express'),
    app = express();
    //curl = require('node-curl');

app.get('/hello.txt', function (req, res) {
    res.send('Hello, World');
});

app.get('/scrape', function (req, res) {
    /*
    curl('coursepress.lnu.se', function (error) {
        console.info(this.status);
        console.info('-----');
        console.info(this.body);
        console.info('-----');
        console.info(this.info('SIZE_DOWNLOAD'));
    });
    */

    res.send('Ok');
});

// Show error messages
app.use(express.errorHandler({ dumpExceptions: true }));

app.listen(3000);
console.log('Listening on port 3000');

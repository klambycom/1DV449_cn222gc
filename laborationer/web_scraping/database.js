/*jslint node: true, es5: true, nomen: true */
'use strict';

var mongoose = require('mongoose');

var producerSchema = mongoose.Schema({
    id: String,
    name: { type: String, default: 'Unknown' },
    location: { type: String, default: 'Unknown' },
    url: { type: String, default: 'Unknown' },
	scrapings: [{
		scraped_at: Date,
		not_found: Boolean
	}]
});

producerSchema.pre('save', function (next) {
    this.scrapings.push({
		scraped_at: Date.now(),
		not_found: false
	});
    next();
});

producerSchema.methods.counter = function () {
    return this.scrapings.length;
};

producerSchema.methods.last_scraping = function () {
	return this.scrapings[this.counter - 1];
};

producerSchema.methods.createOrUpdate = function (callback) {
	var self = this,
		data = this.toObject();
	delete data._id;
	this.model('Producer').findOne({ id: this.id }, function (err, producer) {
		if (producer) {
			producer.scrapings.push({
				scraped_at: Date.now(),
				not_found: false
			});
			data.scrapings = producer.scrapings;
			producer.update(data, callback);
		} else {
			self.save(callback);
		}
	});
};

module.exports = mongoose.model('Producer', producerSchema);

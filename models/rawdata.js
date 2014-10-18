var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

var rawData = new Schema({
    marker: {
	type: String,
	required: true
    },
    time: {
	type: Date,
	required: true
    },
    value: {
	type: Number,
	required: true
    }
});

exports.rawData = rawData;

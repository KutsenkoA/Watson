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

rawData.virtual('timeUTC').get(function() {
    return this.time.getTime();
});

module.exports = mongoose.model('rawData', rawData);

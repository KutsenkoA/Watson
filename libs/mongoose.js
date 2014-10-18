var mongoose = require("mongoose");

var connection = mongoose.connect("mongodb://localhost/watson", function(err) {
    if (err) {
	console.log(err);
	process.exit(1);
    } else {
	console.log('Connect to mongodb');
    }
});

module.exports = mongoose;

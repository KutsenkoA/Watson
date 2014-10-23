var rawData = require('../models/rawdata');
var socket = require('../workers/collector').socket;

exports.index = function(req, res){
  res.render('index', { title: 'Watson', descr: 'wordwide best app :)'});
};

exports.graph = function(req, res) {
  var q = rawData.find().sort({'time': -1}).select('value').limit(30);

  q.exec(function(err, data) {

  	var dataArray = [];

  	data.forEach(function(obj) {
  		dataArray.push(obj.value);
  	});

    res.send(dataArray);
  });
};

exports.lastpacket = function(req, res) {
	res.send(socket.lastPacket);
};

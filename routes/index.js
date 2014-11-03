var rawData = require('../models/rawdata');
var socket = require('../workers/collector').socket;
var chunk = require('./chunk');

exports.index = function(req, res){
  res.render('index', { title: 'Watson', descr: 'wordwide best app :)'});
};

exports.graph = function(req, res) {
  var yesterday = new Date();
  yesterday.setHours(yesterday.getHours() - 15);
  var q = rawData.find({'time': {$gt: yesterday}}).sort({'time': 1});

  q.exec(function(err, data) {

  	var dataArray = [];

  	data.forEach(function(obj) {
  		dataArray.push([obj.timeUTC, obj.value]);
  	});

    res.send(dataArray);
  });
};

exports.lastpacket = function(req, res) {
  var countPackets = req.params.count;
	res.send(socket.packets.filter(function(element, index) {
    if (index >= socket.packets.length - countPackets) {
      return true;
    }
  }).reverse());
};

exports.chunk = chunk;

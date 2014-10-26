var rawData = require('../models/rawdata');
var socket = require('../workers/collector').socket;

exports.index = function(req, res){
  res.render('index', { title: 'Watson', descr: 'wordwide best app :)'});
};

exports.graph = function(req, res) {
  var q = rawData.find().sort({'time': -1}).select('value').limit(300);

  q.exec(function(err, data) {

  	var dataArray = [];

  	data.forEach(function(obj) {
  		dataArray.push(obj.value);
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

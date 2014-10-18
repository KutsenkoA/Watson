var dgram = require('dgram'),
    rawData = require('../models/rawdata');

var socket = dgram.createSocket('udp4');

socket.on("error", function (err) {
  console.log("socket error:\n" + err.stack);
  socket.close();
});

socket.on("message", function (msg, rinfo) {
  console.log("socket got: " + msg + " from " +
    rinfo.address + ":" + rinfo.port);

  var data = new rawData({
      marker: 'test_data',
      time: new Date(),
      value: msg
  });

  data.save();

});

socket.on("listening", function () {
  var address = socket.address();
  console.log("socket listening " +
      address.address + ":" + address.port);
});

socket.bind(8899);

exports.socket = socket;



var dgram = require('dgram'),
    mongoose = require('../libs/mongoose'),
    rawData = require('../models/rawdata'),
    parse = require('../libs/packetparser').parse;

var socket = dgram.createSocket('udp4');

socket.lastPacket = {
  result: false,
  errorMessage: 'No packets recieved from application start',
  errorCode: 0
};

socket.on("error", function (err) {
  console.log("socket error:\n" + err.stack);
  socket.close();
});

socket.on("message", function (msg, rinfo) {

  var parsedPacket = parse(msg);

  parsedPacket.src = {
    ip: rinfo.address,
    port: rinfo.port
  };

  parsedPacket.time = Date();

  console.log("socket got: ", parsedPacket, " from " +
    rinfo.address + ":" + rinfo.port);

  socket.lastPacket = parsedPacket;

  parsedPacket.tlvs.forEach(function(tlv) {
    if (tlv.type == 20) {
      var data = new mongoose.models.rawData({
        marker: 'test_data',
        time: new Date(),
        value: tlv.value
      });
      data.save();
    }
  });
})

socket.on("listening", function () {
  var address = socket.address();
  console.log("socket listening " +
      address.address + ":" + address.port);
});

socket.bind(8899);

exports.socket = socket;



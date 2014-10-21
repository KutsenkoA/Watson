var Buffer = require('buffer');

var parse = function(packet) {
	
	var readTLV = function(buf, position) {
		var type = buf.readUInt16BE(position),
				length = buf.readUInt16BE(position + 2),
				value = new Buffer(length);

				buf.copy(value, 0, position + 4, length);

				return {
					type: type,
					length: length,
					value: value
				}
	}

	if (!Buffer.isBuffer(packet)) {
		return {
			result: false,
			errorCode: 56,
			errorMessage: 'argument is not a Buffer'
		};
	}

	var delimiter = packet.readUInt16BE(0);

	if (delimiter !== 0xABD5) {
		return {
			result: false,
			errorCode: 50,
			errorMessage: 'packet dont have delimiter'
		}
	}

	var packetLength = packet.readUInt16BE(2);

	if (packetLength != packet.length - 2) {
		return {
			result: false,
			errorCode: 51,
			errorMessage: 'packet length not equal to PLength field'
		}
	}

	var parsed = {
		result: true,
		tlvs: []
	};

	var currentPosition = 4;

	while (currentPosition < packetLength) {
		parsed.tlvs.push(readTLV(packet, currentPosition));
		currentPosition += parsed.tlvs[parsed.tlvs.length - 1].length;
	}

	return parsed;
}

module.exports.parse = parse;
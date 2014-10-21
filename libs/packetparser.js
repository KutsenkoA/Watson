//var Buffer = require('buffer');

var parse = function(packet) {

	var TYPE_FIELD_LENGTH = 2,
			LENGTH_FIELD_LENGTH = 2,
			DELLEN_OFFSET = 4,
			DELIMITER_VALUE = 0xABD5;
	
	var readTLV = function(buf, position) {
		var type = buf.readUInt16BE(position),
				length = buf.readUInt16BE(position + TYPE_FIELD_LENGTH),
				value = new Buffer(length),
				copyStart = position + TYPE_FIELD_LENGTH + LENGTH_FIELD_LENGTH,
				copyEnd = copyStart + length;

				if (!length) return false;
	
				buf.copy(value, 0, copyStart, copyEnd);

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

	if (delimiter !== DELIMITER_VALUE) {
		return {
			result: false,
			errorCode: 50,
			errorMessage: 'packet dont have delimiter'
		}
	}

	var packetLength = packet.readUInt16BE(2);

	console.log(packetLength, packet.length);
	if (packetLength != packet.length - DELLEN_OFFSET) {
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

	var currentPosition = DELLEN_OFFSET;

	while (currentPosition < packetLength) {
		var tlv = readTLV(packet, currentPosition);
		if (!tlv) break;
		parsed.tlvs.push(tlv);
		currentPosition += parsed.tlvs[parsed.tlvs.length - 1].length + TYPE_FIELD_LENGTH + LENGTH_FIELD_LENGTH;
	}

	return parsed;
}

module.exports.parse = parse;
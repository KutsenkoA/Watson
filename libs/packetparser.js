//var Buffer = require('buffer');

var parse = function(packet) {

	var TYPE_FIELD_LENGTH = 2,
			LENGTH_FIELD_LENGTH = 2,
			DELLEN_OFFSET = 4,
			DELIMITER_VALUE = 0xABD5,
			MIN_PACKET_LENGTH = DELLEN_OFFSET + TYPE_FIELD_LENGTH + LENGTH_FIELD_LENGTH + 1;
	
	var readTLV = function(buf, position) {
		var type = buf.readUInt16BE(position),
				length = buf.readUInt16BE(position + TYPE_FIELD_LENGTH),
				value = new Buffer(length),
				copyStart = position + TYPE_FIELD_LENGTH + LENGTH_FIELD_LENGTH,
				copyEnd = copyStart + length;

				if (buf.length < copyEnd) {
					return false;
				}

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

	if (packet.length < MIN_PACKET_LENGTH) {
		return {
			result: false,
			errorCode: 57,
			errorMessage: 'packet is too short'
		}
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
		if (!tlv) {
			return {
				result: false,
				errorCode: 58,
				errorMessage: 'error reading TLV'
			}
		}
		parsed.tlvs.push(tlv);
		currentPosition += tlv.length + TYPE_FIELD_LENGTH + LENGTH_FIELD_LENGTH;
	}

	return parsed;
}

module.exports.parse = parse;
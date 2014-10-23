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
				copyEnd = copyStart + length,
				data;

				if (buf.length < copyEnd) {
					return false;
				}

				if (!length) return false;
	
				buf.copy(value, 0, copyStart, copyEnd);

				switch(length) {
					case 1:
						data = value.readUInt8();
						break;
					case 2:
						data = value.readUInt16BE();
						break;
					case 4:
						data = value.readUInt32BE();
						break;
					default:
						data = value;
				}

				return {
					type: type,
					length: length,
					value: data
				}
	}

	if (!Buffer.isBuffer(packet)) {
		return {
			result: false,
			errorCode: 1,
			errorMessage: 'argument is not a Buffer',
		};
	}

	if (packet.length < MIN_PACKET_LENGTH) {
		return {
			result: false,
			errorCode: 11,
			errorMessage: 'packet is too short',
			rawData: packet
		}
	}

	var delimiter = packet.readUInt16BE(0);

	if (delimiter !== DELIMITER_VALUE) {
		return {
			result: false,
			errorCode: 12,
			errorMessage: 'packet doesn\'t have delimiter',
			rawData: packet
		}
	}

	var packetLength = packet.readUInt16BE(2);

	console.log(packetLength, packet.length);
	if (packetLength != packet.length - DELLEN_OFFSET) {
		return {
			result: false,
			errorCode: 13,
			errorMessage: 'packet length not equal to PLength field',
			rawData: packet
		}
	}

	var parsed = {
		result: true,
		length: packetLength,
		rawData: packet,
		tlvs: []
	};

	var currentPosition = DELLEN_OFFSET;

	while (currentPosition < packetLength) {
		var tlv = readTLV(packet, currentPosition);
		if (!tlv) {
			return {
				result: false,
				errorCode: 58,
				errorMessage: 'error reading TLV',
				rawData: packet
			}
		}
		parsed.tlvs.push(tlv);
		currentPosition += tlv.length + TYPE_FIELD_LENGTH + LENGTH_FIELD_LENGTH;
	}

	return parsed;
}

module.exports.parse = parse;
'use strict';

angular.module('watson')
	.controller('lastPacketController', ['$scope', function($scope) {
		$scope.packet = {
			time: new Date(),
			src: '192.168.0.23',
			port: 8888,
			tvls: [
			{
				type: 21,
				length: 1,
				value: 0xAB
			},
			{
				type: 80,
				length: 1,
				value: 0x32
			},
			{
				type: 33,
				length: 2,
				value: 0xFF4F
			}]
		};
	}]);
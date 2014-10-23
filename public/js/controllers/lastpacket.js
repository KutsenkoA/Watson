'use strict';

angular.module('watson')
	.controller('lastPacketController', 
		['$scope', '$interval', 'serverService', 
			function($scope, $interval, serverService) {

				var requests = 0;
		
				$scope.packet = {
					result: false,
					errorMessage: 'Waiting for the first packet',
					errorCode: 0
				};

				$scope.updateInterval = 5000;

				$interval(function() {
					serverService.readLastPacket().then(function(packet) {
						
						requests = packet.data.result ? 0 : requests + 1;

						$scope.packet = packet.data;

						if (requests > 10 && $scope.packet.errorCode < 10) {
							$scope.packet.errorMessage = 'Where is my packet?';
						}
						if (requests > 30 && $scope.packet.errorCode < 10) {
							$scope.packet.errorMessage = 'Somebody, send me a packet!';
						}

						console.log(packet);

					});
				}, $scope.updateInterval)
	}]);
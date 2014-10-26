'use strict';

angular.module('watson')
	.controller('lastPacketController', 
		['$scope', '$interval', 'serverService', 
			function($scope, $interval, serverService) {

				var packets = [];
		
				$scope.packets = [];
				$scope.packetsCount = 3;

				$scope.sharker = {
					contr: 'start',
					act: false
				};

				$scope.shark = function() {
					if ($scope.sharker.act) {
						$scope.sharker.contr = 'start';
						$scope.sharker.act = false;
						$interval.cancel($scope.sharker.process);
					} else {
						$scope.sharker.contr = 'stop';
						$scope.sharker.act = true;
						if ($scope.updateInterval < 500) {
							$scope.updateInterval = 500;
						}
						$scope.sharker.process = $interval(function() {
								serverService.readLastPackets($scope.packetsCount).then(function(packets) {
								$scope.packets = packets.data;
							});
						}, $scope.updateInterval);
					}
				}

				$scope.updateInterval = 3000;
	}]);
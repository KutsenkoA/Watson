'use strict';

angular.module('watson')
	.service('serverService', ['$http', function($http) {
		return {
			readLastPackets: function(count) {
				return $http.get('/lastpackets/' + count);
			},
			readDataForGraph: function() {
				return $http.get('/graph');
			}
		}
	}]);
'use strict';

angular.module('watson')
	.service('serverService', ['$http', function($http) {
		return {
			readLastPacket: function() {
				return $http.get('/lastpacket');
			}
		}
	}]);
'use strict';

angular.module('watson')
	.service('serverService', ['$http', function($http) {
		return {
			readLastPackets: function(count) {
				return $http.get('/lastpackets/' + count);
			},
			readDataForGraph: function() {
				return $http.get('/graph');
			},
			saveChunk: function(chunk) {
				return $http.put('/chunk', {
					chunk: chunk
				});
			},
			getChunks: function() {
				return $http.get('/chunks');
			}
		}
	}]);
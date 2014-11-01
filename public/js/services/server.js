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
			removeChunk: function(chunk) {
				return $http.delete('/chunk/' + chunk._id);
			},
			getChunks: function() {
				return $http.get('/chunks');
			}
		}
	}]);
'use strict';

angular.module('watson')
	.controller('graphController',
		['$scope', 'serverService', '$interval', function($scope, serverService, $interval) {

			$interval(function() {
				serverService.readDataForGraph()
					.then(function(data) {
						$('#graph-container').highcharts({
        			chart: {
            		type: 'line'
        			},
        			title: {
            		text: 'Temperature in Sanya flat'
        			},
        			xAxis: {
            		categories: ['Time']
        			},
        			yAxis: {
            		title: {
                	text: 'Temperature'
            		}
        			},
        			series: [{
            		name: 'sensor 20',
            		data: data.data
        				}]
    				});
    				console.log(data);
					})
				}, 5000);
		}]);
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
                        categories: ['Time'],
                        tickInterval: 12,
                        type: 'datetime'
                      },
                      yAxis: {
                          title: {
                           text: 'Temperature'
                       }
                   },
                   series: [{
                      name: 'sensor 20',
                      animation: false,
                      data: data.data

                      //pointInterval: 24 * 3600
                  }]
              });
    				console.log(data);
					})
				}, 5000);
		}]);
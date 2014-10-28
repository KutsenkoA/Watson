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
                tickInterval: 3600 * 1000,
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
              }],
              plotOptions: {
                series: {
                  pointInterval: 3600 * 1000
                }
              }
            });
          })
      }, 5000);
		}]);
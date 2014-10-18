'use strict';

angular.module('watson', [])
	.service('dataService', ['$http', function($http) {

  return {
    getData: function() {
      return $http.get('/graph');
    }
  }
}]);

function graphCtrl(dataService) {

  this.cycle = function() {
    
    var graphArea = $('#myChart').get(0).getContext('2d'),
        myChart = new Chart(graphArea);

    dataService.getData().then(function(data) {

    var raw = data.data,
        dataset = [], l = [];

    raw.forEach(function(r) {
      dataset.push(r.value);
      l.push(r.time);
    });

    var chartData = {
      labels: l,
      datasets: [{
        label: "My First dataset",
	fillColor: "rgba(220,220,220,0.2)",
	strokeColor: "rgba(220,220,220,1)",
	pointColor: "rgba(220,220,220,1)",
	pointStrokeColor: "#fff",
	pointHighlightFill: "#fff",
	pointHighlightStroke: "rgba(220,220,220,1)",
        data: dataset
      }]
    };


    console.log(chartData, {
      bezierCurve: true,
      showScale: false,
      animation: false
    });

    myChart.Line(chartData);
  });
  };

  setInterval(this.cycle, 5000);

};

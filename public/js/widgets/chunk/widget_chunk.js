'use strict';

angular.module('watson')
  .directive('widgetChunk', function() {
    return {
      restrict: 'E',
      templateUrl: 'js/widgets/chunk/widget_chunk.html'
    }
  });
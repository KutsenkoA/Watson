'use strict';

angular.module('watson')
  .filter('base', function() {
    return function(input, toBase) {
      if (input) {
        return input.toString(toBase);
      }
    }
  });
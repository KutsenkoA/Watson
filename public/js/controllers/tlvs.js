/**
 * Created by andr on 29.10.14.
 */
'use strict';

angular.module('watson')
    .controller('tlvsController',
    ['$scope', function($scope) {
        $scope.addTLVFormVisible = false;

        $scope.addTLV = function() {
            $scope.addTLVFormVisible = true;
        }
    }]);
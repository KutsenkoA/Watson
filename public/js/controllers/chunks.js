/**
 * Created by andr on 29.10.14.
 */
'use strict';

angular.module('watson')
    .controller('chunksController',
    ['$scope', 'serverService', function($scope, serverService) {
        $scope.addTLVFormVisible = false;

        $scope.addChunk = function() {
            $scope.addTLVFormVisible = true;
        };

        $scope.chunk = {
            name: 'ch',
            typeValue: undefined,
            parse: 0
        };

        $scope.chunks = [];

        $scope.saveChunk = function() {
            serverService.saveChunk($scope.chunk).then(function() {
                $scope.addTLVFormVisible = false;
                fetch();
            }, function(err) {
                console.log(err);
            })
        }

        var fetch = function() {
            serverService.getChunks().then(function (data) {
                $scope.chunks = data.data;
            });
        };

        fetch();

    }]);
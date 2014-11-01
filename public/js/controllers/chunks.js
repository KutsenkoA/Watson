/**
 * Created by andr on 29.10.14.
 * @controller chunksController
 */
'use strict';

angular.module('watson')
  .controller('chunksController',
  ['$scope', 'serverService', function($scope, serverService) {

      var fetch = function() {
          serverService.getChunks().then(function(data) {
              $scope.chunks = data.data;
          });
      };

      $scope.addTLVFormVisible = false;
      $scope.chunks = [];
      $scope.basis = [2, 8, 10, 16];
      $scope.showTypeValueBase = 10;

      $scope.setBase = function(base) {
          $scope.showTypeValueBase = base;
      };

      $scope.addChunk = function() {
          $scope.chunk = {};
          $scope.addTLVFormVisible = true;
      };

      $scope.closeChunk = function() {
          $scope.addTLVFormVisible = false;
          $scope.isEditChunk = false;
          fetch();
      };

      $scope.editChunk = function(chunk) {
          $scope.chunk = chunk;
          $scope.isEditChunk = true;
          $scope.addTLVFormVisible = true;
      };

      $scope.saveChunk = function() {
          serverService.saveChunk($scope.chunk).then(function() {
              $scope.closeChunk();
          }, function(err) {
              console.log(err);
          })
      };

      $scope.removeChunk = function() {
        serverService.removeChunk($scope.chunk).then(function() {
          $scope.closeChunk();
        });
      };

      fetch();
  }]);
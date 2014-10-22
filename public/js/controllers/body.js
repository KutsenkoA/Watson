'use strict';

angular.module('watson')
	.controller('bodyController', ['$scope', function($scope) {

		function toggleSignInDialog() {
			$scope.showSignInDialog = $scope.showSignInDialog ? false : true;
		}

		$scope.toggleSignInDialog = toggleSignInDialog;
	}]);
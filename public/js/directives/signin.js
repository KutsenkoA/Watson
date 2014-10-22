'use strict';

angular.module('watson')
	.directive('signin', function() {
		return {
			restrict: 'C',
			templateUrl: 'js/directives/signin.html',
			link: function($scope) {
				$scope.showSignInDialog = false;
			}
		}
	})
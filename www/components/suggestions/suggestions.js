/**
 * Created by Ibrahim on 1/19/2015.
 */
angular.module('esn')
    .directive('userSuggestions', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/suggestions/user_suggestions.html',
            controller: function ($scope, $Auth, $http) {
                $scope.user = $Auth.getUser('full');
                $scope.user_suggestions = [];
                $scope.user_suggestionsLoading = false;

                var loadSuggestions = function () {
                    $scope.user_suggestionsLoading = true;

                    $http.get('http://imadevelopers.com/esn/users/getusersuggestions.json', {withCredentials: true})
                        .success(function (data) {
                            if (data.result.success) {
                                $scope.user_suggestions = data.result.data;
                                $scope.user_suggestionsLoading = false;

                            } else {
                                console.log(data);
                            }
                        }).error(function (error) {
                            console.log(error);
                        });
                };
                loadSuggestions();
            }

        }
    })  .directive('groupSuggestions', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/suggestions/group_suggestions.html',
            controller: function ($scope, $Auth, $http) {
                $scope.user = $Auth.getUser('full');
                $scope.suggestions = [];
                $scope.suggestionsLoading = false;

                var loadSuggestions = function () {
                    $scope.suggestionsLoading = true;

                    $http.get('http://imadevelopers.com/esn/users/getgroupsuggestions.json', {withCredentials: true})
                        .success(function (data) {
                            if (data.result.success) {
                                $scope.suggestions = data.result.data;
                                $scope.suggestionsLoading = false;

                            } else {
                                console.log(data);
                            }
                        }).error(function (error) {
                            console.log(error);
                        });
                };
                loadSuggestions();
            }

        }
    });
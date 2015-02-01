angular.module('esn')
    .directive('notifications', function () {
        return {
            'restrict': 'E',
            'templateUrl': 'components/notifications/notifications.html',
            'controller': function ($scope, $http, $interval, $Auth) {
                $scope.notifications = [];
                var loadNotifications = function () {
                    return $http.get('http://imadevelopers.com/esn/users/getNotifications.json', {withCredentials: true})
                        .success(function (data) {
                            if (data.result.success) {
                                $scope.notifications = data.result.notifications;
                            } else {
                                console.log(data);
                            }
                        }).error(function (error) {
                            console.log(error);
                        });
                };
                $interval(function () {
                    if ($Auth.isAuthenticated())
                        loadNotifications();
                }, 5000);
            }
        }
    });
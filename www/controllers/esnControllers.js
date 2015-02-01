/**
 * Created by Ibrahim on 8/28/2014.
 */
angular.module('esn').controller('mainCtrl', function ($scope, $http, localStorageService, $Auth, $ionicSideMenuDelegate) {
    $scope.autoLoginInProcess = false;
    var existingUser = window.localStorage['esnUser'];
    if (existingUser != null) {
        $scope.autoLoginInProcess = true;
        var $username = existingUser.username;
        var $password = existingUser.password;
        var login = $Auth.login($username, $password, '/home');
        login.success(function (data) {
            if (data.result.success) {
                $scope.autoLoginInProcess = false;

            } else {
                $scope.autoLoginInProcess = false;
            }
        });
    } else {
        $scope.autoLoginInProcess = false;
    }
    $scope.toggleLeft = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.toggleRight = function () {
        $ionicSideMenuDelegate.toggleRight();
    };

    if (localStorageService.isSupported) {
        var user = localStorageService.get('esnSessionUser');
        console.log(user);
        if (user != null) {
            $Auth.setUserFromSession(user);
            console.log(user);
        }
    } else {
        console.log('Local Storage Not Supported in this Browser');
    }
    var rightMenuSrc = '';
    $scope.getRightMenuSrc = function () {
        return rightMenuSrc;
    };
    $scope.setRightMenuSrc = function ($src) {
        rightMenuSrc = $src;
    };
    $scope.data = {};
    $scope.data.view = '';
    $scope.updateView = function (view, toggle) {
        if (view == 'Profile_Posts') {
            $scope.data.view = './views/profile/posts.html';
        } else if (view == 'Profile_Interests') {
            $scope.data.view = './views/profile/interests.html';
        }
        else if (view == 'Profile_About') {
            $scope.data.view = './views/profile/about.html';
        }
        else if (view == 'Profile_Groups') {
            $scope.data.view = './views/profile/groups.html';
        }
        else if (view == 'Profile_Supervises') {
            $scope.data.view = './views/profile/supervises.html';
        } else if (view == 'Announcements') {
            $scope.data.view = './views/group/announcements.html';
        } else if (view == 'Tasks') {
            $scope.data.view = './views/group/tasks.html';
        }
        else if (view == 'Questions') {
            $scope.data.view = './views/group/questions.html';
        }
        else if (view == 'Posts') {
            $scope.data.view = './views/group/posts.html';
        }
        else if (view == 'Contents') {
            $scope.data.view = './views/group/contents.html';
        }
        else if (view == 'Users') {
            $scope.data.view = './views/group/users.html';
        }
        else if (view == 'Requests') {
            $scope.data.view = './views/group/requests.html';
        }
        if (toggle)
            $scope.toggleRight();

    };

})
    .filter('custom', function () {
        return function (data) {
            for (var i = 1; i < data.length; i++) {
                for (var k = i; k > 0 && data[k]['created'] < data[k - 1]['created']; k--) {
                    var temp = data[k];
                    data[k] = data[k - 1];
                    data[k - 1] = temp;
                }

            }
            return data;

        };


    }).controller('NotificationsController', function ($scope, $http) {
        $scope.notifications = [];
        $scope.loadingNotifications = false;
        $http.get('http://imadevelopers.com/esn/users/getNotifications.json', {withCredentials: true})
            .success(function (data) {
                console.log(data);
                if (data.result.success) {
                    $scope.notifications = data.result.notifications;
                } else {
                    console.log(data);
                }
            }).error(function (error) {
                console.log(error);
            });
        $scope.markRead = function ($notification, $index) {

            return $http.post('http://imadevelopers.com/esn/users/markRead.json', $notification, {withCredentials: true})
                .success(function (data) {
                    if (data.result.success) {
                        $scope.notifications.splice($index, 1);
                    }
                }).error(function (error) {
                    console.log(error);
                });
        };
        $scope.markAll = function () {
            if ($scope.notifications.length > 0) {
                var status = $scope.markRead($scope.notifications[0], 0);
                status.then(function () {
                    $scope.markAll();
                });
            } else {

            }

        }
    });
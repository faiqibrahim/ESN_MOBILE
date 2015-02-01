angular.module('navbar', [])
    .directive('navbar', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/navbar/navbar.html',
            controller: function ($scope, $location, $Auth) {
                $scope.menu = {};
                var $items = [
                    {
                        'title': 'Home', 'position': 'pull-left', 'link': 'home', 'index': 0,
                        'leftIcon': 'ion-cube',
                        'rightIcon': ''
                    },
                    {
                        'title': 'Profile', 'position': 'pull-left', 'link': 'profile', 'index': 1,
                        'leftIcon': 'ion-person',
                        'rightIcon': ''
                    },
                    {
                        'title': 'Inbox', 'position': 'pull-left', 'link': 'inbox', 'index': 2,
                        'leftIcon': 'ion-chatboxes',
                        'rightIcon': ''
                    },
                    {
                        'title': 'Connections', 'position': 'pull-left', 'link': 'connections', 'index': 3,
                        'leftIcon': 'ion-person-stalker',
                        'rightIcon': ''
                    },
                    {
                        'title': 'Create Group', 'position': 'pull-left', 'link': 'create-group', 'index': 4,
                        'leftIcon': 'ion-ionic',
                        'rightIcon': ''
                    },
                    {
                        'title': 'Logout', 'position': 'pull-right', 'link': 'logout', 'index': 5,
                        'leftIcon': 'ion-power',
                        'rightIcon': ''
                    }

                ];

                $scope.menu.items = $items;

                var currentLocation = $items[0];

                $scope.changeLocation = function ($index) {
                    var $path = $scope.menu.items[$index].link;
                    currentLocation = $scope.menu.items[$index];
                    if ($path == 'profile') {

                        $path += '/' + $Auth.getUser('username');
                    }
                    else if ($path == 'logout') {
                        $Auth.logout();
                        $path = 'welcome';
                    }
                    $location.path('/' + $path);
                    $scope.toggleLeft();
                };
                $scope.isAuthenticated = function () {
                    return $Auth.isAuthenticated();
                };
                $scope.getActiveClass = function ($option) {
                    if ($option.title == currentLocation.title) {
                        return 'active-option';
                    }
                    else {
                        return '';
                    }

                }

            }

        }
    });
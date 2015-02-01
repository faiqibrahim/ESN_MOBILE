/**
 * Created by Ibrahim on 11/13/2014.
 */
angular.module('esn').config(function ($stateProvider, $routeProvider, $locationProvider) {

/*
    $stateProvider.state('index',
        {
            url: '/',
            templateUrl: './views/welcome.html'
        });

    $stateProvider.state('welcome',
        {
            url: '/welcome',
            templateUrl: './views/welcome.html'
        });

    $stateProvider.state('home',
        {
            url: '/home',
            templateUrl: './views/home.html'
        });
    $stateProvider.state('connections',
        {
            url: '/connections',
            templateUrl: './views/connections.html'
        });
    $stateProvider.state('profile-userID',
        {
            url: '/profile/:userID',
            templateUrl: './views/profile.html'
        });

    $stateProvider.state('create-group',
        {
            url: '/create-group',
            templateUrl: './views/group-create.html'
        });
    $stateProvider.state('edit-group-group_id',
        {
            url: '/edit-group/:group_id',
            templateUrl: './views/group/edit-group.html'
        });

    $stateProvider.state('inbox',
        {
            url: '/inbox',
            templateUrl: './views/inbox.html'
        });
    $stateProvider.state('inbox-contactId',
        {
            url: '/inbox/:contactId',
            templateUrl: './views/inbox/chatbox.html'
        });

    $stateProvider.state('group-groupId',
        {
            url: '/group/:groupId',
            templateUrl: './views/group.html'
        });
    $stateProvider.state('notifications',
        {
            url: '/notifications',
            templateUrl: './views/notifications.html'
        });
        */

     $routeProvider.when('/', {templateUrl: './views/welcome.html'});

     $routeProvider.when('/welcome', {templateUrl: './views/welcome.html'});

     $routeProvider.when('/home', {templateUrl: './views/home.html'});
     $routeProvider.when('/connections', {templateUrl: './views/connections.html'});
     $routeProvider.when('/profile/:userID', {templateUrl: './views/profile.html'});

     $routeProvider.when('/create-group', {templateUrl: './views/group-create.html'});
     $routeProvider.when('/edit-group/:group_id', {templateUrl: './views/group/edit-group.html'});

     $routeProvider.when('/inbox', {templateUrl: './views/inbox.html'});
     $routeProvider.when('/inbox/:contactId', {templateUrl: './views/inbox/chatbox.html'});

     $routeProvider.when('/group/:groupId', {templateUrl: './views/group.html'});
     $routeProvider.when('/notifications', {templateUrl: './views/notifications.html'});


     $routeProvider.otherwise({templateUrl: 'views/welcome.html'});

    $locationProvider.html5Mode(false);

}).run(function ($rootScope, $location, $Auth) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        if (!$Auth.isAuthenticated()) {
            // no logged user, redirect to /login
            if (next.templateUrl === "./views/welcome.html") {
            } else {
                $location.path("/welcome");
            }
        }
    });
});

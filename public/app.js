var loginApp = angular.module('loginApp', ['ngRoute','ui.grid','ngStorage']);
loginApp.config(function($routeProvider,$httpProvider){
    $routeProvider
    
     .when('/',{
        templateUrl:'partials/login.html',
        controller:'LoginController'
    })
    .when('/signup',{
        templateUrl:'partials/signup.html',
        controller:'SignupController'
    })
    .when('/logout',{
        templateUrl:'partials/logout.html',
        controller:'LogoutController'
    })
    .when('/dashboard',{
        resolve:{
            "check":function($rootScope,$location){
                if($rootScope.loggedin===false){
                    $location.path('/');
                }
            }
        },
       templateUrl:'partials/dashboard.html',
        controller:'DashboardController'
    })
    .otherwise({
        redirectTo:'/'
    });
    
 //  $httpProvider.interceptors.push('authInterceptor');
    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                   
                    if ($localStorage.token) {
                        
                        config.headers['authorization'] = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/');
                    }
                    return $q.reject(response);
                }
            };
        }]);
    
});

loginApp.run(function($rootScope){
    $rootScope.loggedin = false;
})
angular.module('loginApp').factory('authInterceptor', function($q,$localStorage,$location){
    var factory={};
    factory.request= function(config){
        var token=$localStorage.token;
        if(token){
            config.headers.Authorization = 'Bearer '+token;
            return config;
        }
        
    };
    factory.response= function(response){
        return response;
    };
    factory.responseError =function(response){
        if(response.status===401|| response.status===403){
            $location.path('/');
        }
        return $q.reject(response);
    };
    return factory;
});
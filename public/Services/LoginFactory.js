angular.module('loginApp').factory('LoginFactory', function($http,$localStorage){
    var currentuser={};
    function  changeUser(newuser){
        angular.extend(currentuser,newuser);
    }
    function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }
    
     var currentUser = getUserFromToken();
    
    function getUserFromToken(){
        var token =$localStorage.token;
        
        var user={};
        if(typeof token!=='undefined'){
            var encoded = token.split('.')[1];
            user = JSON.parse(urlBase64Decode(encoded));
            
        }
        return user;
    }
    
   var factory={};
    factory.login = function(username,pass){
       return $http.post('/authenticate', {username:username, password:pass}); 
    }
    factory.signup= function(user,email,pass){
        return $http.post('/signup', {username:user, email:email, password:pass});
    }
    factory.logout = function(success){
       changeUser({});
        delete $localStorage.token;
        success();

    }
    return factory;
});
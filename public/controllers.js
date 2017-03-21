angular.module('loginApp').controller('LoginController', function($scope,LoginFactory,$rootScope,$localStorage){
    $scope.status="";
    $scope.success=false;
   $scope.submit = function(){
       LoginFactory.login($scope.username,$scope.password)
       .then(function(response){
          
           $scope.success=response.data.success;
           $scope.status = response.data.message;
           if($scope.success===true){
                $rootScope.loggedin=true;
               //store the json web token in local storage
               $localStorage.token=response.data.token;
               
           }
           
       }, function(data,status,headers,config){
            $rootScope.loggedin=false;
            $scope.success=response.data.success;
           $scope.status = response.data.message;
       });
   }; 
});

angular.module('loginApp').controller('SignupController', function($scope,LoginFactory){
    $scope.submit= function(){
        $scope.status="";
       LoginFactory.signup($scope.username,$scope.email,$scope.password)
       .then(function(response){
           if(response.data.success === true){
               $scope.success=response.data.success;
               $scope.status = response.data.message;
           }
               
           else{
               $scope.status = response.data.message;
           }
           
       }, function(){
           
       });
    }
    
    
    
});

angular.module('loginApp').controller('LogoutController', function($scope,$location,LoginFactory,$rootScope){
    
    LoginFactory.logout(function(){
        $rootScope.loggedin=false;
        $location.path('/');
    }, function(){
        alert('failed to logout');
    });
   
});


angular.module('loginApp').controller('DashboardController', function($scope,BuddiesFactory){
    $scope.gridoptions={enableSorting:true, enableFiltering:true, 
    columnDefs:[
                        {name:'User Name', field:'username'},
                        {name:'First Name', field:'fname'},
                        {name:'Last Name', field:'lname'},
                        {name:'Status', field:'status', enableSorting:false}
                ]
                       };
    
    
     BuddiesFactory.getAllContacts()
        .then(
    function(res){
        $scope.students= res.data;
         $scope.gridoptions.data = $scope.students;
       
        
    },
        function(data,status,header,config){
            $scope.students = null;
            console.log("An error occured while retrieving  buddies list from the server");
        }
    );
         $scope.gridoptions.data = $scope.students;
 
});
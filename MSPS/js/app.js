(function (window) {
    window.__env = window.__env || {};

    // API url
    window.__env.apiUrl = 'https://asca.dev.va.myamerigroup.com/ascaweb/api/';

    //window.__env.apiUrl = 'https://asca.dev.va.myamerigroup.com/ascaweb/api/';

    // Base url
    window.__env.baseUrl = 'http://application.taisoftware.com/ascaweb/api/members/';

    // Whether or not to enable debug mode
    // Setting this to false will disable console output
    window.__env.enableDebug = true;
    $.ajax({url:'API/api.json', 
      success: function(data){initNg('test');},
      error: function(err){}
    });
   // initNg('test');
    
}(this));

 function appendScripts(state) {
            var controllers = [ 'test'], script = '';        
            
            controllers.forEach(function (ctrl) {
                script = document.createElement('script');
                script.src = "js/"+state+"/"+ctrl+".js";
               $('body').append(script);
            });
           
        }
function initNg(state){

'use strict';
var routeProvider;
angular.module('MSPS', ['ngRoute', 'ngIdle'])
  .config(function ($routeProvider, IdleProvider, KeepaliveProvider) {
     IdleProvider.idle(20);
    IdleProvider.timeout(5);
    KeepaliveProvider.interval(10);
    routeProvider = $routeProvider;
     
  }).run(function($rootScope, $q){
    $rootScope.state = 'test';
    console.log($rootScope.state);
     var resolveController = function(path) {
          var deferred = $q.defer();
          var script = document.createElement('script');
          script.src = path;
          script.onload = function() {
              $rootScope.$apply(deferred.resolve());
          };
          document.body.appendChild(script);
          return deferred.promise;
      };
    routeProvider   
    .when('/', {
       templateUrl: 'views/home.html'
    }).when('/about', {
       templateUrl: 'views/about.html'
    }).when('/clients', {
       templateUrl: 'views/clients.html'
    }).when('/contactus', {
       templateUrl: 'views/contactus.html'
    }).when('/blog', {
       templateUrl: 'views/blog.html'
    }).when('/careers', {
       templateUrl: 'views/careers.html'
    }).when('/softwareDvelopment', {
       templateUrl: 'views/softwareDvelopment.html'
    }).when('/softwareConsultancy', {
       templateUrl: 'views/softwareConsultancy.html'
    }).when('/cloud', {
       templateUrl: 'views/cloud.html'
    }).when('/softwareSupport', {
       templateUrl: 'views/softwareSupport.html'
    }).when('/infrastructureManagement', {
       templateUrl: 'views/infrastructureManagement.html'
    }).when('/test', {
       templateUrl: 'views/test.html',
       resolve: resolveController('js/test/test.js')
    });
  }).controller('navCtrl', function ($scope,$location, $timeout) {
    $scope.isLoading = false;
    $scope.path = $location.$$path;
    $scope.model = {sessionLogoutTimeInMinutes:1, sessionWarningTimeInMinutes:2}
    $scope.test = function(){
      $scope.isLoading = true;
      $timeout(function(){$scope.isLoading = false;}, 2000);
    }
  });
  /*.controller('idleCtrl', function ($scope, Idle, Keepalive) {
        $scope.started = true;

        function closeModals() {
            if ($scope.warning) {
                $scope.warning = false;
            }

            if ($scope.timedout) {
                $scope.timedout = false;
            }
        }

        $scope.$on('IdleStart', function () {
            closeModals();

            $scope.warning = true;
        });

        $scope.$on('IdleEnd', function () {
            closeModals();
        });

        $scope.$on('IdleTimeout', function () {
            closeModals();
            $scope.timedout = true;
        });

        $scope.start = function () {
            closeModals();
            Idle.watch();
            $scope.started = true;
        };

        $scope.stop = function () {
            closeModals();
            Idle.unwatch();
            $scope.started = false;

        };
        $scope.start();
    });
*/
  
}
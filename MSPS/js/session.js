//angular.module('uitk.component.sessionTimeout', ['uitk.component.uitkDialog','pascalprecht.translate'])
angular.module('MSPS').directive('uitkSessionTimeout', function ($timeout, $interval, $http, $window) {

            var controller = function(ENV){

            };

            return {
                restrict: 'E',
                replace: true,
                scope:{
                    model:'='
                },
                controller: controller,
                link: function($scope, $element){
                    if(!$scope.model){
                        $scope.model = {};
                    }
                    if(!$scope.model.sessionTimeoutUrl){
                        $scope.model.sessionTimeoutUrl = '/sessionexpired';
                    }
                    if(!$scope.model.sessionWarningTimeInMinutes){
                        $scope.model.sessionWarningTimeInMinutes = 20; // time is in minutes
                    }
                    if(!$scope.model.sessionLogoutTimeInMinutes){
                        $scope.model.sessionLogoutTimeInMinutes = 30; // time is in minutes
                    }

                    $scope.model.sessionLogoutFunction = $scope.model.sessionLogoutFunction || function(){};
                    $scope.model.show = false;
                    $scope.warningTime = undefined;
                    $scope.model.serverRefreshLocation = $scope.model.serverRefreshLocation || $window.location.href;


                    //Reduce client time by 1 min to give server additional minute before timeout.
                    $scope.model.sessionLogoutTimeInMinutes -= 1;

                    var decrementPromise;
                    var flag = 0;
                    var remainingMinutes = 0, remainingSeconds = 0;

                    // set minutes
                    var mins = ($scope.model.sessionLogoutTimeInMinutes - $scope.model.sessionWarningTimeInMinutes);
                    // calculate the seconds
                    var secs = mins * 60;
                    var serverTimerPromise; // keep track of last time we called the server
                    var serverTimeRemaining = $scope.model.sessionLogoutTimeInMinutes * 60000;

                    function idleLogout() {
                        var timeupPromise;
                        window.onload = resetTimer;
                        window.onmousemove = resetTimer;
                        window.onmousedown = resetTimer; // catches touchscreen presses
                        window.onclick = resetTimer; // catches touchpad clicks
                        window.onscroll = resetTimer; // catches scrolling with arrow keys
                        window.onkeypress = resetTimer;

                        function timeup() {
                            $scope.warningTime = undefined;
                            $scope.model.show = true;
                            countdown();
                        }

                        function resetTimer() {

                            //If modal window is displayed then do not reset timer on mouse move/click event
                            if(decrementPromise !== undefined && decrementPromise.$$state.value === undefined){
                                return;
                            }

                            $timeout.cancel(timeupPromise);
                            timeupPromise = $timeout(timeup,getTimeInMillis($scope.model.sessionWarningTimeInMinutes));
                            checkServerSession();
                        }
                        resetTimer();
                        startServerTimer();
                    }

                    function startServerTimer(){
                        serverTimerPromise = $interval(function() {
                            serverTimeRemaining-=1000; //Decrement by 1000 ms
                        }, 1000);
                    }

                    function checkServerSession(){
                        if (serverTimeRemaining < 20000) { // 20 seconds remaining, make a server call
                            resetServerSession();
                        }
                    }

                    // This function will be called when warning time starts
                    function countdown() {
                        $interval.cancel(decrementPromise);
                        decrementPromise = $interval(decrement, 1000);
                        flag = 0;
                    }

                    $scope.clearCountDown = function() {
                        $interval.cancel(decrementPromise);

                        $scope.model.show = false;
                        mins = ($scope.model.sessionLogoutTimeInMinutes - $scope.model.sessionWarningTimeInMinutes);
                        secs = mins * 60;
                        flag = 1;
                        resetServerSession();
                    }

                    function resetServerSession() {
                        $interval.cancel(serverTimerPromise);
                        // Make AJAX call
                        try {
                            $http.get($window.location.href);

                            serverTimeRemaining = getTimeInMillis($scope.model.sessionLogoutTimeInMinutes);
                            startServerTimer();
                        } catch (e) {
                            throw {
                                name : 'Exception',
                                message : e
                            };
                        }
                    }

                    function forwardToSessionExpiration(){
                        $scope.model.sessionLogoutFunction();
                    }

                    function decrement() {
                        checkServerSession();
                        remainingMinutes = getMinutes();
                        remainingSeconds = getSeconds();
                        secs--;

                        if (remainingSeconds < 10) {
                            remainingSeconds = "0" + remainingSeconds;
                        }

                        $scope.warningTime = remainingMinutes + ":" + remainingSeconds;

                        if (flag == 0) {
                            if (remainingMinutes == 0 && remainingSeconds == 0) {
                                // Time up
                                $interval.cancel(decrementPromise);
                                $timeout(forwardToSessionExpiration,5000);
                            }
                        }
                    }

                    function getMinutes() {
                        // minutes is seconds divided by 60, rounded down
                        mins = Math.floor(secs / 60);
                        return mins;
                    }
                    function getSeconds() {
                        // take mins remaining (as seconds) away from total seconds remaining
                        return secs - Math.round(mins * 60);
                    }

                    function getTimeInMillis(minutes){
                        return (minutes * 60 * 1000);
                    }


                    $scope.logout = forwardToSessionExpiration;
                    idleLogout();
                },
                template: [
                    '<div ng-show="warningTime !== undefined">',
                    '<uitk:dialog dialog-id="session-timeout-lightbox" dialog-role="dialog" header-text="Session About to Expire" show="model.show" default-width="30%" call-back-hide="clearCountDown" style="width:30%" default-height="40%">',
                    '<div class="tk-panl-content">',
                    'Your session will expire in <span style="font-weight:bold;" id="time-remaining">{{warningTime}}</span> minutes due to inactivity.',
                    '<div class="tk-margin-top-1t">Click Continue to remain signed in.</div>',
                    '<div class="tk-margin-top-1t">',
                    '<uitk:button type="button" value="Continue" enable-default="true" ng-click="clearCountDown()" custom-class="uitk-width-7t tk-margin-bottom-1t tk-margin-top-2t"></uitk:button>',
                    '<uitk:button type="button" value="Logout" enable-default="true" ng-click="logout()" custom-class="uitk-width-7t tk-margin-bottom-1t tk-margin-top-2t"></uitk:button>',
                    '</div>',
                    '</div>',
                    '</uitk:dialog>',
                    '</div>',
                ].join('')
            };
        });

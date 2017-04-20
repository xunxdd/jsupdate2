(function (angular) {
  'use strict';

  angular
    .module('JobStalker.main')
    .controller('appLogin', LoginCtrl);

  LoginCtrl.$inject = ['$scope', '$state', '$window', 'AuthSrv'];
  function LoginCtrl($scope, $state, $window, AuthSrv) {

    var ctrl = this;

    ctrl.login = login;
    ctrl.invaidUser = false;
    function login() {
      AuthSrv.login(ctrl.uid, ctrl.pwd).then(function (response) {
        $window.location.href = "http://jobstalker.net/landing.aspx?key=" + response.data;
      }, function (error) {
        ctrl.invaidUser = true;
      });
    }
  }

}(angular));

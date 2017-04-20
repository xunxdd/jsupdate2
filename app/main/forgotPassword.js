(function (angular) {
  'use strict';

  angular
    .module('JobStalker.main')
    .controller('appForgotPwd', ForgotPwdCtrl);

  ForgotPwdCtrl.$inject = ['$scope','$state', 'AuthSrv'];
  function ForgotPwdCtrl($scope, $state,  AuthSrv) {

    var ctrl = this;

    ctrl.retrievePassword = retrievePassword;

    ctrl.error = false;
    ctrl.success = false;

    function retrievePassword() {
        AuthSrv.retrievePassword(ctrl.email).then(function () {
          ctrl.success = true;
        }, function (error) {
          ctrl.error = error.data;
        })
    }
  }

}(angular));

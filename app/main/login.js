(function (angular) {
  'use strict';

  angular
    .module('JobStalker.login')
    .controller('appLogin', LoginCtrl);

  LoginCtrl.$inject = ['$scope','$state'];
  function LoginCtrl($scope, $state) {

    var ctrl = this;

    init();

    function init() {
    }

  }

}(angular));

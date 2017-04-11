(function(angular) {
  'use strict';

  angular
    .module('JobStalker.main')
    .controller('appMain', MainCtrl);

  MainCtrl.$inject = ['$state', '$stateParams'];
  function MainCtrl($state, $stateParams) {

    var ctrl = this;

    init();

    function init() {

    }
  }

}(angular));

(function(angular) {
  'use strict';

  angular
    .module('JobStalker.main')
    .controller('appTopSearch', AppTopSearchCtrl);

  AppTopSearchCtrl.$inject = ['$state', '$stateParams', 'SearchSrv', '$rootScope'];
  function AppTopSearchCtrl($state, $stateParams, SearchSrv, $rootScope) {

    var ctrl = this;
    ctrl.search = search;
    init();

    function init() {

    }

    function search() {
      SearchSrv.setSearchData();
      $state.go('app.jobList');
      $rootScope.$broadcast('jobsearchUpdated');
    }
  }

}(angular));

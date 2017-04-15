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
      var place = angular.copy(ctrl.place) ;
      SearchSrv.setSearchData(ctrl.title, place).then(function () {
        $rootScope.$broadcast('jobsearchUpdated');
        $state.go('app.jobList');
      });
    }
  }

}(angular));

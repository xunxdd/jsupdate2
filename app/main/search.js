(function(angular) {
  'use strict';

  angular
    .module('JobStalker.main')
    .controller('appSearch', AppSearchCtrl);

  AppSearchCtrl.$inject = ['$state', '$stateParams', '$rootScope', 'SearchSrv'];
  function AppSearchCtrl($state, $stateParams, $rootScope, SearchSrv) {

    var ctrl = this;
    
    ctrl.search = search;
    init();

    function init() {

    }
    
    function search() {
      var place = ctrl.place;
      SearchSrv.setSearchData(ctrl.title, place, ctrl.fullAddress).then(function () {
        $rootScope.$broadcast('jobsearchUpdated');
        $state.go('app.jobList');
      });
    }
  }

}(angular));

(function(angular) {
  'use strict';

  angular
    .module('JobStalker.main')
    .controller('appSearch', AppSearchCtrl);

  AppSearchCtrl.$inject = ['$state', '$stateParams', 'SearchSrv'];
  function AppSearchCtrl($state, $stateParams, SearchSrv) {

    var ctrl = this;
    
    ctrl.search = search;
    init();

    function init() {

    }
    
    function search() {
      SearchSrv.setSearchData();
      $state.go('app.jobList');
    }
  }

}(angular));

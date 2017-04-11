(function (angular) {
  'use strict';

  angular
    .module('JobStalker.main')
    .controller('appJobList', JobListCtrl);

  JobListCtrl.$inject = ['$state', '$stateParams', 'SearchSrv', '_'];
  function JobListCtrl($state, $stateParams, SearchSrv, _) {

    var ctrl = this;

    ctrl.getSearchData = getSearchData;
    ctrl.getSearchDataTotal = getSearchDataTotal;
    
    function getSearchData() {
      return _.take(SearchSrv.getSearchData().data, 100);
    }
    
    function getSearchDataTotal() {
      return SearchSrv.getSearchData().total;
    }
    
  }

}(angular));

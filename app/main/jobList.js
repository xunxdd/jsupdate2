(function (angular) {
  'use strict';

  angular
    .module('JobStalker.main')
    .controller('appJobList', JobListCtrl);

  JobListCtrl.$inject = ['$state', '$stateParams', 'SearchSrv', '_'];
  function JobListCtrl($state, $stateParams, SearchSrv, _) {

    var ctrl = this;

    ctrl.getSearchData = getSearchData;
    ctrl.filterJobs = filterJobs;
    ctrl.clearFilter = clearFilter;

    init();
    
    function init() {
      ctrl.pagination = {
        total: 0,
        current: 1, 
        size: 100
      };  
      
      ctrl.jobTitleGroupShow = true;
      ctrl.stateGroupShow = true;
      ctrl.companyGroupShow = true;
    }
    
    function getSearchData() {
      var data = SearchSrv.getSearchData();
      if (!data) {
        return [];
      }
      var currentPage = ctrl.pagination.current, 
          size = ctrl.pagination.size;
      ctrl.pagination.total = data.total;
      ctrl.companyGroups = data.companyGroups;
      ctrl.stateGroups = data.stateGroups;
      ctrl.jobTitleGroups = data.jobTitleGroups;

      return _.slice(data.data, (currentPage -1) * size , currentPage * size);
    }

    function filterJobs() {

    }

    function clearFilter() {

    }

  }

}(angular));

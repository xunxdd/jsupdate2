(function (angular) {
  'use strict';

  angular
    .module('JobStalker.main')
    .controller('appJobList', JobListCtrl);

  JobListCtrl.$inject = ['$scope', 'SearchSrv', '_'];
  function JobListCtrl($scope, SearchSrv, _) {

    var ctrl = this;

    ctrl.getSearchData = getSearchData;
    ctrl.onFilter = onFilter;
    ctrl.clearFilter = clearFilter;

    init();

    function init() {
      $scope.$on('jobsearchUpdated', function () {
        initData();
      });

      initData();
    }

    function initData() {
      ctrl.pagination = {
        total: 0,
        current: 1,
        size: 100,
        start: 0,
        end: 0
      };

      ctrl.searchData = getSearchData();
    }

    function getSearchData(jobsData) {
      var data = jobsData || SearchSrv.getSearchData(),
        start,
        end;

      if (!data) {
        return [];
      }
      var currentPage = ctrl.pagination.current,
        size = ctrl.pagination.size;
      ctrl.pagination.total = data.total;

      ctrl.companyGroups = data.companyGroups;
      ctrl.locationGroups = data.locationGroups;
      ctrl.milesGroups = data.milesGroups;

      start = ((currentPage - 1) * size) + 1;
      end = Math.min(data.total, currentPage * size);

      ctrl.pagination.start = start;
      ctrl.pagination.end = end;

      return _.slice(data.data, (start -1), end);
    }

    function onFilter(jobGroup, groupName) {
      console.log(jobGroup, groupName);
      // ctrl.searchData = getSearchData(jobGroup.);
    }

    function clearFilter() {

    }

  }

}(angular));

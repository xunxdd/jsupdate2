(function (angular) {
  'use strict';

  angular
    .module('JobStalker.main')
    .controller('appJobList', JobListCtrl);

  JobListCtrl.$inject = ['$scope', '$stateParams', 'SearchSrv', '_'];
  function JobListCtrl($scope, $stateParams, SearchSrv, _) {

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
    //  getIndeedData();
    }

    function getSearchData(jobsData) {
      var data = jobsData || SearchSrv.getSearchData(),
        start,
        end;

      if (!data) {
        return [];
      }
      var jobs = _.map(data.jobs, function (job) {
          job.imgSrc = job.src === 'indeed'? 'indeed.png': 'cortech.png';
          return job;
      });

      var currentPage = ctrl.pagination.current,
        size = ctrl.pagination.size;

      ctrl.jobs = jobs;
      ctrl.pagination.total = data.total;

      ctrl.groups = data.groups;

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

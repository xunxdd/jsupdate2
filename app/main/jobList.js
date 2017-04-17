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
    ctrl.updatePage = updatePage;

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

    function updatePage() {

      var start,
        end,
        currentPage = _.get(ctrl.pagination, 'current', 0),
        size = ctrl.pagination.size;

      start = ((currentPage - 1) * size) + 1;
      end = Math.min(ctrl.allJobs.length, currentPage * size);

      ctrl.pagination.start = start;
      ctrl.pagination.end = end;

      ctrl.jobs = _.slice(ctrl.allJobs, (start - 1), end);
    }

    function getSearchData(jobsData) {
      var data = jobsData || SearchSrv.getSearchData();

      if (!data) {
        return [];
      }
      var jobs = _.map(data.jobs, function (job) {
        job.imgSrc = job.src === 'indeed' ? 'indeed.png' : 'jobstalker.png';
        return job;
      });

      ctrl.allJobs = jobs;
      ctrl.pagination.total = data.total;

      ctrl.groups = data.groups;

      updatePage();
    }

    function onFilter(jobGroup, groupName) {
    }

    function clearFilter() {

    }

  }

}(angular));

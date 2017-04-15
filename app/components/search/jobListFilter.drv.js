(function (angular) {
  'use strict';

  angular.module('JobStalker.search')
    .directive('jobListFilter', jobListFilter);

  function jobListFilter() {
    return {
      replace: true,
      scope: {
        groups: '=',
        groupName: '@',
        onFilter: '&',
        clearFilter: '&'
      },
      templateUrl: 'components/search/jobListFilter.html',
      controller: jobListFilterCtrl,
      bindToController: true,
      controllerAs: 'vm'
    };

    jobListFilterCtrl.$inject = [];
    function jobListFilterCtrl() {
      var vm = this;

      vm.onFilterJobs = function (g, name) {
      };
      init();

      function init() {
        vm.showGroup = true;
      }
    }
  }

}(angular));
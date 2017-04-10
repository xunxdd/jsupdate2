(function (angular) {
  'use strict';

  angular.module('JobStalker.search')
    .directive('jobSearch', jobSearch);

  function jobSearch() {
    return {
      templateUrl: 'components/search/search.html',
      replace: true,
      scope: {},
      bindToController: true,
      controller: searchCtrl,
      controllerAs: 'vm'
    }
  }

  searchCtrl.$inject = [];
  function searchCtrl() {
    var vm = this;
    vm.onAdvancedSearch = onAdvancedSearch;
  
    function onAdvancedSearch() {
      
    }
  }

}(angular));
(function (angular) {
  'use strict';

  'use strict';

  angular.module('JobStalker.search')
    .directive('headerSearch', headerSearch);

  function headerSearch() {
    return {
      templateUrl: 'components/search/headerSearch.html',
      scope: {},
      bindToController: true,
      controller: 'searchCtrl',
      controllerAs: 'vm',
      restrict: 'E'
    }
  }

  searchCtrl.$inject = [];
  function searchCtrl() {
    var vm = this;
    this.address = {};
  }

}(angular));
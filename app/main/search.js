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
      var place = ctrl.place,
          address = ctrl.fullAddress;
      if (address) {
         address = address.toLowerCase().replace(', united states', '').replace(', usa', '');
      }

      SearchSrv.setSearchData(ctrl.title, place, address).then(function () {
        $rootScope.$broadcast('jobsearchUpdated');
        $state.go('app.jobList', {title: ctrl.title, location: address});
      });
    }
  }

}(angular));

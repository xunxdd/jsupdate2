(function (angular) {
  'use strict';

  angular
    .module('JobStalker.main')
    .controller('appTopSearch', AppTopSearchCtrl);

  AppTopSearchCtrl.$inject = ['$state', '$stateParams', 'SearchSrv', '$rootScope'];
  function AppTopSearchCtrl($state, $stateParams, SearchSrv, $rootScope) {

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
      var place = angular.copy(ctrl.place),
        address = ctrl.fullAddress;

      if (address) {
        address = address.toLowerCase().replace(', united states', '').replace(', usa', '');
      }
      SearchSrv.setSearchData(ctrl.title, place, address).then(function () {
        $rootScope.$broadcast('jobsearchUpdated');
        $state.go('app.jobList', {title: ctrl.title, location: address}, {reload: true});
      });
    }
  }

}(angular));

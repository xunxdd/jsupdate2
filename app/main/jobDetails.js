(function (angular) {
  'use strict';

  angular
    .module('JobStalker.main')
    .controller('appJobDetails', JobDetailsCtrl);

  JobDetailsCtrl.$inject = ['$scope','$state', '$stateParams', 'SearchSrv', '_'];
  function JobDetailsCtrl($scope, $state, $stateParams , SearchSrv, _) {

    var ctrl = this;

    init();

    function init() {
      var id = $stateParams.id;

      if (!id) {
        return $state.go('app.main');
      }

      SearchSrv.getJobDetails(id).then(function (data) {
         ctrl.data = data;
      });
    }

  }

}(angular));

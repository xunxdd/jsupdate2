(function (angular) {
  'use strict';

  angular
    .module('JobStalker.main')
    .controller('appJobDetails', JobDetailsCtrl);

  JobDetailsCtrl.$inject = ['$scope','$state', '$stateParams', 'JobDetailsSrv', '_'];
  function JobDetailsCtrl($scope, $state, $stateParams , JobDetailsSrv, _) {

    var ctrl = this;

    init();

    function init() {
      var id = $stateParams.id;

      if (!id) {
        return $state.go('app.main');
      }

      JobDetailsSrv.getJobDetails(id).then(function (data) {
         ctrl.data = data;
      });
    }

  }

}(angular));

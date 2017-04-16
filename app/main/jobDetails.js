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
      var companyName = $stateParams.cname;

      if (!id) {
        return $state.go('app.main');
      }

      ctrl.companyName = companyName;
      ctrl.img = companyName.toLowerCase().indexOf('cortech') >=0? 'cortechllc.png' :'';
      JobDetailsSrv.getJobDetails(id).then(function (data) {
         ctrl.data = data;
      });
    }

  }

}(angular));

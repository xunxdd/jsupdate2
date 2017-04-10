(function (angular) {
  'use strict';

  angular.module('JobStalker.search')
    .directive('advanceSearch', advanceSearch);

  function advanceSearch() {
    return {
      replace: true,
      scope: {
      },
      templateUrl: 'components/search/advanceSearch.html',
      controller: advanceSearchCtrl,
      bindToController: true,
      controllerAs: 'vm'
    };

    searchCtrl.$inject = ['$uibModal'];
    function advanceSearchCtrl($uibModal) {
      var vm = this;
      
      vm.onAdvancedSearch =onAdvancedSearch;
      
      function onAdvancedSearch() {
        var modalInstance = $uibModal.open({
          templateUrl: 'components/search/advanceSearchModal.html',
          controller: ModalInstanceCtrl,
          controllerAs: '$ctrl',
          size:'lg',
          backdrop: true,
          resolve: {
            items: function () {
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          vm.selected = selectedItem;
        });
      }
      
      function ModalInstanceCtrl() {
        
      }
    }
  }

}(angular));
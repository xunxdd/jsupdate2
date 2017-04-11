(function (angular) {
  'use strict';

  angular.module('JobStalker.search')
    .directive('googlePlaceSearch', GooglePlaceSearch);

  function GooglePlaceSearch() {
    return {
      require: 'ngModel',
      replace: true,
      scope: {
        ngModel: '=',
        place: '=',
        cls: '@'
      },
      template: '<input class="form-control {{cls}}" type="text">',
      link: function(scope, element, attrs, model) {
        var options = {
          types: [],
          componentRestrictions: {}
        };

        var autocomplete = new google.maps.places.Autocomplete(element[0], options);

        google.maps.event.addListener(autocomplete, 'place_changed', function() {
          scope.$apply(function() {
            scope.place = autocomplete.getPlace();
          });
        });
      }
    }
  }

  searchCtrl.$inject = [];
  function searchCtrl() {

  }

}(angular));
(function (angular) {

  'use strict';

  angular
    .module('JobStalker')
    .config(routes);

  /*jshint unused: false*/

  routes.$inject = ['$stateProvider', '$urlRouterProvider'];
  function routes($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true
      })
      .state('app.main', {
        'url': '/main',
        'views': {
          'header@': {
            'templateUrl': 'main/search.html'
          },
          '@': {
            'templateUrl': 'main/main.html',
            'controllerAs': 'vm'
          }
        }

      });

    $urlRouterProvider.otherwise('app/main');

  }

})(angular);

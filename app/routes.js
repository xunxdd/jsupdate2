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
            controller: 'appSearch',
            bindToController: true,
            controllerAs: 'vm',
            'templateUrl': 'main/search.html'
          },
          '@': {
            'templateUrl': 'main/main.html',
            controller: 'appMain',
            bindToController: true,
            controllerAs: 'vm'
          }
        }
      })
      .state('app.jobList', {

        'url': '/joblist',
        'views': {
          'header@': {
            controller: 'appTopSearch',
            bindToController: true,
            controllerAs: 'vm',
            'templateUrl': 'main/searchTop.html'
          },
          '@': {
            'templateUrl': 'main/jobList.html',
            'controllerAs': 'vm',
            controller: 'appJobList',
            bindToController: true
          }
        }
      });

    $urlRouterProvider.otherwise('app/main');

  }

})(angular);

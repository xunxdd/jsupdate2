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

          'url': '/joblist?{title}&{location}',
          'params': {
            title: '',
            location: ''
          },
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
        })
        .state('app.jobs', {
          'url': '/jobs?{title}&{location}',
          'params': {
            title: '',
            location: '',
            geocode: true
          },
          'views': {
            'header@': {
              template: ''
            },
            '@': {
              templateUrl: 'main/jobList.html',
              controllerAs: 'vm',
              controller: 'appJobList',
              bindToController: true
            }
          }
        })
        .state('app.jobdetails', {
          'url': '/jobdetails/:id/:cname',
          'views': {
            'header@': {
              controller: 'appTopSearch',
              bindToController: true,
              controllerAs: 'vm',
              'templateUrl': 'main/searchTop.html'
            },
            '@': {
              'templateUrl': 'main/jobDetails.html',
              'controllerAs': 'vm',
              controller: 'appJobDetails',
              bindToController: true
            }
          }
        })
        .state('app.login', {
          'url': '/login',
          'views': {
            'header@': {
              'templateUrl': 'main/noSearch.html'
            },
            '@': {
              'templateUrl': 'main/login.html',
              'controllerAs': 'vm',
              controller: 'appLogin',
              bindToController: true
            }
          }
        })
        .state('app.forgotPassword', {
          'url': '/forgotPassword',
          'views': {
            'header@': {
              'templateUrl': 'main/noSearch.html'
            },
            '@': {
              'templateUrl': 'main/forgotPassword.html',
              'controllerAs': 'vm',
              controller: 'appForgotPwd',
              bindToController: true
            }
          }
        });

      $urlRouterProvider.otherwise('app/main');

    }

  })(angular);

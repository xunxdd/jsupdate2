'use strict';

// Declare app level module which depends on views, and components
angular.module('JobStalker',
  [
    "ui.router",
    'ui.bootstrap',
    "JobStalker.search",
    "JobStalker.main",
    "JobStalker.services"
  ])
  .constant('_', window._)
  // use in views, ng-repeat="x in _.range(3)"
  .run(function ($rootScope) {
    $rootScope._ = window._;
  });
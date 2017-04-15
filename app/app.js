'use strict';

// Declare app level module which depends on views, and components
angular.module('JobStalker',
  [
    "ui.router",
    'ui.bootstrap',
    'LocalStorageModule',
    "JobStalker.search",
    "JobStalker.main",
    "JobStalker.services"
  ])
  .constant('_', window._)
  .run(function ($rootScope) {
    $rootScope._ = window._;
  });
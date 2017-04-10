'use strict';

angular.module('jobStalker.version', [
  'jobStalker.version.interpolate-filter',
  'jobStalker.version.version-directive'
])

.value('version', '0.1');

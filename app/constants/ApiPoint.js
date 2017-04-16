(function () {
  'use strict';

  angular
    .module('JobStalker')
    .constant('ApiEndPoint', {
      apiUrl: 'http://jobstalker.net/jobstalker/jobstalker/api/',
      indeedApi: 'http://api.indeed.com/ads/apisearch?publisher=8142814049767213&sort=&radius=25&st=&jt=&start=&limit=25&fromage=&co=us&v=2&format=json'
    });

})();

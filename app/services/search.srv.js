(function (angular) {
  'use strict';

  angular
    .module('JobStalker.services')
    .service('SearchSrv', SearchSrv);

  SearchSrv.$inject = ['$log', '$q', 'ApiEndPoint'];
  function SearchSrv($log, $q, ApiEndPoint) {

    var srv = this;
    var apiHost = ApiEndPoint.apiUrl;
    var testData = {

    };
    srv.getSearchData = getSearchData;
    srv.setSearchData = setSearchData;
   
    /**implementation**/

    function getSearchData() {
      return srv.searchData;
    }
   
    function setSearchData(){
      var i, searchData = [];
      for (i = 0 ; i< 10000; i++) {
        searchData.push({
          jobTitle: 'test title ' + i,
          companyName: 'test company ' + i,
          location: 'test location ' + i,
          state: 'state' + (i%2),
          description: 'Back-end development experience in PHP 5, and a strong understanding of Object Oriented Programming within an MVC framework'
        });
      }
      srv.searchData = {
        data: searchData, 
        total: searchData.length, 
        criteria: {title: 'abc', location: 'everywhere'}
      };
    }

    function getDataFromHttpHost(url, success, failure) {
      return $http({
        method: 'GET',
        url: url
      });
    }
  }
})(angular);

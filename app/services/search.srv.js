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
          id: i,
          jobTitle: 'test title ' + (i % 6),
          companyName: 'test company ' + (i % 4),
          location: 'test location ' + (i % 4),
          state: 'state' + (i%2),
          description: 'Back-end development experience in PHP 5, and a strong understanding of Object Oriented Programming within an MVC framework'
        });
      }

      srv.searchData = {
        data: searchData, 
        total: searchData.length, 
        criteria: {title: 'abc', location: 'everywhere'},
        companyGroups: getGroupByArray(searchData, 'companyName'),
        stateGroups: getGroupByArray(searchData, 'state'),
        jobTitleGroups: getGroupByArray(searchData, 'jobTitle')
      };

    }

    function getGroupByArray(data, groupBy) {
      var groups = _.groupBy(data, groupBy);
      var array = _.map(_.keys(groups), function (key) {
        return {
          key: key,
          group: groups[key]
        }
      });
      return array;
    }
    
    function getDataFromHttpHost(url, success, failure) {
      return $http({
        method: 'GET',
        url: url
      });
    }
  }
})(angular);

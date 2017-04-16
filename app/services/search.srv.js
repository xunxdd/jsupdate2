(function (angular) {
  'use strict';

  angular
    .module('JobStalker.services')
    .service('SearchSrv', SearchSrv);

  SearchSrv.$inject = ['$log', '$q', '$http', 'localStorageService', 'ApiEndPoint', 'SearchResultHandler'];
  function SearchSrv($log, $q, $http, localStorageService, ApiEndPoint, SearchResultHandler) {

    var srv = this;
    var apiHost = ApiEndPoint.apiUrl;
    var searchDataKey = 'js_searchdata';
    var searchData = [];
    var searchDataCombined = {};

    srv.getSearchData = getSearchData;
    srv.setSearchData = setSearchData;

    /**implementation**/
    srv.debug = false;

    function getSearchData() {
      return localStorageService.get(searchDataKey) || searchDataCombined;
    }

    function setSearchData(title, place, address) {
      var lat, lng,
        promises =[],
        indeedResults;

      resetData();

      if (_.get(place, 'geometry.location', null)) {
        lat = place.geometry.location.lat();
        lng = place.geometry.location.lng();
      }

      var corTechResults = getCorTechData(title, lat, lng);

      promises.push(corTechResults);

      if (title && address) {

        for (var i= 0; i< 10;i++) {
          indeedResults = getIndeedData(title, address, i);
          promises.push(indeedResults);
        }
      }

      return $q.all(promises).then(function (response) {
        processSearchData(title, location);
      });
    }

    function resetData() {

      searchData = [];
      localStorageService.set(searchDataKey, null);

    }

    function processSearchData(title, location) {
      var jobsCombined = angular.copy(searchData);
      var groups = [];

      jobsCombined = _.sortBy(jobsCombined, 'src');
      groups.push (getGroups(searchData, 'src', 'Job Sources'));
      groups.push (getGroups(searchData, 'company', 'Companies'));
      groups.push (getGroups(searchData, 'location', 'Locations'));
      groups.push ({
        name: 'Distance',
        group: SearchResultHandler.getMilesGroup(searchData)
      });

      searchDataCombined = {
        jobs: jobsCombined,
        total: jobsCombined.length,
        criteria: {title: title, location: location},
        groups: groups
      };

      localStorageService.set(searchDataKey, searchDataCombined);
    }

    function getGroups(searchData, groupBy, groupName) {
        var group = SearchResultHandler.getGroupByArray(searchData, groupBy);
        return {
          name: groupName,
          group: group
        }
    }

    function getIndeedData(title, address, start) {
      var url = apiHost + 'indeed?title=' + title + '&location=' + address + '&start=' + start;
      return getDataFromHttpHost(encodeURI(url)).then(function (response) {
        var data = angular.toJson(response.data);
        var results = _.get(response, 'data.results') || _.get(data, 'results');
        var formatData = SearchResultHandler.formatIndeedData(results);
        addToSearchData(formatData, 'indeed');
        return data;
      },onSearchJobFailed);
    }


    function getCorTechData(title, lat, lng) {
      var url = apiHost + 'search?title=' + (title || '') + '&lat=' + (lat || '') + '&lng=' + (lng || '');
      return getDataFromHttpHost(url).then(function (response) {
        addToSearchData(response.data, 'corTech');
        return response.data;
      }, onSearchJobFailed);
    }

    function onSearchJobFailed() {
      searchData.push([]);
    }

    function addToSearchData(data, src) {
      if (!angular.isArray(data)) {
        return;
      }
      var jobs = _.map(data, function (job) {
        job.src = src;
        return job;
      });
      searchData = _.concat(searchData, jobs);
    }

    function getDataFromHttpHost(url, success, failure) {
      return $http({
        method: 'GET',
        url: url
      });
    }
  }
})(angular);

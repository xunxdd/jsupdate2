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
    srv.geoCodeThenSetSearchData = geoCodeThenSetSearchData;

    /**implementation**/
    srv.debug = false;

    function getSearchData() {
      return localStorageService.get(searchDataKey) || searchDataCombined;
    }

    function geoCode(address) {
      var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURI(address) + '&key=AIzaSyAA9BOmbxkL9UhXJArD_DIe57vrlcmGIp4';
      return getDataFromHttpHost(url).then(function (response) {
        console.log(response.data.results);
        var results = _.get(response.data, 'results');
        if (angular.isArray(results) && results.length >= 0) {
          return results[0]
        }
        return {};
      });
    }

    function geoCodeThenSetSearchData(title, address) {
      return geoCode(address).then(function (place) {
        return setSearchData(title, place, address);
      });
    }

    function setSearchData(title, place, address) {
      var lat, lng;
      var promises = [],
        indeedResults;

      if (_.get(place, 'geometry.location', null)) {

        lat = place.geometry.location.lat;
        lat = angular.isFunction(lat)? lat() : lat;
        lng = place.geometry.location.lng;
        lng = angular.isFunction(lng)? lng() : lng;
      }
      resetData();

      var corTechResults = getCorTechData(title, lat, lng);

      promises.push(corTechResults);

      if (title && address) {
        indeedResults = getIndeedData(title, address, 0);
        promises.push(indeedResults);
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
      groups.push(getGroups(searchData, 'src', 'Job Sources'));
      groups.push(getGroups(searchData, 'company', 'Companies'));
      groups.push(getGroups(searchData, 'location', 'Locations'));
      groups.push({
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
        processIndeedData(response);
        if (start === 0) {
          var data = angular.toJson(response.data);
          var total = _.get(response, 'data.totalResults', 0) || _.get(data, 'totalResults', 0);
          if (total > 25) {
            return getRemainIndeedData(title, address, total);
          } else {
            return $q.when({});
          }
        } else {
          return $q.when({});
        }
      }, onSearchJobFailed);
    }

    function processIndeedData(response) {
      var data = angular.toJson(response.data);
      var results = _.get(response, 'data.results') || _.get(data, 'results');
      var formatData = SearchResultHandler.formatIndeedData(results);
      addToSearchData(formatData, 'indeed');
    }

    function getRemainIndeedData(title, address, total) {
      var totalPage = Math.ceil(total / 25);
      var max = Math.min(250, total);
      var promises = [];
      if (totalPage > 1) {
        for (var i = 1; (i * 25) < max; i++) {
          promises.push(getIndeedData(title, address, i * 25));
        }
      }

      return $q.all(promises);
    }

    function getCorTechData(title, lat, lng) {
      var url = apiHost + 'search?title=' + (title || '') + '&lat=' + (lat || '') + '&lng=' + (lng || '');
      return getDataFromHttpHost(url).then(function (response) {
        addToSearchData(response.data, 'Jobstalker');
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

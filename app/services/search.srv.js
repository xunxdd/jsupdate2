(function (angular) {
  'use strict';

  angular
    .module('JobStalker.services')
    .service('SearchSrv', SearchSrv);

  SearchSrv.$inject = ['$log', '$q', '$http', 'localStorageService', 'ApiEndPoint'];
  function SearchSrv($log, $q, $http, localStorageService, ApiEndPoint) {

    var srv = this;
    var apiHost = ApiEndPoint.apiUrl;
    var searchDataKey = 'js_searchdata';
    var testData = {};
    srv.getSearchData = getSearchData;
    srv.setSearchData = setSearchData;
    srv.getJobDetails = getJobDetails;

    /**implementation**/
    srv.debug = false;

    function getSearchData() {
      return localStorageService.get(searchDataKey) || srv.searchData;
    }

    function setSearchData(title, place) {

      var testData = [{
        "id": 146453,
        "company": "CorTech LLC",
        "title": "Wi - Fi Test Engineer",
        "location": "Atlanta",
        "state": "GA",
        "miles": 1.74,
        "url": "<a href=\"#\" class=\"two\" onclick=\"EditJobOrder(146453, '2754BCE3-C7CB-4BFE-B935-E1967061B7A9');\">Wi - Fi Test Engineer</a>"
      }, {
        "id": 147030,
        "company": "CorTech LLC",
        "title": "Software Systems Engineer",
        "location": "Alpharetta, GA",
        "state": "GA",
        "miles": 20.92,
        "url": "<a href=\"#\" class=\"two\" onclick=\"EditJobOrder(147030, '2754BCE3-C7CB-4BFE-B935-E1967061B7A9');\">Software Systems Engineer</a>"
      }, {
        "id": 149419,
        "company": "CorTech LLC",
        "title": "US - Principal Software E",
        "location": "Atlanta, Georgia",
        "state": "GA",
        "miles": 3.43,
        "url": "<a href=\"#\" class=\"two\" onclick=\"EditJobOrder(149419, '2754BCE3-C7CB-4BFE-B935-E1967061B7A9');\">US - Principal Software E</a>"
      }, {
        "id": 149421,
        "company": "CorTech LLC",
        "title": "Software Systems Engineer",
        "location": "Alpharetta, Georgia",
        "state": "GA",
        "miles": 20.92,
        "url": "<a href=\"#\" class=\"two\" onclick=\"EditJobOrder(149421, '2754BCE3-C7CB-4BFE-B935-E1967061B7A9');\">Software Systems Engineer</a>"
      }, {
        "id": 149423,
        "company": "CorTech LLC",
        "title": "US - Principal Software E",
        "location": "Atlanta, Georgia",
        "state": "GA",
        "miles": 3.43,
        "url": "<a href=\"#\" class=\"two\" onclick=\"EditJobOrder(149423, '2754BCE3-C7CB-4BFE-B935-E1967061B7A9');\">US - Principal Software E</a>"
      }, {
        "id": 149622,
        "company": "CorTech LLC",
        "title": "Information Security Anal",
        "location": "Alpharetta, Georgia",
        "state": "GA",
        "miles": 20.92,
        "url": "<a href=\"#\" class=\"two\" onclick=\"EditJobOrder(149622, '2754BCE3-C7CB-4BFE-B935-E1967061B7A9');\">Information Security Anal</a>"
      }];
      var lat, lng;
      if (_.get(place, 'geometry.location', null)) {
        lat = place.geometry.location.lat();
        lng = place.geometry.location.lng();
      }

      console.log(lat, 'lat', lng, 'lng');
      if (srv.debug) {
        return $q.when(testData).then(function (data) {

          setSearchDataInStorage(data, title, location, lat, lng);
        });
      }

      return getJobSearchDataFromApi(title, lat, lng).then(function (response) {
        return setSearchDataInStorage(response.data, title, location, lat, lng);
      }, function (error) {
        return setSearchDataInStorage([], title, location);
      });
    }

    function setSearchDataInStorage(data, title, location) {
      var i, searchData = angular.copy(data);

      srv.searchData = {
        data: searchData,
        total: searchData.length,
        criteria: {title: title, location: location},
        companyGroups: getGroupByArray(searchData, 'company'),
        locationGroups: getGroupByArray(searchData, 'location'),
        //jobTitleGroups: getGroupByArray(searchData, 'title'),
        milesGroups: getMilesGroup(searchData)
      };
      localStorageService.set(searchDataKey, srv.searchData);

    }

    function getJobDetails(id) {
      var testData = {
        "id": 1000,
        "companyName": "Motorola",
        "email": "",
        "phone": "",
        "entryDate": null,
        "category": "",
        "jobTitle": "Engineer Systems ",
        "startdate": "",
        "contractLength": "1 Year",
        "jobType": "Contract",
        "salaryRange": "34/hr",
        "travelPercentage": "0%",
        "state": "",
        "location": "Plantation, FL",
        "requiredSkills": "Cisco, Unix, Nortel DMS, Windows OS, Firewalls",
        "desiredSkills": "Organization, Communication",
        "jobDescription": "Scope of Responsibilities/Expectations: Upgrade and maintain the FL08 Mobile Switching Office. The candidate must be able to function within the XYZ system-engineering group to support development and test activities of XYZ subscribers in terms of XYZ infrastructure support. The candidate must have an excellent knowledge of hubs, routers, switches and CISCO firewalls within a wireless network environment. MCSE, MCSP, CNA certifications, Unix, Informix are all a plus. \r\n\r\nSpecific Knowledge: \r\nSpecific knowledge of Nortel DMS100 switch and XYZ infrastructure is required. Prior experience with Unix, hubs, routers and switches also required. This position is critical to the ongoing stability of the XYZ Test Network. ",
        "positionsAvailable": "1",
        "contactInfo": "Timothy Peters"
      };

      if (srv.debug) {
        return $q.when(testData).then(function (data) {
          return data;
        });
      }
      return getJobDetailsFromApi(id).then(function (response) {
        return response.data;
      });
    }

    function getJobDetailsFromApi(id) {
      var url = apiHost + 'jobdetail?id=' + id;
      return getDataFromHttpHost(url);
    }

    function getJobSearchDataFromApi(title, lat, lng) {

      var url = apiHost + 'search?title=' + (title || '') + '&lat=' + (lat || '') + '&lng=' + (lng || '');
      return getDataFromHttpHost(url);
    }

    function getMilesGroup(data) {
      var availableMiles = _.map(data, function (job) {
          return parseFloat(job.miles);
      }).sort();

      var mileGroup = _.groupBy(_.uniq(availableMiles), Math.floor);
      var keys = _.keys(mileGroup);
      var i = 0, keyLength = keys.length;
      var groups = [];
      for (i = 0; i < keyLength; i++) {
        var lowerBound = keys[i],
          higherBound = (i + 1) < keyLength ? keys[i + 1] : lowerBound;

        var group = _.filter(data, function (job) {
          var miles = parseFloat(job.miles);
          return miles >= lowerBound && miles <= higherBound;
        });

        groups.push({
          key: lowerBound === higherBound ? 'More than ' + lowerBound + ' miles' : 'Between ' + lowerBound + ' and ' + higherBound + ' miles',
          group: group
        });
      }
      return groups;
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

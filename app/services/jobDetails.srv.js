(function (angular) {
  'use strict';

  angular
    .module('JobStalker.services')
    .service('JobDetailsSrv', JobDetailsSrv);

  JobDetailsSrv.$inject = ['$http', 'ApiEndPoint'];
  function JobDetailsSrv($http, ApiEndPoint) {

    var srv = this;
    var apiHost = ApiEndPoint.apiUrl;

    srv.getJobDetails = getJobDetails;

    function getJobDetails(id) {

      return getJobDetailsFromApi(id).then(function (response) {
        return response.data;
      });
    }

    function getJobDetailsFromApi(id) {
      var url = apiHost + 'jobdetail?id=' + id;
      return getDataFromHttpHost(url);
    }

    function getDataFromHttpHost(url, success, failure) {
      return $http({
        method: 'GET',
        url: url
      });
    }
  }
})(angular);

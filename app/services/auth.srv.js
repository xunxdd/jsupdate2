(function (angular) {
  'use strict';

  angular
    .module('JobStalker.services')
    .service('AuthSrv', AuthSrv);

  AuthSrv.$inject = ['$http', 'ApiEndPoint'];
  function AuthSrv($http, ApiEndPoint) {

    var srv = this;
    var apiHost = ApiEndPoint.apiUrl;

    srv.login = login;
    srv.retrievePassword = retrievePassword;

    function retrievePassword(email) {
      return $http.get(apiHost + 'forgotpassword?email=' + email);
    }

    function login(uid, pwd) {
      return $http.post(apiHost + 'login', {uid: uid, pwd: pwd});
    }


  }
})(angular);

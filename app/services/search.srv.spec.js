'use strict';

describe('search srv', function () {

  var service;
  beforeEach(module('JobStalker'));
  beforeEach(module('JobStalker.services'));

  beforeEach(inject(function ($injector) {
    service = $injector.get('SearchSrv')
  }));

  describe('service', function () {

    it('should get all groups right', function () {
      service.setSearchData();
      expect(service.searchData.companyGroups).not.toBeNull();
      expect(service.searchData.companyGroups.length).toBeGreaterThan(0);
    });

  });
});
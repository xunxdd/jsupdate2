'use strict';

describe('search srv', function () {

  var service;
  beforeEach(module('JobStalker'));
  beforeEach(module('JobStalker.services'));

  beforeEach(inject(function ($injector) {
    service = $injector.get('SearchSrv')
  }));
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

  describe('service', function () {

    it('should get all groups right', function () {
      service.setSearchData();
      expect(service.searchData.companyGroups).not.toBeNull();
      expect(service.searchData.companyGroups.length).toBeGreaterThan(0);
    });

  });
});
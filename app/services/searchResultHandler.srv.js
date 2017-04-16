(function (angular) {
  'use strict';

  angular
    .module('JobStalker.services')
    .service('SearchResultHandler', SearchResultHandler);

  SearchResultHandler.$inject = [];
  function SearchResultHandler() {

    var srv = this;
    srv.getMilesGroup = getMilesGroup;
    srv.getGroupByArray = getGroupByArray;
    srv.formatIndeedData = formatIndeedData;

    function getMilesGroup(data) {
      var availableMiles = _.map(data, function (job) {
        return parseFloat(_.get(job, 'miles', 0));
      }).sort();

      _.remove(availableMiles, 0);
      var mileGroup = _.groupBy(_.uniq(availableMiles), Math.floor);
      var keys = _.keys(mileGroup);
      var i = 0, keyLength = keys.length;
      var groups = [];
      for (i = 0; i < keyLength; i++) {
        var lowerBound = keys[i],
          higherBound = (i + 1) < keyLength ? keys[i + 1] : lowerBound;

        var group = _.filter(data, function (job) {
          var miles = parseFloat(_.get(job, 'miles', 0));
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
      var dataGroup = _.filter(data, function (group) {
          return _.get(group, groupBy, null) !== null;
      });
      var groups = _.groupBy(dataGroup, groupBy);
      var array = _.map(_.keys(groups), function (key) {
        return {
          key: key,
          group: groups[key]
        }
      });
      return array;
    }

    function formatIndeedData(data) {
      return _.map(data, function (data) {
          var job = {
            company: data.company,
            title: data.jobtitle,
            location: data.city + ', ' + data.state,
            desc: strip(data.snippet),
            url: data.url,
            src: 'indeed',
            data: data.date
          };
          return job;
      });
    }

    function strip(html)
    {
      var tmp = document.createElement("DIV");
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
    }

  }
})(angular);

define(function(require) {
  var Q = require("q");
  var $ = require("jquery");
  return {
    idFinder: function(omdbid) {
    var deferred = Q.defer();
    var baseUrl= "http://www.omdbapi.com/?i=";
    var movietitle= omdbid;
    var URL= baseUrl+movietitle;
    console.log("variables loaded");
      $.ajax({
	      type: 'GET',
	      url: URL })
      .done(function(json_data) {
      	deferred.resolve(json_data);
      })
      .fail(function(xhr, status, error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }
  }
});


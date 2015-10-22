define(function(require) {
  var Q = require("q");
  var movieTpl = require('hbs!../templates/movies');
  return {
    filmFinder: function() {
    var deferred = Q.defer();
    var baseUrl= "http://www.omdbapi.com/?s=";
    var movietitle= $("#t").val();
    var URL= baseUrl+movietitle;
    console.log("variables loaded");
      $.ajax({ url: URL })
        .done(function(json_data) {
        console.log("Your new movie is", json_data);
        console.log("search js has finished, resolving json data", json_data)
        //$('#populatee').append(json_data);
        console.log("does it pass?")
        deferred.resolve(json_data);
        console.log(json_data)
        return json_data
        })
        .fail(function(xhr, status, error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }
  }
});


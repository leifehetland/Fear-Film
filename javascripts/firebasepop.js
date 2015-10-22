define(function(require) {
  var Q = require("q");
  var movieTpl = require('hbs!../templates/movies');
  return {
    filmFinderFirebase: function() {
    var deferred = Q.defer();
    var baseUrl= "https://fear-film.firebaseio.com/";
    var firebaseRef = new Firebase("https://fear-film.firebaseio.com/");
    var authData = firebaseRef.getAuth();
    var userUID = authData.uid;
    var URL= baseUrl+userUID + "/movies.json";
    console.log("variables loaded", URL);
      $.ajax({ url: URL })
        .done(function(more_json_data) {
        console.log("Your movies  from firebase are", more_json_data);
        console.log("firebasepop js has finished, resolving more json data", more_json_data)
        //$('#populatee').append(more_json_data);
        console.log("does firebasepop pass?")
        deferred.resolve(more_json_data);
        console.log(more_json_data)
        return more_json_data
        })
        .fail(function(xhr, status, error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }
  }
});

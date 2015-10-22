requirejs.config({
    baseUrl: './javascripts',
    paths: {
        'q': '../lib/bower_components/q/q',
        'jquery': '../lib/bower_components/jquery/dist/jquery.min',
        'lodash': '../lib/bower_components/lodash/lodash.min',
        'hbs': '../lib/bower_components/require-handlebars-plugin/hbs',
        'bootstrap': '../lib/bower_components/bootstrap/dist/js/bootstrap.min'
    },
    shim: {
        'bootstrap': ['jquery']
    }
});

requirejs(
  ["jquery", "hbs", "bootstrap", "search", "q", 'hbs!../templates/movies', 'findid'],
  function($, Handlebars, bootstrap, search, Q, movieTpl, findID) {

    var firebaseRef = new Firebase("https://fear-film.firebaseio.com/");

    var authData = firebaseRef.getAuth();

    var userUID = authData.uid;

    var myGlobalFilm;

    if(authData) {
      console.log("Authenticated user with uid:", userUID);
    }

    $(document).on("click", ".addFilm", function(e) {
        e.preventDefault();
        console.log('you clicked add');
        findID.idFinder(this.id).then(function(myFilm){
          var filmInfo = {
            Title: myFilm.Title,
            Year: myFilm.Year,
            Poster: myFilm.Poster,
            Rating: 0,
            Watched: false
          }
          console.log('myFilm=', myFilm);
          myGlobalFilm = myFilm;
          }).then(function(){
            console.log("myGlobalFilm", myGlobalFilm);
            console.log("firebase", firebaseRef);
            firebaseRef.child(userUID).child("movies").child(myGlobalFilm.imdbID).set(myGlobalFilm);
          });
        });
  });

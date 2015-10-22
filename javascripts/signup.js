requirejs.config({
 baseUrl: './javascripts',
 paths: {
	 "jquery": "../lib/bower_components/jquery/dist/jquery.min",
	 "hbs": "../lib/bower_components/require-handlebars-plugin/hbs",
	 "bootstrap": "../lib/bower_components/bootstrap/dist/js/bootstrap.min",
	 "firebase": "../lib/bower_components/firebase/firebase"
 },
 shim: {
	 "bootstrap": ["jquery"],
	 "firebase": {exports: "Firebase"}
 }
});

requirejs(
	["jquery", "bootstrap", "firebase"],
	function($, bootstrap, Firebase) {

	var firebaseRef = new Firebase("https://fear-film.firebaseio.com/");

	var authData = firebaseRef.getAuth();

	if(authData) {
		console.log("Authenticated user with uid:", authData);
		}

		$("#signUp").click(function(e) {
			e.preventDefault();
			console.log('you clicked register');
			var newUser = {
				name: $('#name').val(),
				email: $('#email').val(),
				password: $("#password").val()
			};
		console.log(newUser)

		var form = firebaseRef.createUser(newUser,
			function(error, getAuth){
				if(error){
					console.log('error creating user:', error);
				}else{
					console.log("success with uid", getAuth.uid);
					firebaseRef.child(getAuth.uid).set(newUser);
					window.location = "/mainpage.html"
				}
		});
	});
		var ref = new Firebase("https://fear-film.firebaseio.com/");

			$('#logIn').click(function(e){

				e.preventDefault();
				console.log('you clicked login');
				ref.authWithPassword({
				email: $('#lEmail').val(),
				password: $('#lPassword').val()
				}, function(error, authData) {
				if (error) {
					console.log("Login Failed!", error);
				} else {
					console.log("Authenticated successfully with payload:", authData);
					window.location = "./mainpage.html"
				};
		});
	});
});

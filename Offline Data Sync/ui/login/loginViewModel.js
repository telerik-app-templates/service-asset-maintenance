
(function (srq) {

    var $loginUsername;
    var $loginPassword;
    
    srq.login = {
        viewModel: kendo.observable({
            init: function (e) {
                $loginUsername = $('#loginUsername');
            	$loginPassword = $('#loginPassword');
            },
            show: function () {
            	$loginUsername.val('demo');
            	$loginPassword.val('demo');
        	},
            login: function () {
                var username = $loginUsername.val();
                var password = $loginPassword.val();
                
                // Authenticate using the username and password
                srq.everlive.Users.login(username, password)
                .then(function (r) {
                	//console.log(r);
                })
                .then(function () {
                    srq.app.navigate('ui/home/mainMenuView.html');
                })
                .then(null,
                      function (err) {
                          srq.notify(err.message, "Error", null);
                      }
                );
            }
        })
    }
})(srq);

global.login = {
    viewModel: kendo.observable({
        init: function (e) {
            // every view init populates UI labels, test for internationalization/resource dictionary style UI string approach
            $("#login-button-text").text(srq.appSettings.strings.loginText);
            $("#no-account-signup-text").text(srq.appSettings.strings.noAccountText);
            $("#copyright-company-text").text(srq.appSettings.strings.copyrightCompany);

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
                // do nothing on complete, handle success and error states
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

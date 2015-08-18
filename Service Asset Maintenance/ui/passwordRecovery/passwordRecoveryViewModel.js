global.passwordRecovery = {
    viewModel: kendo.observable({
        usernameOrEmail: "kvelikov",
        recover: function () {
            global.service.recover(global.passwordRecovery.viewModel.usernameOrEmail)
                .then(function () {
                    alert("Check your email for the new password!");
                    global.navigation.login();
                });
        }
    })
}

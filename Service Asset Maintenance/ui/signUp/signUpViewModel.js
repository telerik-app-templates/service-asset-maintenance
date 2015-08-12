global.signUp = {
    viewModel: kendo.observable({
        username: "",
        password: "",
        confirmPassword: "",
        displayName: "",
        signUp: function () {
            global.service.signUp(global.signUp.viewModel.username,
                global.signUp.viewModel.password, {
                    DisplayName: global.signUp.viewModel.displayName
                })
                .then(function () {
                    global.navigation.home();
                });
        }
    })
}
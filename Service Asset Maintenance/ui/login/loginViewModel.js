global.login = {
    viewModel: kendo.observable({
        username: "kvelikov",
        password: "123",
        login: function () {
            global.service.login(global.login.viewModel.username, global.login.viewModel.password)
                .then(function () {
                    global.navigation.home();
                });
        }
    })
}

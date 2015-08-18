global.login = {
    viewModel: new ViewModelBase({
        username: "kvelikov",
        password: "123",
        login: function () {
            if (global.login.viewModel.validate()) {
                global.service.login(global.login.viewModel.username, global.login.viewModel.password)
                    .then(function () {
                        global.navigation.home();
                    }, function (error) {
                        global.login.viewModel.showValidationSummary(error.message)
                    });
            }
        },

        validate: function () {
            var vm = global.login.viewModel;
            vm.hideValidationSummary();
            if (!global.validation.isRequiredValid(vm.username)) {
                vm.showValidationSummary("Please enter username.");

                return false;
            }

            if (!global.validation.isRequiredValid(vm.password)) {
                vm.showValidationSummary("Please enter password.");

                return false;
            }

            return true;
        },

        clear: function () {
            global.login.viewModel.set("password", "");
        }
    })
}

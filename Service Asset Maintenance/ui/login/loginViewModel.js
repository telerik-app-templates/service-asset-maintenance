global.login = {
    viewModel: new ViewModelBase({
        username: "kvelikov",
        password: "123",
        login: function () {
            if (global.login.viewModel.validate()) {
                var that = this;
                that.beginLoading();
                global.service.login(global.login.viewModel.username, global.login.viewModel.password)
                    .then(function () {
                        global.navigation.home();
                        that.endLoading();
                    }, function (error) {
                        global.login.viewModel.showValidationSummary(error.message)
                        that.endLoading();
                    });
            }
        },

        validate: function () {
            this.hideValidationSummary();
            if (!global.validation.isRequiredValid(this.username)) {
                this.showValidationSummary("Please enter username.");

                return false;
            }

            if (!global.validation.isRequiredValid(this.password)) {
                this.showValidationSummary("Please enter password.");

                return false;
            }

            return true;
        },

        clear: function () {
            global.login.viewModel.set("password", "");
        }
    })
}

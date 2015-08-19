global.passwordRecovery = {
    viewModel: new ViewModelBase({
        usernameOrEmail: "",
        recover: function () {
            if (this.validate()) {
                global.service.recover(global.passwordRecovery.viewModel.usernameOrEmail)
                    .then(function () {
                        alert("Check your email address to reset your password.");
                        global.navigation.login();
                    }, function (error) {
                        global.passwordRecovery.viewModel.showValidationSummary("User with specified username or email address not found.");
                    });
            }
        },

        validate: function () {
            this.hideValidationSummary();
            if (!global.validation.isRequiredValid(this.usernameOrEmail)) {
                this.showValidationSummary("Please enter valid username or email address.");

                return false;
            }

            return true;
        }
    })
}

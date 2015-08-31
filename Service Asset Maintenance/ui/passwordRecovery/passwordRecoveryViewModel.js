global.passwordRecovery = {
    viewModel: new ViewModelBase({
        usernameOrEmail: "",
        recover: function () {
            if (this.validate()) {
                var that = this;
                that.beginLoading();
                global.service.recover(global.passwordRecovery.viewModel.usernameOrEmail)
                    .then(function () {
                        that.endLoading();
                        notification.showNotification(global.messages.checkYourEmailMessage);
                        global.navigation.login();
                    }, function (error) {
                        that.endLoading();
                        global.passwordRecovery.viewModel.showValidationSummary(global.messages.usernameOrEmailNotFoundMessage);
                    });
            }
        },

        validate: function () {
            this.hideValidationSummary();
            if (!global.validation.isRequiredValid(this.usernameOrEmail)) {
                this.showValidationSummary(global.messages.enterUsernameOrEmailMessage);

                return false;
            }

            return true;
        }
    })
}

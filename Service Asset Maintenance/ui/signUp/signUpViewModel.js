global.signUp = {
    viewModel: new ViewModelBase({
        username: "",
        password: "",
        confirmPassword: "",
        displayName: "",
        email: "",
        signUp: function () {
            if (this.validate()) {
                var that = this;
                that.beginLoading();
                global.service.signUp(global.signUp.viewModel.username,
                    global.signUp.viewModel.password, {
                        DisplayName: that.displayName, 
                        Email: that.email
                    })
                    .then(function () {
                        global.analytics.trackFeature(global.constants.features.signUp);

                        that.endLoading();
                        global.navigation.home();
                    }, function (error) {
                        global.analytics.trackError(error);
                        that.endLoading();
                    });
            }
        },

        validate: function () {
            this.hideValidationSummary();
            if (!global.validation.isRequiredValid(this.username)) {
                this.showValidationSummary(global.messages.enterUsernameMessage);

                return false;
            }

            if (!global.validation.isRequiredValid(this.email)) {
                this.showValidationSummary(global.messages.enterEmailMessage);

                return false;
            }

            if (!global.validation.isRequiredValid(this.password)) {
                this.showValidationSummary(global.messages.enterPasswordMessage);

                return false;
            }

            if (!global.validation.isRequiredValid(this.confirmPassword)) {
                this.showValidationSummary(global.messages.confirmPasswordMessage);

                return false;
            }

            if (this.password !== this.confirmPassword) {
                this.showValidationSummary(global.messages.passwordsDoesNotMatchMessage);

                return false;
            }

            return true;
        },

        clear: function () {
            global.login.viewModel.set("password", "");
            global.login.viewModel.set("confirmPassword", "");
        }
    }),

    onShow: function () {
        global.analytics.startTracking(global.constants.features.signUpView)
    },

    onHide: function () {
        global.analytics.stopTracking(global.constants.features.signUpView)
    }
}
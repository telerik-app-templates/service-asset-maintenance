global.login = {
    viewModel: new ViewModelBase({
        username: null,
        password: null,

        login: function () {
            if (global.login.viewModel.validate()) {
                var that = this;
                that.beginLoading();
                global.service.login(global.login.viewModel.username, global.login.viewModel.password)
                    .then(function () {
                        global.analytics.trackFeature(global.constants.features.login);
                        global.navigation.home();
                        that.endLoading();
                    }, function (error) {
                        global.analytics.trackError(error);
                        global.login.viewModel.showValidationSummary(error.message)
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

            if (!global.validation.isRequiredValid(this.password)) {
                this.showValidationSummary();

                return false;
            }

            return true;
        },

        clear: function () {
            global.login.viewModel.set("password", "");
        }
    }),

    onShow: function () {
        global.analytics.startTracking(global.constants.features.loginView)
    },

    onHide: function () {
        global.analytics.stopTracking(global.constants.features.loginView)
    }
}

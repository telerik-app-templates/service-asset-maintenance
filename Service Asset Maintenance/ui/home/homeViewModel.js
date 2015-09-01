global.home = {
    viewModel: new ViewModelBase({
        logout: function () {
            global.service.logout();
        }
    }),

    onInit: function () {
        kendo.bind($("#home-header"), global.home.viewModel);
    },

    onInitWide: function () {
        kendo.bind($("#home-header-wide"), global.home.viewModel);
    },

    onShow: function () {
        global.analytics.startTracking(global.constants.features.serviceRequestsView)
    },

    onHide: function () {
        global.analytics.stopTracking(global.constants.features.serviceRequestsView)
    }
}
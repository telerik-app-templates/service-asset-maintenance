function getLayout() {
    return global.isWide ? global.constants.views.homeWide : global.constants.views.home;
}

global.navigation = {
    navigateTo: function (url, tabletTarget) {
        if (global.isWide) {
            var pane = $("#" + tabletTarget).data("kendoMobilePane");
            pane.navigate(url);
        }
        else {
            global.app.navigate(url);
        }
    },

    navigate: function (target) {
        var url = $(target).data("url");
        var tabletTarget = $(target).data("tablettarget");

        global.navigation.navigateTo(url, tabletTarget);
    },

    home: function () {
        var url = getLayout();
        global.app.navigate(url);
    },

    login: function () {
        global.app.navigate(global.constants.views.login);
    },

    getInitialView: function () {
        var currentUser = localStorage.getItem(global.constants.CURRENT_USER_KEY)
        if (currentUser) {

            return getLayout();
        }

        return global.constants.views.login;
    }
}
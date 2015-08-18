var TRANSITION = "slide";

global.navigation = {
    navigateTo: function (url, wideTarget) {
        if (global.isWide) {
            var pane = $("#" + wideTarget).data("kendoMobilePane");
            pane.navigate(url, TRANSITION);
        }
        else {
            global.app.navigate(url, TRANSITION);
        }
    },

    navigate: function (target) {
        var url = $(target).data("url");
        var tabletTarget = $(target).data("tablettarget");

        global.navigation.navigateTo(url, tabletTarget);
    },

    home: function () {
        var url = getLayout();
        global.app.replace(url, TRANSITION);
    },

    login: function () {
        global.app.replace(global.constants.views.login);
    }
}
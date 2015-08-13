global.navigation = {
    navigateTo: function (url, wideTarget) {
        if (global.isWide) {
            var pane = $("#" + wideTarget).data("kendoMobilePane");
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
        console.log("LOGIN")
        global.app.replace(global.constants.views.login);
    }
}
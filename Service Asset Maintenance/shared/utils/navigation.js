var TRANSITION = "slide";

global.navigation = {
    navigateTo: function (url, wideTarget, contentPane) {
        if (global.isWide) {
            var widePane = $("#" + wideTarget).data("kendoMobilePane");
            widePane.navigate(url, TRANSITION);

            if (contentPane) {
                var pane = $("#" + contentPane);
                pane.toggleClass("disabled-pane");
                var owner = pane.data("kendoMobilePane");
            
                owner.view().enable(false);
                widePane.one ("navigate", function (e) {
                    pane.toggleClass("disabled-pane");
                    owner.view().enable();
                });
            }
        }
        else {
            global.app.navigate(url, TRANSITION);
        }
    },

    navigate: function (target) {
        var url = $(target).data("url");
        var tabletTarget = $(target).data("widepane");
        var contentPane = $(target).data("contentpane")

        global.navigation.navigateTo(url, tabletTarget, contentPane);
    },

    home: function () {
        global.service.getCurrentUser().then(function (user) {
            if (user) {
                var url = global.isWide ? global.constants.views.homeWide : global.constants.views.home
                global.app.replace(url);
            } else {
                global.navigation.login()
            }
        })
    },

    login: function () {
        global.app.replace(global.constants.views.login);
    },

    back: function (pane) {
        if (!global.isWide) {
            global.app.navigate("#:back");
        } else if (pane) {
            var pane = $("#" + pane).data("kendoMobilePane");
            pane.navigate("#:back");
        }
    },

    changeMode: function () {
        this.home();
    }
}
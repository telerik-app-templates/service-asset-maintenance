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
        var contentPane = $(target).data("contentpane")
        
        global.navigation.navigateTo(url, tabletTarget);
        if (global.isWide && contentPane) {
            var owner = $("#" + contentPane).data("kendoMobilePane");
            owner.view().enable(false);
            var target = $("#" + tabletTarget).data("kendoMobilePane");
            var handler = function (e) {
                owner.view().enable();
                target.unbind("navigate", handler);
            };

            target.bind("navigate", handler);
        }
    },

    showModal: function (view) {
        $(view).data("kendoMobileModalView").open();
    },

    closeModal: function (view) {
        $(view).data("kendoMobileModalView").close();
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
    }
}
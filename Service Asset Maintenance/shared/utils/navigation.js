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
                console.log("change event", e);
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
        var url = getLayout();
        global.app.replace(url, TRANSITION);
    },

    login: function () {
        global.app.replace(global.constants.views.login);
    },

    back: function () {
        global.app.navigate("#:back", TRANSITION);
    }
}
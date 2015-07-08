global.navigation = {
    navigateTo: function (url, tabletTarget) {
        if (global.showSplitLayout()) {
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
    }
}
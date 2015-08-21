global.scroller = {
    resetScroll: function (view) {
        var view = $("#" + view).data("kendoMobileView")
        if (view) {
            view.scroller.reset();
        }
    }
}


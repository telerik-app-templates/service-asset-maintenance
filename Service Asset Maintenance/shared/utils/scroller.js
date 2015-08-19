global.scroller = {
    resetScroll: function (view) {
        var view = $("#" + view).data("kendoMobileView")
        view.scroller.reset();
    }
}


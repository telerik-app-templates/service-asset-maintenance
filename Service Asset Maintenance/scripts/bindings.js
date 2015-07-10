kendo.data.binders.widget.index = kendo.data.Binder.extend({
    init: function (widget, bindings, options) {
        //call the base constructor
        kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
    },
    refresh: function () {
        var that = this,
        value = that.bindings["index"].get(); //get the value from the View-Model
        $(that.element).data("kendoMobileButtonGroup").select(value); //update the widget
    }
});
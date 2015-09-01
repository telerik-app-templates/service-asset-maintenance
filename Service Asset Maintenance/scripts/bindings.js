kendo.data.binders.widget.index = kendo.data.Binder.extend({
    init: function (widget, bindings, options) {
        kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);

        var that = this;
        var buttonGroup = $(that.element).data("kendoMobileButtonGroup");
        buttonGroup.bind("select", function (args) {
            that.bindings["index"].set(args.index);
        })
    },

    refresh: function () {
        value = this.bindings["index"].get();
        $(this.element).data("kendoMobileButtonGroup").select(value);
    }
});

kendo.data.binders.widget.selectedItem = kendo.data.Binder.extend({
    init: function (widget, bindings, options) {
        kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);

        var that = this;
        var listView = $(that.element).data("kendoMobileListView");
        listView.bind("click", function (args) {
            that.selectionChanged(args.item, args.dataItem);
        });

        if (global.isWide) {
            listView.bind("dataBound", function (args) {
                if (global.isWide) {
                    that.select();
                }
            });

            var viewId = $(this.element).data("view");
            var view = $("#" + viewId).data("kendoMobileSplitView")
            view.bind("show", function (args) {
                that.select();
            });
        }
    },

    refresh: function () {        
    },

    select: function () {
        var binding = this.bindings["selectedItem"];
        var listView = $(this.element).data("kendoMobileListView");
        var view = listView.dataSource.view();
        if (!view.length) {
            this.selectionChanged(null, null);
        } else {
            var value = binding.get();
            if (value) {
                var item = $(this.element).find("[data-uid='" + value.uid + "']");
                if (item && item.data("uid")) {
                    this.selectionChanged(item, value);
                } else {
                    this.selectionChanged(null, null);
                }
            }
        }
        
    },

    selectionChanged: function (item, value) {
        this.selectItem(item);
        this.bindings["selectedItem"].set(value);
        var listView = $(this.element).data("kendoMobileListView");
        listView.trigger("selectionChanged");
    },

    selectItem: function (item) {
        $(this.element).find(".listview-item-selected").toggleClass("listview-item-selected");
        if (item && global.isWide) {
            item.toggleClass("listview-item-selected");
        }
    }
});

kendo.data.binders.widget.selectionChanged = kendo.data.Binder.extend({
    init: function (widget, bindings, options) {
        kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);

        var that = this;
        $(that.element).data("kendoMobileListView").bind("selectionChanged", function (args) {
            that.selectionChanged(args);
        });
    },

    refresh: function () {
    },

    selectionChanged: function (args) {
        var value = this.bindings["selectionChanged"].get();
        if (value) {
            value(args);
        }
    }
});

kendo.data.binders.widget.loading = kendo.data.Binder.extend({
    init: function (widget, bindings, options) {
        kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
    },

    refresh: function () {
        var value = this.bindings["loading"].get();
        if (value) {
            global.app.showLoading();
        } else {
            global.app.hideLoading();
        }
    }
});

kendo.data.binders.widget.optionLabel = kendo.data.Binder.extend({
    init: function (widget, bindings, options) {
        kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);

        this.widget = widget;
    },

    refresh: function () {
        var value = this.bindings["optionLabel"].get();
        this.widget.setOptions({
            optionLabel: value
        });
    }
});

'use strict';

global.assets = {
    viewModel: kendo.observable({
        assets: ["123245", "134345", "2345435", "3252325"],

        assetSelected: function (args) {
            var assetNo = args.item.text();
            if (global.assets._complete) {
                global.assets._complete(assetNo);
                global.assets._complete = undefined;
            }

            global.navigation.closeModal(global.constants.views.assets);
        }
    }),

    showModal: function () {
        return new Promise(function (resolve, reject) {
            global.assets._complete = resolve;
            global.navigation.showModal(global.constants.views.assets);
        });
    }
}

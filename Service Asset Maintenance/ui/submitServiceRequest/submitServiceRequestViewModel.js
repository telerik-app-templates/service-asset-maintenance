'use strict';

global.submitServiceRequest = {
    viewModel: new ViewModelBase({
        serviceRequest: {},
        imageSrc: undefined,
        maintenanceTypes: function () {
            return global.maintenanceTypeModel.dataSource;
        },

        setAssetNo: function (assetNo) {
            this.serviceRequest.set("assetNo", assetNo);
            global.submitServiceRequest.resetScroll();
        },

        setPicture: function (data) {
            this.serviceRequest.picture = data;
            this.set("imageSrc", data ? "data:image/jpeg;base64," + data : undefined);
            global.submitServiceRequest.resetScroll();
        },

        takePicture: function () {
            var that = this;
            navigator.camera.getPicture(function (data) {
                that.setPicture(data);
            }, function (error) {
            }, {
                quality: 50,
                destinationType: navigator.camera.DestinationType.DATA_URL
            });

        },

        scanAssetNo: function () {
            var vm = global.submitServiceRequest.viewModel;
            if (window.navigator.simulator) {
                global.assets.showModal().then(function (assetNo) {
                    vm.setAssetNo(assetNo);
                });
            } else {
                cordova.plugins.barcodeScanner.scan(function (result) {
                    vm.setAssetNo(result.text);
                });
            }
        },

        removePicture: function () {
            this.setPicture(undefined);
        },

        removeAssetNo: function () {
            this.setAssetNo(undefined);
        },

        submit: function () {
            if (this.validate()) {
                global.serviceRequestModel.submitServiceRequest(this.serviceRequest)
                    .then(function (success) {
                        global.app.navigate("#:back");
                    });
            }
        },

        validate: function () {
            this.hideValidationSummary();
            if (!global.validation.isRequiredValid(this.serviceRequest.title)) {
                this.showValidationSummary("Please enter title.");

                return false;
            }

            return true;
        },

        onPriorityChanged: function (e) {
            var buttonGroup = e.sender;
            var index = buttonGroup.current().index();
            global.submitServiceRequest.viewModel.serviceRequest.priority = index;
        }
    }),

    resetScroll: function () {
        global.scroller.resetScroll("submit-service-request-view");
    }
}
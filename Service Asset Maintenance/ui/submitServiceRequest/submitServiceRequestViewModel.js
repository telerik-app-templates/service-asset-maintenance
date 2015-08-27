'use strict';

global.submitServiceRequest = {
    viewModel: new ViewModelBase({
        serviceRequest: null,
        imageSrc: function () {
            var data = this.serviceRequest.get("picture");

            return data ? "data:image/jpeg;base64," + data : null;
        },

        maintenanceTypes: function () {
            return global.maintenanceTypeModel.dataSource;
        },

        createServiceRequest: function () {
            this.set("serviceRequest", {
                title: "",
                dueDate: new Date(),
                priority: 0,
                maintenanceType: global.constants.DEFAULT_MAINTENANCE_TYPE,
                assetNo: null,
                description: "",
                status: global.constants.serviceRequestStatus.SUBMITTED
            });
        },

        setAssetNo: function (assetNo) {
            this.serviceRequest.set("assetNo", assetNo);
            global.submitServiceRequest.resetScroll();
        },

        setPicture: function (data) {
            this.serviceRequest.set("picture", data);
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
            this.setPicture(null);
        },

        removeAssetNo: function () {
            this.setAssetNo(null);
        },

        submit: function () {
            if (this.validate()) {
                var that = this;
                that.beginLoading();
                global.serviceRequestModel.submitServiceRequest(that.serviceRequest)
                    .then(function (success) {
                        that.endLoading();
                        global.navigation.back("content-pane");
                    }, function (error) {
                        console.log(error.message);
                        that.endLoading();
                    });
            }
        },

        validate: function () {
            this.hideValidationSummary();
            if (!global.validation.isRequiredValid(this.serviceRequest.title)) {
                this.showValidationSummary("Please enter title.");

                return false;
            }

            if (!global.validation.isRequiredValid(this.serviceRequest.dueDate)) {
                this.showValidationSummary("Please enter due date.");

                return false;
            }

            return true;
        }
    }),

    resetScroll: function () {
        global.scroller.resetScroll("submit-service-request-view");
    }
}
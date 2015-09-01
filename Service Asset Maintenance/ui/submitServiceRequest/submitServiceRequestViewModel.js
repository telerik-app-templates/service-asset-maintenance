'use strict';

global.submitServiceRequest = {
    viewModel: new ViewModelBase({
        serviceRequest: null,
        imageSrc: function () {
            return global.converters.convertToImageSrc(this.serviceRequest);
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

        assets: ["123245", "134345", "2345435", "3252325"],

        assetSelected: function (args) {
            var assetNo = args.item.text();
            if (global.assets._complete) {
                global.assets._complete(assetNo);
                global.assets._complete = undefined;
            }

            global.navigation.closeModal(global.constants.views.assets);
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
                global.analytics.trackError(error);
                global.notifications.showErrorMessage(error);
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
                        global.analytics.trackFeature(global.constants.features.submitServiceRequest);

                        that.endLoading();
                        global.navigation.back("content-pane");
                    }, function (error) {
                        global.analytics.trackError(error);

                        that.endLoading();
                    });
            }
        },

        validate: function () {
            this.hideValidationSummary();
            if (!global.validation.isRequiredValid(this.serviceRequest.title)) {
                this.showValidationSummary(global.messages.enterTitleMessage);

                return false;
            }

            if (!global.validation.isRequiredValid(this.serviceRequest.dueDate)) {
                this.showValidationSummary(global.messages.enterDueDateMessage);

                return false;
            }

            return true;
        }
    }),

    resetScroll: function () {
        global.scroller.resetScroll("submit-service-request-view");
    }
}
'use strict';

global.submitServiceRequest = {
    viewModel: new ViewModelBase({
        serviceRequest: null,
        imageData: null,
        assets: ["123245", "134345", "2345435", "3252325"],

        imageSrc: function () {
            var src = global.converters.convertToImageSrc(this.get("imageData"));

            return src;
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


        assetSelected: function (args) {
            var assetNo = args.item.text();
            this.setAssetNo(assetNo);
            $("#assets-actionsheet").data("kendoMobileActionSheet").close();
        },

        setAssetNo: function (assetNo) {
            this.serviceRequest.set("assetNo", assetNo);
            global.submitServiceRequest.resetScroll();
        },

        setPicture: function (data) {
            this.set("imageData", data);
            global.submitServiceRequest.resetScroll();
        },

        takePicture: function () {
            var that = this;
            var options = {
                quality: 50,
                destinationType: navigator.camera.DestinationType.DATA_URL,
                encodingType: 0,
                sourceType: 1,
                targetWidth: 640,
                targetHeight: 480,
            };

            navigator.camera.getPicture(function (data) {
                that.setPicture(data);
            }, function (error) {
                global.analytics.trackError(error);
                global.notifications.showErrorMessage(error);
            }, options);

        },

        scanAssetNo: function () {
            var vm = global.submitServiceRequest.viewModel;
            if (window.navigator.simulator) {
                $("#assets-actionsheet").data("kendoMobileActionSheet").open();
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
                global.serviceRequestModel.submitServiceRequest(that.serviceRequest, that.imageData)
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
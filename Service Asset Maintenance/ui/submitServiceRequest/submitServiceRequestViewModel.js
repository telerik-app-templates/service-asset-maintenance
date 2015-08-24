'use strict';

global.submitServiceRequest = {
    viewModel: new ViewModelBase({
        serviceRequest: {},
        imageSrc: undefined,
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
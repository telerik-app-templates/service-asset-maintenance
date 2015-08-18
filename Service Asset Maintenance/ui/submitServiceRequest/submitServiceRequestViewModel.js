'use strict';

global.submitServiceRequest = {
    viewModel: new ViewModelBase({
        pictureUrl: null,
        serviceRequest: null,
        maintenanceTypes: function () {
            return global.maintenanceTypeModel.dataSource;
        },

        takePicture: function () {
            navigator.camera.getPicture(function (data) {
                this.set("pictureUrl", "data:image/jpeg;base64," + data);
                this.serviceRequest.picture = data;
            }, function (error) {
            }, {
                quality: 50,
                destinationType: navigator.camera.DestinationType.DATA_URL
            });

        },

        scanAssetNo: function () {
            // TODO: add other way to set the asset no, when not on device.
            cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        this.serviceRequest.set('assetNo', result.text);
                    },
                    function (error) {
                    }
                );
        },

        removePicture: function () {
            this.set("pictureUrl", null);
        },

        removeAssetNo: function () {
            this.serviceRequest.set("assetNo", null);
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
        },

        onShow: function (e) {
            var vm = global.submitServiceRequest.viewModel;
            vm.set("serviceRequest", {
                title: "",
                dueDate: new Date(),
                priority: 0,
                maintenanceType: global.constants.DEFAULT_MAINTENANCE_TYPE,
                assetNo: null,
                description: "",
                status: global.constants.serviceRequestStatus.SUBMITTED
            });
        }
    })
}

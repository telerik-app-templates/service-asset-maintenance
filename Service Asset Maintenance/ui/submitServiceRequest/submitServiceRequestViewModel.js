'use strict';

global.submitServiceRequest = {
    viewModel: kendo.observable({
        pictureUrl: null,
        serviceRequest: null,
        maintenanceTypes: [{ Id: 1, Name: "Repair" }, { Id: 2, Name: "Request" }],

        onPriorityChanged: function (e) {
            var buttonGroup = e.sender;
            var index = buttonGroup.current().index();
            global.submitServiceRequest.viewModel.serviceRequest.priority = index;
        },

        takePicture: function () {
            var vm = global.submitServiceRequest.viewModel;
            navigator.camera.getPicture(function (data) {
                vm.set("pictureUrl", "data:image/jpeg;base64," + data);
                vm.serviceRequest.picture = data;
            }, function (error) {
            }, {
                quality: 50,
                destinationType: navigator.camera.DestinationType.DATA_URL
            });

        },

        scanAssetNo: function () {
            // TODO: add other way to set the asset no, when not on device.
            var vm = global.submitServiceRequest.viewModel;
            cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        vm.serviceRequest.set('assetNo', result.text);
                    },
                    function (error) {
                    }
                );
        },

        removePicture: function () {
            var vm = global.submitServiceRequest.viewModel;
            vm.set("pictureUrl", null);
        },

        removeAssetNo: function () {
            var vm = global.submitServiceRequest.viewModel;
            vm.serviceRequest.set("assetNo", null);
        },

        submit: function () {
            var vm = global.submitServiceRequest.viewModel;
            global.serviceRequestModel.submitServiceRequest(vm.serviceRequest)
                .then(function (success) {
                    global.app.navigate("#:back");
                });
        },

        onShow: function (e) {
            var vm = global.submitServiceRequest.viewModel;
            vm.set("serviceRequest", {
                title: "",
                dueDate: new Date(),
                priority: 0,
                type: 1,
                assetNo: null,
                description: "",
                status: global.constants.serviceRequestStatus.SUBMITTED
            });
        }
    })
}

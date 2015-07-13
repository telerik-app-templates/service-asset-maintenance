'use strict';

global.serviceRequestDetails = {
    viewModel: kendo.observable({
        imageUrl: undefined,
        serviceRequest: undefined,
        canCancel: false,
        setServiceRequest: function (serviceRequest) {
            var vm = global.serviceRequestDetails.viewModel;
            vm.set("serviceRequest", serviceRequest);
            vm.set("canCancel", serviceRequest.status != global.constants.serviceRequestStatus.CANCELED);
            var image = serviceRequest.picture ? "data:image/jpeg;base64," + serviceRequest.picture : null;
            vm.set("imageUrl", image);
        },

        cancelServiceRequest: function (e) {
            var vm = global.serviceRequestDetails.viewModel;
            global.serviceRequestModel.cancelServiceRequest(vm.serviceRequest).then(function (success) {
                vm.set("canCancel", false);
            });
        }
    })
}

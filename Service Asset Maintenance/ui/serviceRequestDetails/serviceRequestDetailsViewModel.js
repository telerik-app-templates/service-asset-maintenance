'use strict';

global.serviceRequestDetails = {
    viewModel: kendo.observable({
        canCancel: false,
        serviceRequest: null,
        imageUrl: function () {
            if (this.serviceRequest) {
                var picture = this.serviceRequest.get("picture");

                return picture ? "data:image/jpeg;base64," + picture : null;
            }

            return null;
        },

        statusConverter: function () {
            if (this.serviceRequest) {
                return global.converters.getServiceRequestStatusText(this.serviceRequest.get("status"));
            }

            return null;
        },

        setServiceRequest: function (serviceRequest) {
            this.set("serviceRequest", serviceRequest);
            if (serviceRequest) {
                this.set("canCancel", serviceRequest.status != global.constants.serviceRequestStatus.CANCELED);
                this.set("priorityText", global.converters.convertPriority(this.serviceRequest.priority));
            } 
        },

        cancelServiceRequest: function (e) {
            global.serviceRequestModel.cancelServiceRequest(global.serviceRequestDetails.viewModel.serviceRequest)
                .then(function () {
                global.serviceRequestDetails.viewModel.set("canCancel", false);
            });
        }
    }),

    onInit: function () {
        kendo.bind($("#title"), global.serviceRequestDetails.viewModel);
    },

    onInitWide: function () {
        kendo.bind($("#title-wide"), global.serviceRequestDetails.viewModel);
    }
}

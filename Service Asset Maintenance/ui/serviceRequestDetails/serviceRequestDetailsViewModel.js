'use strict';

global.serviceRequestDetails = {
    viewModel: new ViewModelBase({
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
            var that = this;
            that.beginLoading();
            global.serviceRequestModel.cancelServiceRequest(global.serviceRequestDetails.viewModel.serviceRequest)
                .then(function () {
                    global.serviceRequestDetails.viewModel.set("canCancel", false);
                    that.endLoading();
                }, function (error) {
                    that.endLoading()
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

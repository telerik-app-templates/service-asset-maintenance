'use strict';

global.serviceRequestDetails = {
    viewModel: new ViewModelBase({
        canCancel: false,
        serviceRequest: null,
        imageSrc: function () {
            if (this.serviceRequest) {
                var data = this.serviceRequest.get("picture");
                var result = data ? "data:image/jpeg;base64," + data : null;
                console.log(result);

                return result;
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

            var collapsible = $("#details-collapsible").data("kendoMobileCollapsible");
            if (collapsible) {
                collapsible.resize();
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

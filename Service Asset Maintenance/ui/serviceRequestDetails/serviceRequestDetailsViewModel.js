var CAN_CANCEL_PROPERTY_NAME = "canCancel";

global.serviceRequestDetails = {
    viewModel: new ViewModelBase({
        canCancel: false,
        serviceRequest: null,
        dueDateFormatted: function () {
            if (this.serviceRequest) {
                return global.converters.formatDate(this.serviceRequest.get("dueDate"));
            }

            return "";
        },

        createdAtFormatted: function () {
            if (this.serviceRequest) {
                return global.converters.formatDate(this.serviceRequest.get("createdAt"));
            }

            return null;
        },

        completedAtFormatted: function () {
            if (this.serviceRequest) {
                return global.converters.formatDate(this.serviceRequest.get("completedAt"));
            }

            return null;
        },

        imageSrc: function () {
            return global.converters.convertToImageSrc(this.serviceRequest);
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
                this.set(CAN_CANCEL_PROPERTY_NAME, serviceRequest.status != global.constants.serviceRequestStatus.CANCELED);
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
                    global.analytics.trackFeature(global.constants.features.cancelServiceRequest);

                    global.serviceRequestDetails.viewModel.set(CAN_CANCEL_PROPERTY_NAME, false);
                    that.endLoading();
                }, function (error) {
                    global.analytics.trackError(error);

                    that.endLoading()
                });
        }
    }),

    onInit: function () {
        kendo.bind($("#service-request-details-header"), global.serviceRequestDetails.viewModel);
        kendo.bind($("#service-request-details-footer"), global.serviceRequestDetails.viewModel);
    },

    onInitWide: function () {
        kendo.bind($("#service-request-details-header-wide"), global.serviceRequestDetails.viewModel);
    },

    onShow: function () {
        global.analytics.startTracking(global.constants.features.serviceRequestDetailsView)
    },

    onHide: function () {
        global.analytics.stopTracking(global.constants.features.serviceRequestDetailsView)
    }
}

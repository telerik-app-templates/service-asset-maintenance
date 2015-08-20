'use strict';

global.serviceRequestDetails = {
    viewModel: kendo.observable({
        priorityText: "low",
        canCancel: false,
        imageUrl: "http://www.geekhowtos.com/wp-content/uploads/2011/07/printer-maintenance.jpg",
        serviceRequest: {
            title: "Printer malfunction",
            maintenanceType: "Repair",
            dueDate: new Date(),
            priority: 0,
            status: 2,
            assignedTo: "Peter Petrov",
            description: "Printerls adlkfjlaskjf sladkfj asdfkjdasf fklajsdl fksdaj fjsdfas dsad asd sad sad sad sad sad asd saas",
            assetNo: "123456",
            createdAt: new Date(),
            createdBy: "Peter Petrov",
            completedAt: new Date(),
            reason: "It started to work."
        },

        statusConverter: function () {
            return global.converters.getServiceRequestStatusText(this.serviceRequest.get("status"));
        },

        setServiceRequest: function (serviceRequest) {
            this.set("serviceRequest", serviceRequest);
            this.set("canCancel", serviceRequest.status != global.constants.serviceRequestStatus.CANCELED);
            this.set("priorityText", global.converters.convertPriority(this.serviceRequest.priority));
            var image = serviceRequest.picture ? "data:image/jpeg;base64," + serviceRequest.picture : null;
            this.set("imageUrl", image);
        },

        cancelServiceRequest: function (e) {
            global.serviceRequestModel.cancelServiceRequest(global.serviceRequestDetails.viewModel.serviceRequest)
                .then(function () {
                    console.log("CANCELED")
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

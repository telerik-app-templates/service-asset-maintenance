'use strict';

global.serviceRequestDetails = {
    viewModel: kendo.observable({
        imageUrl: "http://www.geekhowtos.com/wp-content/uploads/2011/07/printer-maintenance.jpg",
        serviceRequest: {
            title: "Printer malfunction",
            maintenanceType: "Repair",
            dueDate: new Date(),
            priority: "high",
            description: "Printerls adlkfjlaskjf sladkfj asdfkjdasf fklajsdl fksdaj fjsdfas dsad asd sad sad sad sad sad asd saas",
            assetNo: "123456",
            createdOn: new Date(),
            createdBy: "Peter Petrov",
            completedOn: new Date(),
            reason: "It started to work."
        },
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

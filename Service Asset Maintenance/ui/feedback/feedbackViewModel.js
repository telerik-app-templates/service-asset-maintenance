'use strict';

global.feedback = {
    viewModel: kendo.observable({
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
        feedbackItem: null,
        feedbackItems: function () {
            return global.feedbackItemModel.dataSource;
        },

        setServiceRequest: function (serviceRequest) {
            var vm = global.feedback.viewModel;
            vm.serviceRequest = serviceRequest;
            global.feedbackItemModel.dataSource.filter(global.createFilterObject("serviceRequestId", "eq", vm.serviceRequest.Id));
            vm.set("feedbackItem", {
                comment: "",
                serviceRequestId: vm.serviceRequest.Id
            });
        },

        submit: function () {
            var vm = global.feedback.viewModel;
            global.feedbackItemModel.submitFeedbackItem(vm.feedbackItem)
                .then(function (success) {
                    vm.set("feedbackItem", {
                        comment: "",
                        serviceRequestId: vm.serviceRequest.Id
                    });
                });
        }
    })
}

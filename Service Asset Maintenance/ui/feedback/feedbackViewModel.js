'use strict';

global.feedback = {
    viewModel: kendo.observable({
        serviceRequestId: null,
        feedbackItem: null,
        feedbackItems: function () {
            return global.feedbackItemModel.dataSource;
        },

        setServiceRequest: function (serviceRequest) {
            var vm = global.feedback.viewModel;
            vm.serviceRequestId = serviceRequest.id;
            global.feedbackItemModel.dataSource.filter(global.createFilterObject("serviceRequestId", "eq", vm.serviceRequestId));
            vm.set("feedbackItem", {
                comment: "",
                serviceRequestId: vm.serviceRequestId
            });
        },

        submit: function () {
            var vm = global.feedback.viewModel;
            global.feedbackItemModel.submitFeedbackItem(vm.feedbackItem)
                .then(function (success) {
                    vm.set("feedbackItem", {
                        comment: "",
                        serviceRequestId: vm.serviceRequestId
                    });
                });
        }
    })
}

'use strict';

global.feedback = {
    viewModel: new ViewModelBase({
        serviceRequest: null,
        feedbackItem: null,

        feedbackItems: function () {
            return global.feedbackItemModel.dataSource;
        },

        setServiceRequest: function (serviceRequest) {
            this.set("serviceRequest", serviceRequest);
            if (serviceRequest) {
                global.feedbackItemModel.dataSource.filter(global.createFilterObject("serviceRequestId", "eq", this.serviceRequest.Id));
                this.createFeedbackItem();
            } 
        },

        submit: function () {
            if (this.validate()) {
                var vm = global.feedback.viewModel;
                global.feedbackItemModel.submitFeedbackItem(this.feedbackItem)
                    .then(function (success) {
                        vm.createFeedbackItem();
                    });
            }
        },

        validate: function () {
            this.hideValidationSummary();
            if (!global.validation.isRequiredValid(this.feedbackItem.comment)) {
                this.showValidationSummary("Please enter comment.");

                return false;
            }

            return true;
        },

        createFeedbackItem: function () {
            this.set("feedbackItem", {
                comment: "",
                serviceRequestId: this.serviceRequest.Id,
                createdBy: global.service.getCurrentUser()
            });
        }
    })
}

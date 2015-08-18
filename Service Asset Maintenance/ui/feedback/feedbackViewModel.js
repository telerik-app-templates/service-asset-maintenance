'use strict';

global.feedback = {
    viewModel: new ViewModelBase({
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
            this.set("serviceRequest", serviceRequest);
            global.feedbackItemModel.dataSource.filter(global.createFilterObject("serviceRequestId", "eq", this.serviceRequest.Id));
            this.newFeedbackItem();
        },

        submit: function () {
            if (this.validate()) {
                var vm = global.feedback.viewModel;
                global.feedbackItemModel.submitFeedbackItem(this.feedbackItem)
                    .then(function (success) {
                        vm.newFeedbackItem();
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

        newFeedbackItem: function () {
            global.feedback.viewModel.set("feedbackItem", {
                comment: "",
                serviceRequestId: this.serviceRequest.Id,
                createdBy: global.service.getCurrentUser()
            });
        }
    })
}

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
                var that = this;
                that.beginLoading();
                global.feedbackItemModel.submitFeedbackItem(that.feedbackItem).then(function (success) {
                    that.createFeedbackItem();
                    that.endLoading();
                }, function (error) {
                    console.log(error);
                    that.endLoading();
                });
            }
        },

        validate: function () {
            this.hideValidationSummary();
            if (!global.validation.isRequiredValid(this.feedbackItem.comment)) {
                this.showValidationSummary(global.messages.enterCommentMessage);

                return false;
            }

            return true;
        },

        createFeedbackItem: function () {
            this.set("feedbackItem", {
                comment: "",
                serviceRequestId: this.serviceRequest.Id,
            });
        }
    }),

    onInit: function () {
        kendo.bind($("#feedback-header"), global.home.viewModel);
    },
}

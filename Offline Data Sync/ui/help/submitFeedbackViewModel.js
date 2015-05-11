
(function (srq) {
    
    var req;
    
    var dataSource = kendo.observable({
        comment: '',
        rating: 5,
        requestReview: false,
        requestId: ''
    });
    
    var feedbackSubmitted = function (result) {
        var notificationElement = $("#feed-notification");
	    notificationElement.kendoNotification();
        var notificationWidget = notificationElement.data("kendoNotification");

        if (result.indexOf("failed") > -1) {
            // failed is in the error string, it failed, don't navigate back yet
            notificationWidget.warning(result);
            srq.app.hideLoading();
        } else {
            notificationWidget.info(result);
            srq.app.navigate("#:back");
            srq.app.hideLoading();
        }
    };
    
    srq.submitFeedback = {        
        viewModel: kendo.observable({
            show: function () {
                req = srq.appSettings.feedbackRequest;
                dataSource.set("requestId", req.id);
                $("#feedback-reason-span").text(req.reason);
                
                if (req.status.indexOf("Completed") > -1) {
                    $("#submit-feedback-wrapper").removeClass('disabled');
                } else {
                    $("#submit-feedback-wrapper").addClass('disabled');
                }
                
                kendo.bind($('#submit-feedback-form'), dataSource, kendo.mobile.ui);
            },
            submitFeedbackItem: function () {
                srq.app.showLoading();
                srq.feedbackItemModel.submitFeedbackItem(dataSource, feedbackSubmitted);
            },
            hide : function () {
                dataSource = kendo.observable({
                    comment: '',
                    rating: 5,
                    requestReview: false,
                    requestId: ''
            	});
            }
        })
    }
    
})(srq);
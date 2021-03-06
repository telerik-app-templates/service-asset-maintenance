
(function (srq) {
    
    srq.feedback = {        
        viewModel: kendo.observable({
            feedbackData: function () {
                return srq.serviceRequestModel.serviceData;
            },
            requestSelected: function (e) {
                var req = e.dataItem;
                srq.appSettings.feedbackRequest = req;
                srq.app.navigate("ui/help/submitFeedbackView.html");
            }
        })
    }
    
})(srq);
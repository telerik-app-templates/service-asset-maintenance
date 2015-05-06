
(function (srq) {
    
    var req;
    
    var reqCancelled = function (e) {
        var notificationElement = $("#req-notification");
	    notificationElement.kendoNotification();
        var notificationWidget = notificationElement.data("kendoNotification");

        notificationWidget.info("Request Submitted for Cancellation.");
        
        srq.app.navigate("#:back");
        srq.app.hideLoading();
    };
    
    srq.requestDetails = {        
        viewModel: kendo.observable({
            show: function () {
                req = srq.appSettings.currentRequest;
                
                if (req.status === "Cancel Requested" || req.status === "Cancelled") {
                    $("#cancel-button").attr('disabled', true);
                } else {
                    $("#cancel-button").removeAttr('disabled');
                }
                
                kendo.bind($('#request-details-form'), req, kendo.mobile.ui);
            },
            cancelRequest: function () {
                srq.app.showLoading();                
                srq.serviceRequestModel.cancelRequest(req, reqCancelled);
            }
        })
    }
    
})(srq);
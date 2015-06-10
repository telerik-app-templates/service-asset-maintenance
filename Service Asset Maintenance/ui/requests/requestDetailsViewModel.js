
(function (srq) {
    
    var req;
    
    var reqCancelled = function (result) {
        var notificationElement = $("#req-notification");
	    notificationElement.kendoNotification();
        var notificationWidget = notificationElement.data("kendoNotification");

        notificationWidget.info(result);
        
        srq.app.navigate("#:back");
        srq.app.hideLoading();
    };
    
    srq.requestDetails = {        
        viewModel: kendo.observable({
            show: function () {
                req = srq.appSettings.currentRequest;
                
                if (req.status.indexOf("Cancel") > -1) {
                    console.log("disabling");
                    $("#cancel-request-wrapper").addClass('disabled');
                } else {
                    console.log("enabling");
                    $("#cancel-request-wrapper").removeClass('disabled');
                }
                
                console.log(req);
                if (req.picture == undefined || req.picture == null || req.picture == "") {
                    $("#request-details-image").hide();
                    $("#no-img-span").show();
                } else {
                    $("#request-details-image").show();
                    $("#no-img-span").hide();
                    var im = document.getElementById('request-details-image');
                	im.src = "data:image/jpeg;base64," + req.picture;
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
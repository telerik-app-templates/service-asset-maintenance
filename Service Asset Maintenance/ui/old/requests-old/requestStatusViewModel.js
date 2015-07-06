
(function (srq) {
    'use strict';
    
    srq.requestStatus = {        
        viewModel: kendo.observable({
            requestData: function () {
                return srq.serviceRequestModel.serviceData;
            },
            requestSelected: function (e) {
                var req = e.dataItem;
                srq.appSettings.currentRequest = req;
                srq.app.navigate("ui/requests/requestDetailsView.html");
            }
        })
    }
    
})(srq);
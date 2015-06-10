
(function (srq) {
    
    var privateVariablesHere;
    
    srq.requestStatus = {        
        viewModel: kendo.observable({
            logout: function () {
                srq.app.navigate("#welcome");                
                srq.everlive.Users.logout();
            },
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
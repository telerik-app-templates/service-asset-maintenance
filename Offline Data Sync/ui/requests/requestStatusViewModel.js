
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
            }
        })
    }
    
})(srq);
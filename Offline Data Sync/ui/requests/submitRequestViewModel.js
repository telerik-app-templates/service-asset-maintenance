
(function (srq) {
    
    var privateVariablesHere;
    
    var dataSource = kendo.observable({
            createdAt: new Date(),
            reason: '',
            dueDate: new Date(),
            completedDate: new Date(),
            priority: '',
            description: '',
            maintenanceType: '',
            location: '',
            status: 'Submitted'
    });
    
    var reqSubmitted = function (e) {
        var notificationElement = $("#sub-notification");
	    notificationElement.kendoNotification();
        var notificationWidget = notificationElement.data("kendoNotification");

        notificationWidget.info("Request Submitted.");
        
        srq.app.navigate("#:back");
        srq.app.hideLoading();
    };
    
    srq.submitRequest = {        
        viewModel: kendo.observable({
            show: function (e) {
                kendo.bind($('#submit-service-request-form'), dataSource, kendo.mobile.ui);
            },
            hide: function (e) {
                dataSource = kendo.observable({
                    createdAt: new Date(),
                    reason: '',
                    dueDate: new Date(),
                    completedDate: new Date(),
                    priority: '',
                    description: '',
                    maintenanceType: '',
                    location: '',
                    status: 'Submitted'
            	});
            },
            submitRequest : function (e) {
                srq.app.showLoading();                
                srq.serviceRequestModel.submitRequest(dataSource, reqSubmitted);
            }
        })
    }
    
})(srq);
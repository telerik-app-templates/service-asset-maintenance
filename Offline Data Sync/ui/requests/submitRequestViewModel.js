
(function (srq) {

    var dataSource = kendo.observable({
        createdAt: new Date(),
        reason: '',
        dueDate: new Date(),
        completedDate: '',
        priority: 'Low',
        description: '',
        maintenanceType: 'Repair',
        location: '',
        status: 'Submitted',
        picture: ''
    });
    
    var reqSubmitted = function (result) {
        var notificationElement = $("#sub-notification");
	    notificationElement.kendoNotification();
        var notificationWidget = notificationElement.data("kendoNotification");        
        
        if (result.indexOf("failed") > -1) {
            notificationWidget.warning(result);
            srq.app.hideLoading();
        } else {
            notificationWidget.info(result);
            srq.app.navigate("#:back");
            srq.app.hideLoading();
        }
    };
    
    var onCameraSuccess = function (imageUri) {
		$("#no-img-yet-span").hide();
        $("#submit-request-image").show();
        
        var im = document.getElementById('submit-request-image');
        im.src = "data:image/jpeg;base64," + imageUri;
		dataSource.set("picture", imageUri);
    };

    var onCameraFail = function (message) {
        var notificationElement = $("#sub-notification");
	    notificationElement.kendoNotification();
        var notificationWidget = notificationElement.data("kendoNotification");        
        
        notificationWidget.warning(message);
    };
    
    srq.submitRequest = {        
        viewModel: kendo.observable({
            show: function (e) {
                $("#no-img-yet-span").show();
                $("#submit-request-image").hide();
                
                kendo.bind($('#submit-service-request-form'), dataSource, kendo.mobile.ui);
            },
            hide: function (e) {
                dataSource = kendo.observable({
                    createdAt: new Date(),
                    reason: '',
                    dueDate: new Date(),
                    completedDate: new Date(),
                    priority: 'Low',
                    description: '',
                    maintenanceType: 'Repair',
                    location: '',
                    status: 'Submitted',
                    picture: ''
            	});
            },
            submitRequest : function (e) {
                console.log(dataSource);
                return;
                srq.app.showLoading();                
                srq.serviceRequestModel.submitRequest(dataSource, reqSubmitted);
            },
            takePicture: function (e) {
                navigator.camera.getPicture(onCameraSuccess, onCameraFail, {
                    quality: 50,
                    destinationType: navigator.camera.DestinationType.DATA_URL
                });
            }
        })
    }
    
})(srq);
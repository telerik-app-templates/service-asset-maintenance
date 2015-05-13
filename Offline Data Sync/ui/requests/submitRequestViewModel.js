
(function (srq) {

    var dataSource = kendo.observable({
        createdAt: new Date(),
        reason: '',
        dueDate: new Date(),
        completedDate: '',
        priority: 'Low',
        description: '',
        maintenanceType: 'Repair',
        //location: '',
        status: 'Submitted',
        picture: '',
        asset: '',
        geoLocation: { "latitude": 0, "longitude": 0 }
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
    
    var geoSucces = function (success) {
        console.log(success);
        dataSource.geoLocation.latitude = success.coords.latitude;
        dataSource.geoLocation.longitude = success.coords.longitude;

        console.log(dataSource);
    };
    
    var geoFail = function (fail) {
        // silent fail right now, defaults to 0:0 from init
    };
    
    var grabGeo = function () {
        navigator.geolocation.getCurrentPosition(geoSucces, geoFail);
    };
    
    srq.submitRequest = {        
        viewModel: kendo.observable({
            show: function (e) {
                $("#no-img-yet-span").show();
                $("#submit-request-image").hide();
                
                grabGeo();
                
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
                    //location: '',
                    status: 'Submitted',
                    picture: '',
                    asset: '',
                    geoLocation: { "latitude": 0, "longitude": 0 }
            	});
            },
            submitRequest : function (e) {
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
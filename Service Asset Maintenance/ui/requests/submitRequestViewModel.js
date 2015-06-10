
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
        picture: '',
        asset: '',
        geoLocation: { "latitude": 0, "longitude": 0 },
        address: ''
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
        dataSource.geoLocation.latitude = success.coords.latitude;
        dataSource.geoLocation.longitude = success.coords.longitude;
		var that = dataSource;
        
        if (google){
            var latLng = new google.maps.LatLng(success.coords.latitude, success.coords.longitude);
            new google.maps.Geocoder().geocode({'latLng':latLng}, function(results, status){
                if (results && results.length){
                    if (results[0].formatted_address){                    
                        that.set("location", results[0].formatted_address);
                    }
                    if (results[0].address_components){
                        that.set("address", JSON.stringify(results[0].address_components));
                    }
                }
            });
        }
    };
    
    var geoFail = function (fail) {
        // silent fail right now, defaults to 0:0 from init
    };
    
    var grabGeo = function () {
        navigator.geolocation.getCurrentPosition(geoSucces, geoFail);
    };
    
    srq.submitRequest = {        
        viewModel: kendo.observable({
            init: function (e) {
                $("#submit-request-title").text(srq.appSettings.strings.submitRequestHeader);
                $("#submit-request-button-text").text(srq.appSettings.strings.submitRequestHeader);
                $("#take-picture-button-text").text(srq.appSettings.strings.takePicture);
                $("#no-img-yet-span").text(srq.appSettings.strings.addPictureText);
                
                if (window.navigator.simulator === true) {
                    $("#deviceDiv").hide();
                } else {
                    $("#simulatedDiv").hide();
                }
            },
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
                    location: '',
                    status: 'Submitted',
                    picture: '',
                    asset: '',
                    geoLocation: { "latitude": 0, "longitude": 0 },
                    address: ''
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
            },
            scanBarcode: function (e) {
                cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        dataSource.set('asset', result.text);                    
                        $("#captured-asset").text(result.text);
                    },
                    function (error) {
                        console.log("scan error");
                        console.log(error);
                    }
                );
            }
        })
    }
    
})(srq);
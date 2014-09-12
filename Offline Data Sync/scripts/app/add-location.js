var app = app || {};

app.AddLocation = (function () {
    'use strict';

    var addLocationViewModel = (function () {

        var dataSource;

        var addLocation = function () {            
            console.log("dataSource");
            console.log(dataSource);
            app.AppStorage.locations.addLocation( dataSource );
            app.mobileApp.navigate('#:back');
        };
        
        var grabLocationGPS = function () {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        };
        
        var onSuccess = function (position) {
            dataSource.GeoLocation.latitude = position.coords.latitude;
            dataSource.GeoLocation.longitude = position.coords.longitude;
            
            $('#lat').text(position.coords.latitude);
            $('#long').text(position.coords.longitude);
        };
        
        var onError = function (error) {
            app.showError(error.message);
        };

        var init = function () {
			console.log("addLocationViewModel init");
        }

        var show = function () {
            dataSource = kendo.observable({
                NoteTitle: '',
                Description: '',
                GeoLocation: { "latitude": 0, "longitude": 0 },
                Employee: ''
            });
            kendo.bind($('#add-location-form'), dataSource, kendo.mobile.ui);
        };

        return {
            init: init,
            show: show,
            addLocation: addLocation,
            grabLocationGPS: grabLocationGPS
        };

    }());

    return addLocationViewModel;

}());

var app = app || {};

app.LocationMaintenance = (function () {
	'use strict'
    
    var locationMaintenanceViewModel = (function () {

        var init = function () {
            console.log("locationMaintenanceViewModel init");
        };

        var locationSelected = function (e) {
            app.mobileApp.navigate('views/locationView.html?uid=' + e.data.uid);
        };        
        
        return {
            locationSelected: locationSelected,
            locations: app.AppStorage.locations.locationDataSource,
            init: init
        };
        
    }());
    
    return locationMaintenanceViewModel;
        
}());
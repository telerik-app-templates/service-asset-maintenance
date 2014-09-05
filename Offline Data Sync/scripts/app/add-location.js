var app = app || {};

app.AddLocation = (function () {
    'use strict';

    var addLocationViewModel = (function () {

        var dataSource;
        var isCollecting = false;
        var interval;
        var pointsDataSource;
        var points = [];

        var addLocation = function () {            
            //  condensedPoints, shorter markup than JSON
			var cond = "";
            
            var pointsLength = points.length;
            
            for (var i = 0; i < pointsLength; i++) {
                cond = cond + "|la=" + points[i].latitude + "_lo=" + points[i].longitude;
            }
            
            var loc = {
                CreatedAt: new Date().getTime(),
                Name: dataSource.LocationName,
                Points: cond
            };
            
            app.AppStorage.locations.addLocation( loc );            
            app.mobileApp.navigate('#:back');
        };
        
        var togglePointCollection = function () {
            if (isCollecting == false) {
                $('#startStopButton').text("Stop");
                isCollecting = true;
                interval = setInterval( function() { getPoints() }, 2000);
            } else {
				$('#startStopButton').text("Start");
                isCollecting = false;
                clearInterval(interval);
                interval = null;
            }
        };
        
        var getPoints = function () {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        };
        
        var onSuccess = function (position) {
            var pt = { "longitude": position.coords.longitude, "latitude": position.coords.latitude };
            points.push(pt);            
            
            $('#lastLat').text(position.coords.latitude);
            $('#lastLong').text(position.coords.longitude);
            $('#pointCount').text(points.length);
        };
        
        var onError = function (error) {
            app.showError(error.message);
        };

        var init = function () {
			console.log("addLocationViewModel init");
        }

        var show = function () {
            dataSource = kendo.observable({
                LocationName: ''
            });
            kendo.bind($('#add-location-form'), dataSource, kendo.mobile.ui);
        };

        return {
            init: init,
            show: show,
            addLocation: addLocation,
            togglePointCollection: togglePointCollection
        };

    }());

    return addLocationViewModel;

}());

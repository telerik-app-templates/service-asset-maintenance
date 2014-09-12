var app = app || {};

app.Location = (function () {
	'use strict'
    
    var locationViewModel = (function () {
        
        var location;
        
        var init = function () {
            console.log("locationViewModel init");
        };
        
        var show = function (e) {
            var locationId = e.view.params.uid;
            
            location = app.AppStorage.locations.locationDataSource.getByUid(locationId);
            
            if (location != null) {
                $('#locationTitleSpan').text(location.NoteTitle);                                               
            } else {
                console.log("Problem loading location.");
            }
            
        };
        
        return {
            init: init,
            show: show
        };
        
    }());
    
    return locationViewModel;
        
}());
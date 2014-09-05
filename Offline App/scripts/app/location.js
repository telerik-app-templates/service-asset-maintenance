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
                $('#locationNameSpan').text(location.Name);
                
                var pointArray = [];
                
            	var points = location.Points;
                var pts = points.split("|");
                
                var ptsLen = pts.length - 1;
                
                var latSum = 0;
                var longSum = 0;
                
                for (var i = 1; i <= ptsLen; i++) {
                    var pt = pts[i];
                    var ptSplit = pt.split("_");
                    
                    // 0 = la, 1 = lo                    
                    var laSplit = ptSplit[0].split("=");
                    var loSplit = ptSplit[1].split("=");
                    
                    pointArray.push({ "latitude": laSplit[1], "longitude": loSplit[1] });
                    latSum += parseFloat(laSplit[1]);
                    longSum += parseFloat(loSplit[1]);
                }                
                
                var latAv = latSum / ptsLen;
                var longAv = longSum / ptsLen;
                
                // points popup
                $("#location-points").kendoMobileListView({
                    dataSource: new kendo.data.DataSource({ data: pointArray }),
                    template: kendo.template($("#pointsTemplate").html())
                });
                
                // map
                $("#locationMap").kendoMap({
                    center: [latAv, longAv],
                    zoom: 3,
                    layers: [{
                        type: "tile",
                        urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                        subdomains: ["a", "b", "c"],
                        attribution: "&copy; <a href='http://osm.org/copyright'>OpenStreetMap contributors</a>"
                    }],
                    markers: [{
                        location: [latAv, longAv],
                        shape: "pinTarget",
                        tooltip: {
                            content: location.Name
                        }
                    }]
                });
                
            } else {
                console.log("Problem loading location.");
            }
            
        };
        
        var closePoints = function () {
            $("#modalview-points").kendoMobileModalView("close");
        };
        
        return {
            init: init,
            show: show,
            closePoints: closePoints
        };
        
    }());
    
    return locationViewModel;
        
}());
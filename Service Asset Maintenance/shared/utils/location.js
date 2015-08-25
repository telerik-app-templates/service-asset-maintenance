global.location = {
    getLocation: function (result) {
        return new Promise(function (resolve, reject) {
            console.log("GET LOCATION");
            navigator.geolocation.getCurrentPosition(function (location) {
                console.log("LOCATION: " + location);
                resolve(result, location.coords)
            }, function (error) {
                console.log("GET LOCATION ERROR: " + error.message);
                reject(error);
            });
        }).then(function (r, location) {
            r.geoLocation = {
                latitude: result.coords.latitude,
                longitude: result.coords.longitude
            }
        });
    },

    getAddress: function (result, coords) {
        return new Promise(function (resolve, reject) {
            if (google) {
                var latLng = new google.maps.LatLng(coords.latitude, coords.longitude);
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({ latLng: latLng }, function (results, status) {
                    if (results && results.length) {
                        resolve(results[0]);
                    } else {
                        reject({ message: "Not found." });
                    }
                });
            } else {
                reject({ message: "Google maps not found." });
            }
        }).then(function (address) { 
            result.location = result.formatted_address;
            result.address = result.address_components;
        });
    }
}
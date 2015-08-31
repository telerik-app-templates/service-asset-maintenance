global.location = {
    getLocation: function () {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(function (location) {
                resolve(location.coords)
            }, function (error) {
                reject(error);
            });
        });
    },

    getAddress: function (coords) {
        return new Promise(function (resolve, reject) {
            if (google) {
                var latLng = new google.maps.LatLng(coords.latitude, coords.longitude);
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({ latLng: latLng }, function (results, status) {
                    if (results && results.length) {
                        var address = results[0];
                        resolve({
                            geolocation: {
                                latitude: coords.latitude,
                                longitude: coords.longitude
                            },

                            address: address.formatted_address
                        });
                    } else {
                        reject({ message: global.messages.notFoundMessage });
                    }
                });
            } else {
                reject({ message: global.messages.notFoundMessage });
            }
        })
    },

    getAddressAndGeolocation: function () {
        return global.location.getLocation()
            .then(global.location.getAddress);
    }
}
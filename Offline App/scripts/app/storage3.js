var app = app || {};

app.AppStorage = (function () {
    'use strict'
    
    var currentUserId;
    
    var guid = (function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return function() {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };
    })();
    
	var online = (window.localStorage.getItem("online") === 'true');
    
    // locations
    var lKey = "LOCATIONTEST";
    var dslKey = "locationsZ";
    
    var locationsModel = (function() {
        var locationModel = {
            id: 'Id',
            fields: {
                CreatedAt: {
                    field: 'CreatedAt',
                    defaultValue: new Date()
                },
                Name: {
                    field: 'Name',
                    defaultValue: ''
                },
                Points: {
                    field: 'Points',
                    defaultValue: ''
                },
                LocalId: {
                    field: 'LocalId',
                    defaultValue: ''
                }
            }
        };
        
        var locationDataSource = new kendo.data.DataSource({
            offlineStorage: dslKey,
            type: 'everlive',
            schema: {
                model: locationModel
            }, 
            transport: {
                typeName: 'Location'
            },
        });
        
        locationDataSource.online(online);
        
        return {
            locations: locationDataSource 
        };        
    }());
    
    var locationViewModel = (function() {
        
        var syncData = function () {
            locationsModel.locations.sync();
        };
        
        var saveLocal = function () {
            var dj = locationsModel.locations.data().toJSON();
            var djstring = JSON.stringify(dj);
            window.localStorage.setItem(lKey, djstring);
        };
        
        var addLocation = function ( ds ) {
            locationsModel.locations.add( ds );
            syncData();
        };
        
        var editLocation = function ( updateLocation ) {
            updateLocation.ModifiedAt = new Date();
            syncData();
        };

        return {
            locationDataSource: locationsModel.locations,
            addLocation: addLocation,
            edit: editLocation,
            sync: syncData
        };
        
    }());
    
    // persons    
    var pKey = "PERSONTEST_Z";
    var dspKey = "personsZ";
    
    var personsModel = (function() {
        
        var personModel = {
            id: 'Id',
            fields: {
                CreatedAt: {
                    field: 'CreatedAt',
                    defaultValue: new Date()
                },
                Name: {
                    field: 'Name',
                    defaultValue: ''
                },
                Club: {
                    field: 'Club',
                    defaultValue: ''
                },
                Crop: {
                    field: 'Crop',
                    defaultValue: 0
                },
                DateOfBirth: {
                    field: 'DateOfBirth',
                    defaultValue: new Date()
                },
                DependentCount: {
                    field: 'DependentCount',
                    defaultValue: 0
                },
                FarmerCode: {
                    field: 'FarmerCode',
                    defaultValue: 0
                },
                FarmerType: {
                    field: 'FarmerType',
                    defaultValue: ''
                },
                Gender: {
                    field: 'Gender',
                    defaultValue: ''
                },
                MaritalStatus: {
                    field: 'MaritalStatus',
                    defaultValue: ''
                }
            }
        };
        
        var personDataSource = new kendo.data.DataSource({
            offlineStorage: dspKey,
            type: 'everlive',
            schema: {
                model: personModel
            }, 
            transport: {
                typeName: 'Person'
            }
        });
        
        personDataSource.online(online);
        
        return {
            persons: personDataSource
        };

    }());
        
    var personViewModel = (function () {

        var syncData = function () {
            personsModel.persons.sync();
        };
        
        var saveLocal = function () {            
            var dj = personsModel.persons.data().toJSON();
            var djstring = JSON.stringify(dj);
            window.localStorage.setItem(pKey, djstring);
        };
        
        var addPerson = function ( ds ) {
            personsModel.persons.add( ds );
            syncData();
        };

        var editPerson = function ( updatePerson ) {
            updatePerson.ModifiedAt = new Date();
            syncData();
        };

        return {
            personDataSource: personsModel.persons,
            addPerson: addPerson,
            edit: editPerson,
            sync: syncData
        };        
    }());
    
    var init = function () {
        console.log("StorageTest init");
    };
    
    var setOnline = function ( status ) {
        personViewModel.personDataSource.online(status);
        locationViewModel.locationDataSource.online(status);
        window.localStorage.setItem("online", status);
    };
    
    var setUserId = function ( userId ) {
        currentUserId = userId;
        window.localStorage.setItem("currentUser", userId);
    };
    
    return {
        persons: personViewModel,
        locations: locationViewModel,
        init: init,
        setOnline: setOnline,
        setUserId: setUserId
    };        
}());
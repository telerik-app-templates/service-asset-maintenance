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
    var dslKey = "locationNoteStorage";
    
    var locationNoteModel = (function() {
        var locationModel = {
            id: Everlive.idField,
            fields: {
                createdAt: {
                    field: 'CreatedAt',
                    defaultValue: new Date()
                },
                noteTitle: {
                    field: 'NoteTitle',
                    defaultValue: ''
                },
                description: {
                    field: 'Description',
                    defaultValue: ''
                },
                geoLocation: {
                    field: 'GeoLocation',
                    defaultValue: ''
                },
                employee: {
                    field: 'Employee',
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
                typeName: 'LocationNote'
            },
        });
        
        locationDataSource.online(online);
        
        return {
            locations: locationDataSource 
        };        
    }());
    
    var locationViewModel = (function() {
        
        var syncData = function () {
            locationNoteModel.locations.sync();
        };
        
        var addLocation = function ( ds ) {
            console.log("in storage");
            locationNoteModel.locations.add( ds );
            syncData();
        };
        
        var editLocation = function ( updateLocation ) {
            updateLocation.ModifiedAt = new Date();
            syncData();
        };

        return {
            locationDataSource: locationNoteModel.locations,
            addLocation: addLocation,
            edit: editLocation,
            sync: syncData
        };
        
    }());
    
    // employees
    var dseKey = "employeeStorage";
    
    var employeesModel = (function() {
        
        var employeeModel = {
            id: Everlive.idField,
            fields: {
                createdAt: {
                    field: 'CreatedAt',
                    defaultValue: new Date()
                },
                name: {
                    field: 'Name',
                    defaultValue: ''
                },
                department: {
                    field: 'Department',
                    defaultValue: ''
                },
                position: {
                    field: 'Position',
                    defaultValue: ''
                }
            }
        };
        
        var employeeDataSource = new kendo.data.DataSource({
            offlineStorage: dseKey,
            type: 'everlive',
            schema: {
                model: employeeModel
            }, 
            transport: {
                typeName: 'Employee'
            }
        });
        
        employeeDataSource.online(online);
        
        return {
            employees: employeeDataSource
        };

    }());
        
    var employeeViewModel = (function () {

        var syncData = function () {
            employeesModel.employees.sync();
        };
        
        var addEmployee = function ( ds ) {
            employeesModel.employees.add( ds );
            syncData();
        };

        var editEmployee = function ( updateEmployee ) {
            var employeeToUpdate = employeesModel.employees.get(updateEmployee.Id);
            console.log(employeeToUpdate);
            employeeToUpdate.set('Name', updateEmployee.Name);
            employeeToUpdate.set('Department', updateEmployee.Department);
            employeeToUpdate.set('Position', updateEmployee.Position);
            console.log(employeeToUpdate);
            syncData();
        };

        return {
            employeeDataSource: employeesModel.employees,
            addEmployee: addEmployee,
            edit: editEmployee,
            sync: syncData
        };        
    }());
    
    var init = function () {
        console.log("appstorage init");
    };
    
    var setOnline = function ( status ) {
        employeeViewModel.employeeDataSource.online(status);
        locationViewModel.locationDataSource.online(status);
        window.localStorage.setItem("online", status);
    };
    
    var setUserId = function ( userId ) {
        currentUserId = userId;
        window.localStorage.setItem("currentUser", userId);
    };
    
    return {
        employees: employeeViewModel,
        locations: locationViewModel,
        init: init,
        setOnline: setOnline,
        setUserId: setUserId
    };        
}());
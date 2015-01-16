var app = app || {};

app.AddLocation = (function () {
    'use strict';

    var addLocationViewModel = (function () {

        var dataSource,
            selectedEmployee;

        var addLocation = function () {
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
            console.log("addLocationViewModel show");
            dataSource = kendo.observable({
                noteTitle: '',
                description: '',
                geoLocation: { "latitude": 0, "longitude": 0 },
                employee: '00000000-0000-0000-0000-000000000000'
            });
            
            kendo.bind($('#add-location-form'), dataSource, kendo.mobile.ui);

            var employees = app.AppStorage.employees.employeeDataSource;

            if (employees && employees.data.length > 0) {
                $("#employee-select-list").kendoMobileListView({
                    dataSource: employees,
                    template: kendo.template($("#employeeSelectTemplate").html()),
                    click: setSelectedEmployee,
                    style: "inset"
                });
            } else {
                console.log("no employees");
                $("#employee-select-list").hide();
                $("#no-selectable-employees").show();
            }
        };

        var setSelectedEmployee = function (e) {
            processSelection(e.dataItem);
            closeEmployeeSelect();
        };

        var processSelection = function ( emp ) {
            $("#selection-span").text(emp.name);
            dataSource.Employee = emp.uid;
        };

        var closeEmployeeSelect = function () {
            $("#modal-employee-select").kendoMobileModalView("close");
        };

        return {
            init: init,
            show: show,
            addLocation: addLocation,
            grabLocationGPS: grabLocationGPS,
            closeEmployeeSelect: closeEmployeeSelect
        };

    }());

    return addLocationViewModel;

}());

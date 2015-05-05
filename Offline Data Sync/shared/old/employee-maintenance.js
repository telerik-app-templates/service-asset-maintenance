var app = app || {};

app.EmployeeMaintenance = (function () {
    'use strict'

    var employeeManagementViewModel = (function () {
        
		var dataSource = app.AppStorage.employees.employeeDataSource;
        
        var init = function () {
			console.log("employeeManagementViewModel init");
            
            $("#employees-listview").kendoMobileListView({
                dataSource: dataSource,
                template: kendo.template($("#employeeTemplate").html()),
                click: employeeSelected,
                style: "inset"
            });
        };

        var employeeSelected = function (e) {
            app.mobileApp.navigate('views/employeeView.html?uid=' + e.dataItem.uid);
        };        

        return {
            init: init,
            employeeSelected: employeeSelected
        };

    }());

    return employeeManagementViewModel;

}());

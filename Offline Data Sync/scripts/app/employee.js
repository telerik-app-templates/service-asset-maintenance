var app = app || {};

app.Employee = (function () {
	'use strict'

    var employeeViewModel = (function () {
        
        var employee;
        
        var init = function () {
            console.log("employeeViewModel init");
            
            $("#edit-employee-button").on("click", function () {
                app.mobileApp.navigate('views/editEmployeeView.html?uid=' + employee.uid);                
            });
        };
        
        var show = function (e) {
            var employeeId = e.view.params.uid;
            
            employee = app.AppStorage.employees.employeeDataSource.getByUid(employeeId);
            
            if (employee != null) {
                console.log(employee);
                //$('#employeeNameSpan').text(employee.name);
                kendo.bind($('#employee-view-form'), employee, kendo.mobile.ui);
            } else {
                console.log("Problem loading employee.");
            }
        };
        
        return {
            init: init,
            show: show
        };
        
    }());
    
    return employeeViewModel;
        
}());
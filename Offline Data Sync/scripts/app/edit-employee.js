var app = app || {};

app.EditEmployee = (function () {
    'use strict';

    var editEmployeeViewModel = (function () {

        var dataSource;
		var $signUpForm;
        var $formFields;
        var $signupBtnWrp;
        var validator;
        var employee;
        
        var init = function () {
			console.log("editEmployeeViewModel init");
            
            $signUpForm = $('#editEmployeeForm');
            $formFields = $signUpForm.find('input, textarea, select');
            $signupBtnWrp = $('#signupBtnWrp');
            validator = $signUpForm.kendoValidator({ validateOnBlur: false }).data('kendoValidator');

            $formFields.on('keyup keypress blur change input', function () {
                if (validator.validate()) {
                    $signupBtnWrp.removeClass('disabled');
                } else {
                    $signupBtnWrp.addClass('disabled');
                }
            });            
        }

        var show = function (e) {
            var employeeId = e.view.params.uid;
            
            employee = app.AppStorage.employees.employeeDataSource.getByUid(employeeId);
            
            if (employee == null) {
                console.log("Problem loading employee.");
            }
            
            /*dataSource = kendo.observable({
                Name: employee.Name,
                Position: employee.Position,
                Department: employee.Department,
                CreatedAt: employee.CreatedAt
            }); */
            //kendo.bind($('#edit-employee-form'), dataSource, kendo.mobile.ui);
            kendo.bind($('#edit-employee-form'), employee, kendo.mobile.ui);
        };
        
		var hide = function () {
            $signupBtnWrp.addClass('disabled');
        };

        var editEmployee = function () {
            //employee.Name = dataSource.Name;
            //employee.Position = dataSource.Position;
            //employee.Department = dataSource.Department;

            app.AppStorage.employees.edit( employee );
            app.mobileApp.navigate('#:back');
        };
        
        return {
            init: init,
            show: show,
            hide: hide,
            editEmployee: editEmployee
        };

    }());

    return editEmployeeViewModel;

}());

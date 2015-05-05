var app = app || {};

app.AddEmployee = (function () {
    'use strict';
    
    var addEmployeeViewModel = (function () {

        var dataSource;
		var $signUpForm;
        var $formFields;
        var $signupBtnWrp;
        var validator;
        
        var init = function () {
			console.log("addEmployeeViewModel init");
            
            $signUpForm = $('#addEmployeeForm');
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
        };

        var show = function () {            
            dataSource = kendo.observable({
                name: '',
                position: '',
                department: '',
                createdAt: new Date()
            });
            
            kendo.bind($('#add-employee-form'), dataSource, kendo.mobile.ui);
        };
        
		var hide = function () {
            $signupBtnWrp.addClass('disabled');
        };
        
        var addEmployee = function () {
            app.AppStorage.employees.addEmployee( dataSource );
            app.mobileApp.navigate('#:back');
        };

        return {
            init: init,
            show: show,
            hide: hide,
            addEmployee: addEmployee
        };

    }());

    return addEmployeeViewModel;

}());

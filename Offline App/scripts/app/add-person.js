var app = app || {};

app.AddPerson = (function () {
    'use strict';
    
    var addPersonViewModel = (function () {

        var dataSource;
		var $signUpForm;
        var $formFields;
        var $signupBtnWrp;
        var validator;
        
        var init = function () {
			console.log("addPersonViewModel init");
            
            $signUpForm = $('#addPersonForm');
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
            
            if (kendo.ui.DropDownList) {
                $("#signupGenderPicker").kendoDropDownList();
            } // ensure kendo is loaded, otherwise if that doesn't work for any reason it'll default to dropdown selection
        };

        var show = function () {            
            dataSource = kendo.observable({
                Name: '',
                Club: '',
                Crop: '',
                CreatedAt: new Date(),
                DateOfBirth: new Date(),
                DependentCount: '',
                FarmerCode: '',
                FarmerType: '',
                Gender: 'Female',
                MaritalStatus: '',
                LocalId: ''
            });
            
            kendo.bind($('#add-person-form'), dataSource, kendo.mobile.ui);
        };
        
		var hide = function () {
            $signupBtnWrp.addClass('disabled');
        };
        
        var addPerson = function () {
            app.AppStorage.persons.addPerson( dataSource );
            app.mobileApp.navigate('#:back');
        };

        return {
            init: init,
            show: show,
            hide: hide,
            addPerson: addPerson
        };

    }());

    return addPersonViewModel;

}());

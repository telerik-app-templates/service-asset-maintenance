var app = app || {};

app.EditPerson = (function () {
    'use strict';

    var editPersonViewModel = (function () {

        var dataSource;
		var $signUpForm;
        var $formFields;
        var $signupBtnWrp;
        var validator;
        var person;
        
        var init = function () {
			console.log("editPersonViewModel init");
            
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
        }

        var show = function (e) {
            var personId = e.view.params.uid;
            
            person = app.AppStorage.persons.personDataSource.getByUid(personId);
            
            if (person == null) {
                console.log("Problem loading person.");
            }
            
            dataSource = kendo.observable({
                Name: person.Name,
                Club: person.Club,
                Crop: person.Crop,
                DateOfBirth: new Date(person.DateOfBirth),
                DependentCount: person.DependentCount,
                FarmerCode: person.FarmerCode,
                FarmerType: person.FarmerType,
                Gender: person.Gender,
                MaritalStatus: person.MaritalStatus,
                CreatedAt: person.CreatedAt
            });
            kendo.bind($('#add-person-form'), dataSource, kendo.mobile.ui);

            $("#signupGenderPicker").data("kendoDropDownList").select( function ( dataItem ) {
                return dataItem.text === person.Gender;
            });
        };
        
		var hide = function () {
            $signupBtnWrp.addClass('disabled');
        };

        var editPerson = function () {
            var birthday = new Date(dataSource.DateOfBirth);
            
            if (birthday.toJSON() === null) {
                birthday = new Date();
            }
                        
            person.Name = dataSource.Name;
            person.Club = dataSource.Club;
            person.Crop = parseInt(dataSource.Crop);
            person.DateOfBirth = birthday;
            person.DependentCount = parseInt(dataSource.DependentCount);
            person.FarmerCode = parseInt(dataSource.FarmerCode);
            person.FarmerType = dataSource.FarmerType;
            person.Gender = dataSource.Gender;
            person.MaritalStatus = dataSource.MaritalStatus;

            app.AppStorage.persons.edit( person );
            app.mobileApp.navigate('#:back');
        };
        
        return {
            init: init,
            show: show,
            hide: hide,
            editPerson: editPerson
        };

    }());

    return editPersonViewModel;

}());

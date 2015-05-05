
(function (srq) {
    
    var dataSource;
    var $signUpForm, $formFields, $signupBtnWrp, validator;
    
    srq.signup = {
        viewModel: kendo.observable({
            signup: function () {

                dataSource.Gender = parseInt(dataSource.Gender);
                var birthDate = new Date(dataSource.BirthDate);

                if (birthDate.toJSON() === null) {
                    birthDate = new Date();
                }

                dataSource.BirthDate = birthDate;
                               
                srq.everlive.Users.register(
                    dataSource.Username,
                    dataSource.Password,
                    dataSource)
                .then(function () {
                    srq.notify("Registration successful", "Success", null);
                    srq.app.navigate('#welcome');
                },
                function (err) {
                    srq.notify(err.message, "Error", null);
                });
            },

            init: function (e) {
                $signUpForm = $('#signUp');
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
            },
            show: function (e) {
                dataSource = kendo.observable({
                    Username: '',
                    Password: '',
                    DisplayName: '',
                    Email: '',
                    Gender: '0',
                    About: '',
                    Friends: [],
                    BirthDate: new Date()
                });
                kendo.bind($('#signup-form'), dataSource, kendo.mobile.ui);
            },
            hide: function () {
                $signupBtnWrp.addClass('disabled');
            },
            onSelectChange: function (sel) {
                var selected = sel.options[sel.selectedIndex].value;
                sel.style.color = (selected == 0) ? '#b6c5c6' : '#34495e';
            }
        })
    }
})(srq);


(function (srq) {
    
    var dataSource;
    var $signUpForm, $formFields, $signupBtnWrp, validator;
    
    srq.signup = {
        viewModel: kendo.observable({
            signup: function () {              
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
                // init strings
                $("#signup-header-title").text(srq.appSettings.strings.signupTitle);
                $("#register-button-text").text(srq.appSettings.strings.registerText);
                
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
                    About: ''
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

var app = app || {};

app.Login = (function () {
    'use strict';

    var loginViewModel = (function () {

        var isInMistSimulator = (location.host.indexOf('icenium.com') > -1);

        var $loginUsername;
        var $loginPassword;

        var init = function () {
            app.AppStorage.init();

            if (!app.isKeySet(appSettings.everlive.apiKey)) {
                app.mobileApp.navigate('views/noApiKey.html', 'fade');
            }

            $loginUsername = $('#loginUsername');
            $loginPassword = $('#loginPassword');
        };

        var show = function () {
            $loginUsername.val('demo');
            $loginPassword.val('demo');            
        };

        // Authenticate to use Backend Services as a particular user
        var login = function () {
            /*
            var username = $loginUsername.val();
            var password = $loginPassword.val();

            // Authenticate using the username and password
            app.everlive.Users.login(username, password)
            .then(function () {
                // EQATEC analytics monitor - track login type                
            })
            .then(function () {
                app.everlive.Users.currentUser()
                .then(function ( data ) {
                    app.AppStorage.setUserId(data.result.Id);
                },
                 function ( error ) {
					// problem
                });
                
                app.mobileApp.navigate('views/mainMenuView.html');
            })
            .then(null,
                  function (err) {
                      app.showError(err.message);
                  }
            );
            */
            
            $.soap({
                url: 'http://hctwebapps.hct.ac.ae/MobilePOC/HCTService.svc/',
                method: 'GetLoginInfo',
                data: {
                    UserName: 'H00234802',
                    Password: 'telerikpoc'
                },
                success: function (soapSuccess) {
                    console.log(soapSuccess);
                },
                error: function (soapError) {
                    console.log(soapError);
                }
            });
        };

        var showMistAlert = function () {
            alert(appSettings.messages.mistSimulatorAlert);
        };

        return {
            init: init,
            show: show,
            getYear: app.getYear,
            login: login
        };

    }());

    return loginViewModel;

}());

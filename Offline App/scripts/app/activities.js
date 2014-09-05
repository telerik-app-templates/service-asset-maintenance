var app = app || {};

app.Activities = (function () {
    'use strict'

    var activitiesModel = (function () {

        var menuData = [
            {displayName: "People Maintenance", viewName: "personMaintenanceView.html"}, 
            {displayName: "Location Maintenance", viewName: "locationMaintenanceView.html"}, 
            {displayName: "User Setup", viewName: "userSetupView.html"}, 
            {displayName: "Data-Sync", viewName: "dataSyncView.html"}, 
            {displayName: "Logout", viewName: "logout"}
        ];
        
        return {
            activities: menuData
        };

    }());
    
    var activitiesViewModel = (function () {

        var navigateHome = function () {
            app.mobileApp.navigate('#welcome');
        };

        var logout = function () {
            app.helper.logout()
            .then(navigateHome, function (err) {
                app.showError(err.message);
                navigateHome();
            });
        };

        return {
            activities: activitiesModel.activities,
            logout: logout
        };

    }());

    return activitiesViewModel;

}());

var app = app || {};

app.MainMenu = (function () {
    'use strict'

    var menuModel = (function () {

        var menuData = [
            {displayName: "Employee Maintenance", viewName: "employeeMaintenanceView.html"}, 
            {displayName: "Location Maintenance", viewName: "locationMaintenanceView.html"}, 
            {displayName: "Data-Sync", viewName: "dataSyncView.html"}
        ];
        
        return {
            menuItems: menuData
        };

    }());
    
    var mainViewModel = (function () {

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
            menuItems: menuModel.menuItems,
            logout: logout
        };

    }());

    return mainViewModel;

}());

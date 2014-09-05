var app = app || {};

app.PersonMaintenance = (function () {
    'use strict'

    var peopleManagementViewModel = (function () {
        
		var dataSource = app.AppStorage.persons.personDataSource;
        
        var init = function () {
			console.log("peopleManagementViewModel init");
            
            $("#persons-listview").kendoMobileListView({
                dataSource: dataSource,
                template: kendo.template($("#personTemplate").html()),
                click: personSelected
            });
        };

        var personSelected = function (e) {
            app.mobileApp.navigate('views/personView.html?uid=' + e.dataItem.uid);
        };        

        return {
            init: init,
            personSelected: personSelected
        };

    }());

    return peopleManagementViewModel;

}());

var app = app || {};

app.Person = (function () {
	'use strict'

    var personViewModel = (function () {
        
        var person;
        
        var init = function () {
            console.log("personViewModel init");
            
            $("#edit-person-button").on("click", function () {
                app.mobileApp.navigate('views/editPersonView.html?uid=' + person.uid);                
            });
        };
        
        var show = function (e) {
            var personId = e.view.params.uid;
            
            person = app.AppStorage.persons.personDataSource.getByUid(personId);
            
            if (person != null) {
                $('#personNameSpan').text(person.Name);
                $("#personClubSpan").text(person.Club);
                $("#personFarmerTypeSpan").text(person.FarmerType);
            } else {
                console.log("Problem loading person.");
            }
        };
        
        return {
            init: init,
            show: show
        };
        
    }());
    
    return personViewModel;
        
}());
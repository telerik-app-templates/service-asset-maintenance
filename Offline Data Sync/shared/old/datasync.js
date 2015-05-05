var app = app || {};

app.DataSync = (function () {
	'use strict'
    
    var dataSyncViewModel = (function () {
        
        var init = function () {
            console.log("dataSyncViewModel init");
            
            var isOnline = (window.localStorage.getItem("online") === 'true');
            
            $("#online").kendoMobileSwitch({
                value: isOnline,
                checked: isOnline,               
                change: function() {
                    var online = this.value();

                    app.AppStorage.setOnline(online);
                }
            });
        };
        
        var contactCloud = function () {
            app.AppStorage.employees.sync();
            app.AppStorage.locations.sync();
        };
        
        return {
            //syncHistories: syncModel.syncHistories,
            // ^^ only required if you are creating records for each sync
            contactCloud: contactCloud,
            init: init
        };
        
    }());
    
    return dataSyncViewModel;
        
}());
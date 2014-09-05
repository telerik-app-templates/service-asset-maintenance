var app = app || {};

app.DataSync = (function () {
	'use strict'
    
    // Model
    /*
    // This is mainly if you wanted to create a record to mark each 'sync' to 
    //		online outside of the update information the records will contain.
    
    var syncModel = (function () {

        var syncHistoryModel = {
            id: "Id",
            fields: {
                // default
                CreatedBy: { type: "string" },
                CreatedAt: { type: "date" },
                ModifiedAt: { type: "date" },
                
                // added
                UserId: { type: "string" }
            },
            CreatedAtFormatted: function () {
                return app.helper.formatDate(this.get('CreatedAt'));
            }
        };
        
        var syncDataSource = new kendo.data.DataSource({
            type: "everlive",
            transport: {
                typeName: "SyncHistory"
            },
            schema: {
                model: syncHistoryModel
            },
            sort: { field: "CreatedAt", dir: "desc" },
            change: function (e) {
                if (e.items && e.items.length > 0) {
                    $("#syncDate").text(e.items[0].id);
                } else {
                    console.log("No SyncHistories.");
                }
            }
        });

        return {
            syncHistories: syncDataSource  
        };
        
    }());
    */
    
    var dataSyncViewModel = (function () {
        
        var init = function () {
            console.log("dataSyncViewModel init");
            
            var isOnline = (window.localStorage.getItem("online") === 'true');
            
            $("#online").kendoMobileSwitch({
                value: isOnline,
                checked: isOnline,               
                change: function() {
                    var online = this.value();

                    app.StorageTest.setOnline(online);
                }
            });
        };
        
        var contactCloud = function () {
            app.StorageTest.personTest.sync();
            app.StorageTest.locationTest.sync();
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
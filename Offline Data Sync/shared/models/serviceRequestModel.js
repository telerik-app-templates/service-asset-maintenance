
(function (srq) {
    
    var dataModel = {
        id: Everlive.idField,
            fields: {
                createdAt: {
                    field: 'CreatedAt',
                    defaultValue: new Date()
                },
                reason: {
                    field: 'Reason',
                    defaultValue: ''
                },
                dueDate: {
                    field: 'DueDate',
                    defaultValue: new Date()
                },
                completedDate: {
                    field: 'CompletedDate',
                    defaultValue: new Date()
                },
                priority: {
                    field: 'Priority',
                    defaultValue: ''
                },
                description: {
                    field: 'Description',
                    defaultValue: ''
                },
                maintenanceType: {
                    field: 'MaintenanceType',
                    defaultValue: ''
                },
                /*location: {
                    field: 'Location',
                    defaultValue: ''
                },*/
                status: {
                    field: 'Status',
                    defaultValue: ''
                },
                picture: {
                    field: 'Picture',
                    defaultValue: ''
                },
                asset: {
                    field: 'Asset',
                    defaultValue: ''
                },
                geoLocation: {
                    field: 'Geolocation',
                    defaultValue: ''
                }
            }
    };
    
    srq.serviceRequestModel = {
        serviceData: new kendo.data.DataSource({
            //offlineStorage: "serviceData",
            type: 'everlive',
            schema: {
                model: dataModel
            }, 
            transport: {
                typeName: 'ServiceRequest'
            }
        }),
        getRequest: function (uid) {
            return srq.serviceRequestModel.serviceData.getByUid(uid);
        },
        submitRequest: function (request, callback) {
            srq.serviceRequestModel.serviceData.add(request);
            srq.serviceRequestModel.serviceData.sync()
            	.then(function (success) {
                	callback("Request Submitted.");
            	}, function (fail) {
                	callback("Submit failed, try again or contact Customer Service if it continues to fail.");
            	});
        },
        cancelRequest: function (request, callback) {
            request.set("status", "Cancel Requested");
            srq.serviceRequestModel.serviceData.sync()
            	.then(function(success) {
                	console.log("success");
                	callback("Request Submitted for Cancellation.")
            	}, function (fail) {
                console.log("fail");
                	callback("Request failed, please check with support or try again later.")
            	});
        }
    };
    
})(srq);
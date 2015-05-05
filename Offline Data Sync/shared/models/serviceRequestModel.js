
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
                location: {
                    field: 'Location',
                    defaultValue: ''
                },
                status: {
                    field: 'Status',
                    defaultValue: ''
                }
            }
    };
    
    srq.serviceRequestModel = {
        serviceData: new kendo.data.DataSource({
            offlineStorage: "serviceData",
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
            
            callback();
        }
    };
    
})(srq);
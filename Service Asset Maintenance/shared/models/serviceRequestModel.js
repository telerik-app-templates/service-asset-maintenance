'use strict';

global.serviceRequestModel = {
    dataSource: new kendo.data.DataSource({
        type: 'everlive',
        schema: {
            model: {
                id: Everlive.idField,
                fields: {
                    createdAt: {
                        field: 'CreatedAt',
                        defaultValue: new Date()
                    },
                    title: {
                        field: 'Reason',
                        defaultValue: ''
                    },
                    dueDate: {
                        field: 'DueDate',
                        defaultValue: new Date()
                    },
                    completedAt: {
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
                    },
                    address: {
                        field: 'Address',
                        defaultValue: ''
                    }
                }
            }
        },
        transport: {
            typeName: 'ServiceRequest'
        }
    }),

    getServiceRequest: function (id) {
        return global.serviceRequestModel.dataSource.get(id);
    },

    cancelServiceRequest: function (serviceRequest) {
        return new Promise(function (resolve, reject) {
            serviceRequest.set("status", global.constants.serviceRequestStatus.CANCELED);
            global.serviceRequestModel.dataSource
                .sync()
                .then(resolve, function (error) {
                    global.notifications.showErrorMessage(error);
                    reject(error);
                });
        });
    },


    submitServiceRequest: function (serviceRequest) {
        console.log(serviceRequest);
        return new Promise(function (resolve, reject) {
            var dataSource = global.serviceRequestModel.dataSource;
            console.log("add");
            dataSource.add(serviceRequest);
            console.log("added");
            dataSource.sync().then(function (success) {
                console.log("success");
                resolve(success);
            }, function (error) {
                global.notifications.showErrorMessage(error);
                reject(error);
            });
        });
    }
};
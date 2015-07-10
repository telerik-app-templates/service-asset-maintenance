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
    //getServiceRequest: function (id) {
    //    return global.serviceRequestModel.serviceData.getByUid(id);
    //},
    //submitServiceRequest: function (serviceRequest) {
    //    return new Promise(function (resolve, reject) {
    //        var model = global.serviceRequestModel;
    //        model.serviceData.add(request);
    //        model.serviceData.sync().then(resolve, function (error) {
    //            global.notifications.showErrorMessage(error);
    //            reject(error);
    //        });
    //    });
    //},
    //cancelServiceRequest: function (request) {
    //    return new Promise(function (resolve, reject) {
    //        request.set("status", global.constants.serviceRequestStatus.CANCELED);
    //        global.serviceRequestModel.serviceData.sync().then(resolve, function (error) {
    //            global.notifications.showErrorMessage(error);
    //            reject(error);
    //        });
    //    });
    //}
};
"use strict";

global.serviceRequestModel = {
    dataSource: new kendo.data.DataSource({
        type: "everlive",
        schema: {
            model: {
                id: Everlive.idField,
                fields: {
                    createdAt: {
                        field: "CreatedAt",
                        defaultValue: new Date()
                    },
                    createdBy: {
                        field: "CreatedBy",
                        defaultValue: ""
                    },
                    title: {
                        field: "Title",
                        defaultValue: ""
                    },
                    dueDate: {
                        field: "DueDate",
                        defaultValue: null
                    },
                    completedAt: {
                        field: "CompletedDate",
                        defaultValue: new Date()
                    },
                    priority: {
                        field: "Priority",
                        defaultValue: 0
                    },
                    description: {
                        field: "Description",
                        defaultValue: ""
                    },
                    maintenanceType: {
                        field: "MaintenanceType",
                        defaultValue: ""
                    },
                    status: {
                        field: "Status",
                        defaultValue: undefined
                    },
                    picture: {
                        field: "Picture",
                        defaultValue: ""
                    },
                    asset: {
                        field: "Asset",
                        defaultValue: ""
                    },
                    geolocation: {
                        field: "Geolocation",
                        defaultValue: ""
                    },
                    address: {
                        field: "Address",
                        defaultValue: ""
                    }
                }
            }
        },
        transport: {
            typeName: "ServiceRequest",
            read: {
                headers: {
                    "X-Everlive-Expand": JSON.stringify({
                        MaintenanceType: {
                            ReturnAs: "type",
                            TargetTypeName: "MaintenanceType"
                        },
                        CreatedBy: {
                            ReturnAs: "createdByUser",
                            TargetTypeName: "Users"
                        }
                    })
                }
            }
        }
    }),

    getServiceRequest: function (id) {
        return global.serviceRequestModel.dataSource.get(id);
    },

    cancelServiceRequest: function (serviceRequest) {
        return new Promise(function (resolve, reject) {
            serviceRequest.set("status", global.constants.serviceRequestStatus.CANCELED);
            global.serviceRequestModel.dataSource.sync()
                .then(resolve, function (error) {
                    global.notifications.showErrorMessage(error);
                    reject(error);
                });
        });
    },

    submitServiceRequest: function (serviceRequest, imageData) {
        return new Promise(function (resolve, reject) {
            serviceRequest.Type = global.maintenanceTypeModel.get(serviceRequest.maintenanceType);
            serviceRequest.createdByUser = global.service.currentUser;

            global.service.uploadPicture(imageData)
                .then(function (data) {
                    if (data.result) {
                        serviceRequest.picture = data.result.Id;
                    }

                    return global.location.getAddressAndGeolocation();
                }).then(function (result) {
                    serviceRequest.geolocation = result.geolocation;
                    serviceRequest.address = result.address;

                    var dataSource = global.serviceRequestModel.dataSource;
                    dataSource.add(serviceRequest);

                    return dataSource.sync();
                }).then(resolve, function (error) {
                    global.notifications.showErrorMessage(error);
                    reject(error);
                });
        });
    }
};
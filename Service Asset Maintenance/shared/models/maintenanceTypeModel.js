global.maintenanceTypeModel = {
    dataSource: new kendo.data.DataSource({
        type: "everlive",
        schema: {
            model: {
                Id: Everlive.idField,
                fields: {
                    Type: {
                        field: "Type",
                        defaultValue: ""
                    }
                }
            }
        },
        serverFiltering: true,
        transport: {
            typeName: "MaintenanceType"
        }
    }),

    get: function (id) {
        return global.maintenanceTypeModel.dataSource.get(id);
    }
};

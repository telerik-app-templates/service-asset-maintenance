global.maintenanceTypeModel = {
    dataSource: new kendo.data.DataSource({
        type: "everlive",
        schema: {
            model: {
                id: Everlive.idField,
                fields: {
                    type: {
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
    })
};

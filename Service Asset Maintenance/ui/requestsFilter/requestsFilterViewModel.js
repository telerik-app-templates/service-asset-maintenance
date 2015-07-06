'use strict';

global.requestsFilter = {
    viewModel: kendo.observable({
        status: 1,
        maintenanceType: 1,
        sortBy: "DueDate",
        maintenanceTypes: [{ Id: 1, Name: "Repair" }, { Id: 2, Name: "Request" }],
        requestStatuses: [{ Id: 1, Name: "Submitted" }, { Id: 2, Name: "Assigned" }]
    })
}

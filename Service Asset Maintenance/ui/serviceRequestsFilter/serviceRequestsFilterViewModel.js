'use strict';

global.serviceRequestsFilter = {
    viewModel: kendo.observable({
        status: 0,
        type: 0,
        sortBy: "dueDate",
        serviceRequestStatuses: [{ Id: 0, Name: "All" }, { Id: 1, Name: "Submitted" }, { Id: 2, Name: "Assigned" }],
        maintenanceTypes: [{ Id: 0, Name: "All" }, { Id: 1, Name: "Repair" }, { Id: 2, Name: "Request" }],
        reset: function () {
            var vm = global.serviceRequestsFilter.viewModel;
            vm.set("status", 0);
            vm.set("type", 0);
            vm.set("sortBy", "dueDate");
        }
    }),

    appendFilter: function (filter) {
        var vm = global.serviceRequestsFilter.viewModel;
        if (vm.status) {
            filter.push(createFilterObject("status", "eq", vm.status));
        }

        if (vm.type) {
            filter.push(createFilterObject("type", "eq", vm.type));
        }
    },

    appendSort: function (sort) {
        sort.push(createSortObject(global.serviceRequestsFilter.viewModel.sortBy, "asc"));
    }
}

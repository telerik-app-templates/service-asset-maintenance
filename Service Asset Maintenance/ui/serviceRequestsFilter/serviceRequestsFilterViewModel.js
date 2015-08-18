'use strict';

global.serviceRequestsFilter = {
    viewModel: kendo.observable({
        status: undefined,
        maintenanceType: undefined,
        sortBy: "dueDate",
        serviceRequestStatuses: global.constants.serviceRequestStatuses,
        maintenanceTypes: function () {
            return global.maintenanceTypeModel.dataSource;
        },
        reset: function () {
            this.set("status", undefined);
            this.set("maintenanceType", undefined);
            this.set("sortBy", "dueDate");
        },

        done: function () {
            // TODO: Try to change this.
            filterAndSort();
            global.navigation.back();
        }
    }),

    appendFilter: function (filter) {
        var vm = global.serviceRequestsFilter.viewModel;
        if (vm.status) {
            filter.push(global.createFilterObject("status", "eq", vm.status));
        }

        if (vm.maintenanceType) {
            filter.push(global.createFilterObject("maintenanceType.Id", "eq", vm.maintenanceType));
        }
    },

    appendSort: function (sort) {
        sort.push(global.createSortObject(global.serviceRequestsFilter.viewModel.sortBy, "asc"));
    }
}

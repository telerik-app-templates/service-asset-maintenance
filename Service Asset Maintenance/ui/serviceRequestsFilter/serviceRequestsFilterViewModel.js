'use strict';

global.serviceRequestsFilter = {
    viewModel: kendo.observable({
        status: undefined,
        maintenanceType: undefined,
        sortBy: undefined,

        filter: {
            status: undefined,
            maintenanceType: undefined,
        },

        sort: {
            sortBy: "dueDate",
        },

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
            this.filter.status = this.status;
            this.filter.maintenanceType = this.maintenanceType;
            this.sort.sortBy = this.sortBy;

            global.serviceRequests.viewModel.filterAndSort();
        },

        appendFilter: function (filter) {
            var vm = global.serviceRequestsFilter.viewModel;
            if (!isNaN(vm.filter.status)) {
                filter.push(global.createFilterObject("status", "eq", vm.status));
            }

            if (vm.filter.maintenanceType) {
                filter.push(global.createFilterObject("maintenanceType", "eq", vm.maintenanceType));
            }
        },

        appendSort: function (sort) {
            sort.push(global.createSortObject(global.serviceRequestsFilter.viewModel.sort.sortBy, "desc"));
        },

        onShow: function () {
            var vm = global.serviceRequestsFilter.viewModel;
            vm.set("status", vm.filter.status);
            vm.set("maintenanceType", vm.filter.maintenanceType);
            vm.set("sortBy", vm.sort.sortBy);
        }
    })
}

var STATUS_PROPERTY_NAME = "status";
var MAINTENANCE_TYPE_PROPERTY_NAME = "maintenanceType";
var SORT_BY_PROPERTY_NAME = "sortBy"

global.serviceRequestsFilter = {
    viewModel: new ViewModelBase({
        status: undefined,
        maintenanceType: undefined,
        sortBy: undefined,

        filter: {
            status: undefined,
            maintenanceType: undefined,
        },

        sort: {
            sortBy: undefined,
        },

        serviceRequestStatuses: global.constants.serviceRequestStatuses,

        maintenanceTypes: function () {
            return global.maintenanceTypeModel.dataSource;
        },

        reset: function () {
            this.set(STATUS_PROPERTY_NAME, undefined);
            this.set(MAINTENANCE_TYPE_PROPERTY_NAME, undefined);
            this.set(SORT_BY_PROPERTY_NAME, "dueDate");
        },

        copy: function () {
            this.filter.status = this.status;
            this.filter.maintenanceType = this.maintenanceType;
            this.sort.sortBy = this.sortBy;
        },

        done: function () {
            this.copy();

            global.serviceRequests.viewModel.filterAndSort();
        },

        appendFilter: function (filter) {
            var vm = global.serviceRequestsFilter.viewModel;
            if (!isNaN(vm.filter.status)) {
                filter.push(global.createFilterObject("status", "eq", vm.filter.status));
            }

            if (vm.filter.maintenanceType) {
                filter.push(global.createFilterObject("Type.Id", "eq", vm.filter.maintenanceType));
            }
        },

        appendSort: function (sort) {
            sort.push(global.createSortObject(global.serviceRequestsFilter.viewModel.sort.sortBy, "desc"));
        }
    }),

    onShow: function () {
        global.analytics.startTracking(global.constants.features.serviceRequestsFilterView)

        var vm = global.serviceRequestsFilter.viewModel;
        vm.set(STATUS_PROPERTY_NAME, vm.filter.status);
        vm.set(MAINTENANCE_TYPE_PROPERTY_NAME, vm.filter.maintenanceType);
        vm.set(SORT_BY_PROPERTY_NAME, vm.sort.sortBy);
    },

    onHide: function () {
        global.analytics.stopTracking(global.constants.features.serviceRequestsFilterView)
    }
}

global.serviceRequestsFilter.viewModel.reset();
global.serviceRequestsFilter.viewModel.copy();
'use strict';

global.serviceRequests = {
    viewModel: kendo.observable({
        selectedFilter: 0,
        selectedServiceRequest: null,

        serviceRequests: function () {
            return global.serviceRequestModel.dataSource;
        },

        filterChanged: function (e) {
            this.selectedFilter = e.sender.current().index();
            filterAndSort();
        },

        submitServiceRequest: function (e) {
            global.submitServiceRequest.viewModel.set("serviceRequest", {
                title: "",
                dueDate: new Date(),
                priority: 0,
                maintenanceType: global.constants.DEFAULT_MAINTENANCE_TYPE,
                assetNo: null,
                description: "",
                status: global.constants.serviceRequestStatus.SUBMITTED
            });

            global.navigation.navigate(e.target);
        },

        selectionChanged: function () {
            var serviceRequest = global.serviceRequests.viewModel.selectedServiceRequest;
            global.serviceRequestDetails.viewModel.setServiceRequest(serviceRequest);
            global.feedback.viewModel.setServiceRequest(serviceRequest);
            var url = "#empty-view";
            if (serviceRequest) {
                url = global.isWide ? "ui/serviceRequestDetails/serviceRequestDetailsView.wide.html" : "ui/serviceRequestDetails/serviceRequestDetailsView.html";
            }

            global.navigation.navigateTo(url, "content-pane");
        },

        logout: function () {
            global.service.logout();
        },

        filterAndSort: function () {
            global.serviceRequestModel.dataSource.fetch(function () {
                var vm = global.serviceRequests.viewModel;
                global.serviceRequestModel.dataSource.filter(vm.buildFilterExpression());
                global.serviceRequestModel.dataSource.sort(vm.buildSortExpression());
            });

            global.scroller.resetScroll("service-requests-view");
        },

        buildFilterExpression: function () {
            var filter = [];
            global.serviceRequestsFilter.viewModel.appendFilter(filter);
            if (global.serviceRequests.viewModel.selectedFilter === 1) {
                filter.push(global.createFilterObject("createdBy.Id", "eq", global.service.getCurrentUser()));
            }

            return filter;
        },

        buildSortExpression: function () {
            var sort = [];
            global.serviceRequestsFilter.viewModel.appendSort(sort);

            return sort;
        },

        onInit: function (e) {
            global.serviceRequests.viewModel.filterAndSort();
        }
    }),
}
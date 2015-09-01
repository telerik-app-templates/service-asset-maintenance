'use strict';

global.serviceRequests = {
    viewModel: new ViewModelBase({
        selectedFilter: 0,
        selectedServiceRequest: null,

        serviceRequests: function () {
            return global.serviceRequestModel.dataSource;
        },

        filterChanged: function (e) {
            this.selectedFilter = e.sender.current().index();
            this.filterAndSort();
        },

        submitServiceRequest: function (e) {
            global.submitServiceRequest.viewModel.createServiceRequest();
            global.navigation.navigate(e.target);
        },

        selectionChanged: function () {
            var serviceRequest = global.serviceRequests.viewModel.selectedServiceRequest;
            global.serviceRequestDetails.viewModel.setServiceRequest(serviceRequest);
            global.feedback.viewModel.setServiceRequest(serviceRequest);
            var url = global.constants.views.selectServiceRequest;
            if (serviceRequest) {
                url = global.isWide ? global.constants.views.serviceRequestDetailsWide : global.constants.views.serviceRequestDetails;
            }

            global.navigation.navigateTo(url, "content-pane");

            global.scroller.resetScroll("service-request-details-view");
            global.scroller.resetScroll("feedback-view");

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
                filter.push(global.createFilterObject("createdByUser.Id", "eq", global.service.currentUser.Id));
            }

            return filter;
        },

        buildSortExpression: function () {
            var sort = [];
            global.serviceRequestsFilter.viewModel.appendSort(sort);

            return sort;
        }
    }),

    onInit: function (e) {
        global.serviceRequests.viewModel.filterAndSort();
    }
}
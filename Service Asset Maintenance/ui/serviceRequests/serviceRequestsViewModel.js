'use strict';

global.serviceRequests = {
    viewModel: kendo.observable({
        selectedFilter: 0,

        serviceRequests: function () {
            return global.serviceRequestModel.dataSource;
        },

        filterChanged: function (e) {
            global.serviceRequests.viewModel.selectedFilter = e.sender.current().index();
            filterAndSort();
        },

        navigate: function (e) {
            global.navigation.navigate(e.target);
        },

        serviceRequestClicked: function (e) {
            var serviceRequest = global.serviceRequestModel.getServiceRequest(e.dataItem.id);
            global.serviceRequestDetails.viewModel.setServiceRequest(serviceRequest);
            global.feedback.viewModel.setServiceRequest(serviceRequest);
            var url = global.isWide ? "ui/serviceRequestDetails/serviceRequestDetailsView.tablet.html" : "ui/serviceRequestDetails/serviceRequestDetailsView.html";
            global.navigation.navigateTo(url, "content-pane");
        },

        logout: function () {
            global.service.logout();
        },

        onShow: function (e) {
            filterAndSort();
        }
    })
}

function filterAndSort() {
    global.serviceRequestModel.dataSource.fetch(function () {
        global.serviceRequestModel.dataSource.filter(buildServiceRequestsFilter());
        global.serviceRequestModel.dataSource.sort(buildServiceRequestsSort());
    });
}

function buildServiceRequestsFilter() {
    var filter = [];
    global.serviceRequestsFilter.appendFilter(filter);
    if (global.serviceRequests.viewModel.selectedFilter === 1) {
        filter.push(global.createFilterObject("createdBy", "eq", global.service.getCurrentUser()));
    }

    return filter;
}

function buildServiceRequestsSort() {
    var sort = [];
    global.serviceRequestsFilter.appendSort(sort);

    return sort;
}

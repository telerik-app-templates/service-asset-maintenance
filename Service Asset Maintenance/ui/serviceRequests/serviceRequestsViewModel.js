'use strict';

global.serviceRequests = {
    viewModel: kendo.observable({
        selectedFilter: 0,

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

        serviceRequestClicked: function (e) {
            // TODO: Try to remove this.
            $(".listview-item-selected").toggleClass("listview-item-selected");
            if (global.isWide) {
                e.item.toggleClass("listview-item-selected");
            }

            var serviceRequest = global.serviceRequestModel.getServiceRequest(e.dataItem.id);
            global.serviceRequestDetails.viewModel.setServiceRequest(serviceRequest);
            global.feedback.viewModel.setServiceRequest(serviceRequest);
            var url = global.isWide ? "ui/serviceRequestDetails/serviceRequestDetailsView.wide.html" : "ui/serviceRequestDetails/serviceRequestDetailsView.html";
            global.navigation.navigateTo(url, "content-pane");
        },

        logout: function () {
            global.service.logout();
        },

        onInit: function (e) {
            filterAndSort();
        }
    }),
}

function filterAndSort() {
    global.serviceRequestModel.dataSource.fetch(function () {
        global.serviceRequestModel.dataSource.filter(buildServiceRequestsFilter());
        global.serviceRequestModel.dataSource.sort(buildServiceRequestsSort());
    });

    global.scroller.resetScroll("service-requests-view");
}

function buildServiceRequestsFilter() {
    var filter = [];
    global.serviceRequestsFilter.appendFilter(filter);
    if (global.serviceRequests.viewModel.selectedFilter === 1) {
        filter.push(global.createFilterObject("createdBy.Id", "eq", global.service.getCurrentUser()));
    }

    return filter;
}

function buildServiceRequestsSort() {
    var sort = [];
    global.serviceRequestsFilter.appendSort(sort);

    return sort;
}

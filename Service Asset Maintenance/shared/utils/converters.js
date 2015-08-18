global.converters = {
    formatDate: function (date) {
        return kendo.toString(date, 'MMMM dd yyyy');
    },
    // TODO: The status should be number and here should be converted to string.
    getServiceRequestStatusText: function (status) {
        return global.constants.serviceRequestStatuses[status].status;
    },

    convertPriority: function (priority) {
        return global.constants.priorityStrings[priority];
    }
}
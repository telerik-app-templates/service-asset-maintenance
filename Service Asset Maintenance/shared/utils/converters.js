global.converters = {
    formatDate: function (date) {
        return kendo.toString(date, global.strings.dateFormatString);
    },

    getServiceRequestStatusText: function (status) {
        return global.constants.serviceRequestStatuses[status].status;
    },

    convertPriority: function (priority) {
        return global.constants.priorityStrings[priority];
    },

    convertToImageSrc: function (data) {
        return data ? "data:image/jpeg;base64," + data : null;
    }
}
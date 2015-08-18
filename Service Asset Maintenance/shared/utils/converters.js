global.converters = {
    formatDate: function (date) {
        return kendo.toString(date, 'MMMM dd yyyy');
    },
    // TODO: The status should be number and here should be converted to string.
    getServiceRequestStatusText: function (status) {
        return status.toUpperCase();
    },

    convertPriority: function (priority) {
        switch (priority) {
            case 0:
                return "low";

            case 1:
                return "med";

            case 2:
                return "high";

            default:
                return "";
        }
    }
}
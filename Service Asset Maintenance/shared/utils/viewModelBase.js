var VALIDATION_SUMMARY_VISIBLE_PROPERTY = "validationSummaryVisible"
var ERROR_MESSAGE_PROPERTY = "errorMessage"

var ViewModelBase = kendo.data.ObservableObject.extend({
    validationSummaryVisible: false,
    errorMessage: "",

    hideValidationSummary: function () {
        this.set(VALIDATION_SUMMARY_VISIBLE_PROPERTY, false);
        this.set(ERROR_MESSAGE_PROPERTY, "");
    },

    showValidationSummary: function (message) {
        this.clear();
        this.set(ERROR_MESSAGE_PROPERTY, message);
       this.set(VALIDATION_SUMMARY_VISIBLE_PROPERTY, true);
    },

    clear: function () {
    }
})
var VALIDATION_SUMMARY_VISIBLE_PROPERTY = "validationSummaryVisible"
var ERROR_MESSAGE_PROPERTY = "errorMessage"
var IS_LOADING_PROPERTY = "isLoading"

var ViewModelBase = kendo.data.ObservableObject.extend({
    _loadingCount: 0,
    validationSummaryVisible: false,
    isLoading: false,
    errorMessage: "",
    strings: global.strings,

    beginLoading: function () {
        if (!this._loadingCount) {
            this.set(IS_LOADING_PROPERTY, true);
        }

        this._loadingCount++;
    },

    endLoading: function () {
        if (this._loadingCount > 0) {
            this._loadingCount--;
            if (!this._loadingCount) {
                this.set(IS_LOADING_PROPERTY, false);
            }
        }
    },

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
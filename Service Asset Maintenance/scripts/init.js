global = {};

// TODO: Find a way to detect if the device is tablet. 
//global.isTablet = kendo.support.mobileOS && kendo.support.mobileOS.tablet;
global.showSplitLayout = function () {
    return window.innerHeight > 720;
}

function createFilterObject(field, operator, value) {
    return { field: field, operator: operator, value: value };
}

function createSortObject(field, direction) {
    return { field: field, dir: direction };
}
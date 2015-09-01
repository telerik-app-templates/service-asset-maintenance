global = {};

global.isWide = kendo.support.mobileOS && kendo.support.mobileOS.tablet;
global.lang = navigator.language;

global.createFilterObject = function (field, operator, value) {
    return { field: field, operator: operator, value: value };
}

global.createSortObject = function (field, direction) {
    return { field: field, dir: direction };
}
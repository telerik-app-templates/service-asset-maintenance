global = {};

// TODO: Find a way to detect if the device is wide enough for split view. 
global.showSplitView = false;

global.createFilterObject = function(field, operator, value) {
    return { field: field, operator: operator, value: value };
}

global.createSortObject = function(field, direction) {
    return { field: field, dir: direction };
}
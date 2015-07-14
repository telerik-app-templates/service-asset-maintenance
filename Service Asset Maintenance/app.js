getLayout = function() {
    return global.showSplitLayout ? "ui/tablet/homeView.html" : "ui/serviceRequests/serviceRequestsView.html";
}

document.addEventListener('deviceready', function () {
    navigator.splashscreen.hide();
    global.app = new kendo.mobile.Application(document.body, {
        skin: "flat",
        initial: getLayout()
    });
}, false);

window.addEventListener('resize', function () {
    global.showSplitLayout = window.innerWidth > 720;
    if (global.app) {
        global.app.replace(getLayout());
    }
}, false);
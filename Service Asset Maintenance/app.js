getLayout = function() {
    return global.showSplitLayout() ? "ui/tablet/homeView.html" : "ui/requests/requestsView.html"
}

global.app = new kendo.mobile.Application(document.body, {
    skin: "flat",
    initial: getLayout()
});


window.addEventListener('orientationchange', function () {
    global.app.replace(getLayout());
    alert(window.innerHeight);
}, false);
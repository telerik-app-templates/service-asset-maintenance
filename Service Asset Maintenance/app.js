function updateLayout() {
    global.isWide = window.innerWidth > 720;
}

document.addEventListener('deviceready', function () {
    navigator.splashscreen.hide();
    updateLayout();
    global.app = new kendo.mobile.Application(document.body, {
        skin: "flat",
        initial: global.navigation.getInitialView()
    });
}, false);

window.addEventListener('resize', function () {
    updateLayout();
    if (global.app) {
        global.app.replace(getLayout());
    }
}, false);
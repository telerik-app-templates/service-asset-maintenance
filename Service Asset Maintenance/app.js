function updateLayout() {
    global.isWide = window.innerWidth > 720;
}

document.addEventListener('deviceready', function () {
    navigator.splashscreen.hide();
    updateLayout();

    global.everlive.Users.currentUser();
    global.app = new kendo.mobile.Application(document.body, {
        skin: "flat",
        initial: global.isWide ? global.constants.views.homeWide : global.constants.views.home
    });
}, false);

window.addEventListener('resize', function () {
    updateLayout();
    if (global.app) {
        global.app.replace(getLayout());
    }
}, false);
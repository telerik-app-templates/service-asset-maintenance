function updateLayout() {
    global.isWide = window.innerWidth > 800;
}

function getLayout() {
    return global.isWide ? global.constants.views.homeWide : global.constants.views.home
}

document.addEventListener('deviceready', function () {
    navigator.splashscreen.hide();
    updateLayout();

    global.everlive.Users.currentUser();
    global.app = new kendo.mobile.Application(document.body, {
        transition: TRANSITION,
        skin: "nova",
        initial: getLayout(),
        init: function () {
            kendo.UserEvents.defaultThreshold(kendo.support.mobileOS.device === 'android' ? 0 : 20);
        }
    });
}, false);

window.addEventListener('resize', function () {
    updateLayout();
    if (global.app) {
        global.app.replace(getLayout());
    }
}, false);
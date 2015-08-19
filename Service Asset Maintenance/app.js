function updateLayout() {
    global.isWide = window.innerWidth > 800;
}

function getLayout() {
    if (global.service.getCurrentUser()) {
        return global.isWide ? global.constants.views.homeWide : global.constants.views.home
    }

    return global.constants.views.login;
}

document.addEventListener('deviceready', function () {
    navigator.splashscreen.hide();
    updateLayout();
    global.app = new kendo.mobile.Application(document.body, {
        transition: TRANSITION,
        skin: "nova",
        initial: getLayout(),
        init: function () {
            kendo.UserEvents.defaultThreshold(kendo.support.mobileOS.device === 'android' ? 0 : 20);
        }
    });
}, false);

window.addEventListener('orientationchange', function () {
    var old = global.isWide;
    updateLayout();
    if (global.app && old !== global.isWide ) {
        global.app.replace(getLayout());
    }
}, false);
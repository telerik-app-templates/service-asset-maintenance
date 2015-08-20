function updateLayout() {
    console.log(window.orientation);
    console.log(window.outerWidth);
    global.isWide = window.outerWidth > 500 && (window.orientation === 90 || window.orientation == -90);
    console.log(global.isWide);
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
    console.log("OLD: " + old);
    if (global.app && old !== global.isWide ) {
        global.app.replace(getLayout());
    }
}, false);
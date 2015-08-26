function updateLayout() {
    global.isWide = window.outerWidth > 500 && (window.orientation === 90 || window.orientation == -90);
}

document.addEventListener("deviceready", function () {
    navigator.splashscreen.hide();
    updateLayout();
    feedback.initialize(global.constants.FEEDBACK_KEY);
    global.app = new kendo.mobile.Application(document.body, {
        transition: TRANSITION,
        skin: "nova",
        initial: global.constants.views.initial,
        init: function () {
            kendo.UserEvents.defaultThreshold(kendo.support.mobileOS.device === 'android' ? 0 : 20);
            global.navigation.home();
        }
    });
}, false);

window.addEventListener('orientationchange', function () {
    var old = global.isWide;
    updateLayout();
    if (global.app && old !== global.isWide) {
        global.navigation.home();
    }
}, false);
document.addEventListener("deviceready", function () {
    navigator.splashscreen.hide();

    global.analytics.start();
    if (window.feedback) {
        feedback.initialize(global.constants.FEEDBACK_KEY);
    }

    global.app = new kendo.mobile.Application(document.body, {
        transition: TRANSITION,
        skin: "nova",
        initial: global.constants.views.initial,
        init: function () {
            kendo.UserEvents.defaultThreshold(kendo.support.mobileOS.device === 'android' ? 0 : 20);
            if (!navigator.onLine) {
                global.everlive.offline();
            }

            global.navigation.home();
        }
    });
}, false);

document.addEventListener("online", function () {
    global.everlive.online();
    global.everlive.sync();
});

document.addEventListener("offline", function () {
    global.everlive.offline();
});
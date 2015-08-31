global.constants = {
    serviceRequestStatus: {
        SUBMITTED: 0,
        CANCELED: 1,
        ASSIGNED: 2
        },

    priorityStrings: [global.strings.shortLowText, global.strings.shortMediumText, global.strings.shortHighText],

    views: {
        initial: "ui/initial/initialView.html",
        login: "ui/login/loginView.html",
        signUp: "ui/signUp/signUpView.html",
        home: "ui/home/homeView.html",
        homeWide: "ui/home/homeView.wide.html",
        serviceRequestDetails: "ui/serviceRequestDetails/serviceRequestDetailsView.html",
        serviceRequestDetailsWide: "ui/serviceRequestDetails/serviceRequestDetailsView.wide.html",
        assets: "#assets-view",
        selectServiceRequestView: "ui/selectServiceRequest/selectServiceRequestView.html"
    },

    DEFAULT_MAINTENANCE_TYPE: "88f5e3c0-457e-11e5-9642-e912f5485898",
    EVERLIVE_KEY: "3a0PopBb1pAT9SDF",
    FEEDBACK_KEY: "c3d1f8a0-0f7b-11e5-ad55-890589a8af57"
}

global.constants.serviceRequestStatuses = [
    { status: global.strings.submittedText, value: global.constants.serviceRequestStatus.SUBMITTED },
    { status: global.strings.canceledText, value: global.constants.serviceRequestStatus.CANCELED },
    { status: global.strings.assignedText, value: global.constants.serviceRequestStatus.ASSIGNED }];
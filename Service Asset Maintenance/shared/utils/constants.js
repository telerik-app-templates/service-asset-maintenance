global.constants = {
    serviceRequestStatus: {
        ASSIGNED: 2,
        CANCELED: 1,
        SUBMITTED: 0
    },

    priorityStrings: ["low", "med", "high"],

    views: {
        login: "ui/login/loginView.html",
        signUp: "ui/signUp/signUpView.html",
        home: "ui/home/homeView.html",
        homeWide: "ui/home/homeView.wide.html",
        assets: "#assets-view"
    },

    DEFAULT_MAINTENANCE_TYPE: "88f5e3c0-457e-11e5-9642-e912f5485898",
    EVERLIVE_KEY: "3a0PopBb1pAT9SDF",
    CURRENT_USER_KEY: "current_user"
}

global.constants.serviceRequestStatuses = [
    { status: "Assigned", value: global.constants.serviceRequestStatus.ASSIGNED },
    { status: "Canceled", value: global.constants.serviceRequestStatus.CANCELED },
    { status: "Submitted", value: global.constants.serviceRequestStatus.SUBMITTED }];
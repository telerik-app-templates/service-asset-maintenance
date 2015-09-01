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
        selectServiceRequest: "ui/selectServiceRequest/selectServiceRequestView.html",
        submitServiceRequest: "ui/submitServiceRequest/submitServiceRequestView.html"
    },

    features: {
        loginVew: "Login.View",
        login: "Login",
        signUpView: "SignUp.View",
        signUp: "SignUp",
        serviceRequestsView: "ServiceRequests.View",
        serviceRequestDetailsView: "ServiceRequestDetails.View",
        submitServiceRequestView: "SubmitServiceRequest.View",
        submitServiceRequest: "SubmitServiceRequest",
        cancelServiceRequest: "CancelServiceRequest",
        feedbackView: "Feedback.View",
        submitFeedback: "SubmitFeedback",
        serviceRequestsFilterView: "ServiceRequestsFilter.View"
    },

    DEFAULT_MAINTENANCE_TYPE: "88f5e3c0-457e-11e5-9642-e912f5485898",
    EVERLIVE_KEY: "3a0PopBb1pAT9SDF",
    FEEDBACK_KEY: "c3d1f8a0-0f7b-11e5-ad55-890589a8af57",
    ANALYTICS_KEY: "36d8b30aad0e4f05ba831258a48f8753"
}

global.constants.serviceRequestStatuses = [
    { status: global.strings.submittedText, value: global.constants.serviceRequestStatus.SUBMITTED },
    { status: global.strings.canceledText, value: global.constants.serviceRequestStatus.CANCELED },
    { status: global.strings.assignedText, value: global.constants.serviceRequestStatus.ASSIGNED }];
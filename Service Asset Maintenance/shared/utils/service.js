var CURRENT_USER_KEY = "CurrentUser"

function showNotificationAndReject(error, reject) {
    global.notifications.showErrorMessage(error.message);
    reject(error);
}

global.service = {
    login: function (username, password) {
        return new Promise(function (resolve, reject) {
            global.everlive.authentication.login(username, password)
                .then(function (response) {
                    global.everlive.Users.currentUser().then(function (data) {
                        localStorage.setItem(global.constants.CURRENT_USER_KEY, data.result.Id);
                        resolve(response);
                    });
                }, function (error) {
                    reject(error);
                });
        });
    },

    logout: function () {
        localStorage.removeItem(global.constants.CURRENT_USER_KEY);
        global.everlive.authentication.logout().then(function () {
            global.navigation.login();
        }, function (error) {
            global.notifications.showErrorMessage(error.message);
        });
    },

    signUp: function (username, password, additionalData) {
        return new Promise(function (resolve, reject) {
            global.everlive.Users.register(username, password, additionalData)
                .then(function () {
                    global.service.login(username, password)
                        .then(function (authenticationToken) {
                            resolve();
                        });
                }, function (error) {
                    showNotificationAndReject(error, reject);
                })
        });
    },

    recover: function (usernameOrEmail) {
        return new Promise(function (resolve, reject) {
            global.everlive.Users.resetPassword({ Username: usernameOrEmail })
                .then(function (result) {
                    resolve();
                }, function (error) {
                    global.everlive.Users.resetPassword({ Email: usernameOrEmail })
                        .then(function (result) {
                            resolve();
                        }, function (error) {
                            reject(error);
                        })
                });
        });
    },

    getCurrentUser: function () {
        return localStorage.getItem(global.constants.CURRENT_USER_KEY);
    }
}
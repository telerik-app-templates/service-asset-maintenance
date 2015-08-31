function showNotificationAndReject(error, reject) {
    global.notifications.showErrorMessage(error.message);
    reject(error);
}

global.service = {
    currentUser: null,

    login: function (username, password) {
        return new Promise(function (resolve, reject) {
            global.everlive.authentication.login(username, password)
                .then(resolve, reject);
        });
    },

    logout: function () {
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
        return new Promise(function (resolve, reject) {
            global.everlive.Users.currentUser().then(function (data) {
                global.service.currentUser = data.result;
                resolve(data.result);
            }, function (error) {
                showNotificationAndReject(error, reject);
            });
        });
    }
}
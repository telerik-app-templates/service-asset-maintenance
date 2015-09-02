function showNotificationAndReject(error, reject) {
    global.notifications.showErrorMessage(error);
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
            global.notifications.showErrorMessage(error);
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
    },

    uploadPicture: function (picture) {
        return new Promise(function (resolve, reject) {
            if (picture) {
                var file = {
                    "Filename": "image.jpg",
                    "ContentType": "image/jpeg",
                    "base64": picture
                };

                global.everlive.Files.create(file, function (data) {
                    resolve(data);
                }, function (error) {
                    alert(JSON.stringify(error));
                    showNotificationAndReject(error, reject);
                });
            } else {
                resolve(null);
            }
        });
    },

    getUrlByFileId: function (fileId) {
        return new Promise(function (resolve, reject) {
            if (fileId) {
                global.everlive.Files.getDownloadUrlById(fileId).then(resolve, reject);
            } else {
                resolve(null);
            }
        });
    }
}
global.everlive = new Everlive({
    apiKey: global.constants.EVERLIVE_KEY,
    scheme: "https",
    authentication: {
        persist: true,
        onAuthenticationRequired: function () {
            global.navigation.login();
        }
    }, 
    offlineStorage: {
        storage: {
            provider: window.navigator.simulator ? Everlive.Constants.StorageProvider.LocalStorage : Everlive.Constants.StorageProvider.FileSystem
        },

        encryption: {
            provider: Everlive.Constants.EncryptionProvider.Default
        }
    }
});
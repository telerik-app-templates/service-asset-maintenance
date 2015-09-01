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
            provider: Everlive.Constants.StorageProvider.LocalStorage
        },

        encryption: {
            provider: Everlive.Constants.EncryptionProvider.Default
        }
    }
});
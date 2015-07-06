this.global = {};

//// init Everlive before bringing in model/viewmodels, this will initialize global variable            
//this.global.everlive = new Everlive({
//    apiKey: srq.appSettings.elKey,
//    offlineStorage: {
//        storage: {
//            provider: Everlive.Constants.StorageProvider.FileSystem
//        },
//        encryption: {
//            provider: Everlive.Constants.EncryptionProvider.Default
//        }
//    }
//});
global = {};
// TODO: Find a way to detect if the device is tablet. 
//global.isTablet = kendo.support.mobileOS && kendo.support.mobileOS.tablet;
global.showSplitLayout = function () {
    return window.innerHeight > 720;
}

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
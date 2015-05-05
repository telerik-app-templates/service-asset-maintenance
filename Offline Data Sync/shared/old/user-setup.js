var app = app || {};

app.UserSetup = (function () {
	'use strict'
    
    var userSetupViewModel = (function () {

        var destination;
        
        var init = function () {
            console.log("Location View init!");
        };
        
        var show = function (e) {
            
        };
        
        // in the case of emulator, we pick from local system and get a base64 string, perfect for persistence!
        function onCameraSuccess ( imageUri ) {
            console.log("Success!");
            console.log(imageUri);
			
            var im = document.getElementById('largeImage');
            
            if (destination === navigator.camera.DestinationType.DATA_URL) {
            	im.src = "data:image/jpeg;base64," + imageUri;
            } else {
                im.src = imageUri;
            }            
        };
        
        function onCameraFail ( message ) {
            console.log("Camera fail with: " + message);
        };
        
        function capturePicture ( dest ) {
            destination = dest;
            navigator.camera.getPicture(onCameraSuccess, onCameraFail, {
                quality: 50,
                destinationType: destination
            });
        };
        
        var captureBase64 = function () {
            capturePicture(navigator.camera.DestinationType.DATA_URL);
        };
        
        var captureUri = function () {
            capturePicture(navigator.camera.DestinationType.FILE_URI);
        };        
        
        return {
            init: init,
            show: show,            
            captureBase64: captureBase64, 
            captureUri: captureUri
        };
        
    }());
    
    return userSetupViewModel;
        
}());
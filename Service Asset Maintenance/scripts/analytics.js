global.analytics = {
    start: function () {
        var factory = window.plugins.EqatecAnalytics.Factory;
        var monitor = window.plugins.EqatecAnalytics.Monitor;
        var settings = factory.CreateSettings(global.constants.ANALYTICS_KEY);
        settings.LoggingInterface = factory.CreateTraceLogger();
        factory.CreateMonitorWithSettings(settings,
		  function () {
		      monitor.Start();
		  },

          function (msg) {
              console.log("Error creating monitor: " + msg);
          });
    },

    stop: function () {
        var monitor = window.plugins.EqatecAnalytics.Monitor;
        monitor.Stop();
    },

    startTracking: function (feature) {
        var monitor = window.plugins.EqatecAnalytics.Monitor;
        monitor.TrackFeatureStart(feature);
    },

    stopTracking: function (feature) {
        var monitor = window.plugins.EqatecAnalytics.Monitor;
        monitor.TrackFeatureStop(feature);
    },

    trackFeature: function (feature) {
        var monitor = window.plugins.EqatecAnalytics.Monitor;
        monitor.TrackFeature(feature);
    },

    trackError: function (exception) {
        var monitor = window.plugins.EqatecAnalytics.Monitor;
        monitor.TrackFeature(exception, exception.message);
    }
}

(function (srq) {

    var menuItems = [
        	{displayName: srq.appSettings.strings.submitRequestHeader, viewName: "requests/submitRequestView.html"}, 
        	{displayName: srq.appSettings.strings.requestStatusHeader, viewName: "requests/requestStatusView.html"}, 
        	{displayName: srq.appSettings.strings.feedbackHeader, viewName: "help/feedbackView.html"}, 
        	{displayName: srq.appSettings.strings.customerServiceHeader, viewName: "help/csView.html"}, 
        	{displayName: srq.appSettings.strings.faqHelpHeader, viewName: "help/helpFaqView.html"}
    	];
    
    srq.main = {        
        viewModel: kendo.observable({
            init: function(e) {
                $("#main-menu-title").text(srq.appSettings.strings.mainMenuTitle);
            },
            logout: function () {
                srq.app.navigate("ui/login/loginView.html");                
                srq.everlive.Users.logout();
            },
            menuData: function () {
                return menuItems;
            }
        })
    }
    
})(srq);

        
        
        
        
         
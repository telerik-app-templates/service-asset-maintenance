
(function (srq) {

    var menuItems = [
        	{displayName: "Submit Request", viewName: "requests/submitRequestView.html"}, 
        	{displayName: "Request Status", viewName: "requests/requestStatusView.html"}, 
        	{displayName: "Feedback", viewName: "help/feedbackView.html"}, 
        	{displayName: "Customer Service", viewName: "help/csView.html"}, 
        	{displayName: "FAQ / Help", viewName: "help/helpFaqView.html"}
    	];
    
    srq.main = {        
        viewModel: kendo.observable({
            init: function(e) {
                
            },
            logout: function () {
                srq.everlive.Users.logout();
                srq.app.navigate("ui/login/loginView.html");                
            },
            menuData: function () {
                return menuItems;
            }
        })
    }
    
})(srq);

        
        
        
        
         
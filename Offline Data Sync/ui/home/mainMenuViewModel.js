
(function (srq) {
    
    var privateVariablesHere;
    
    var menuItems = [
        	{displayName: "Submit Request", viewName: "requests/submitRequestView.html"}, 
        	{displayName: "Request Status", viewName: "requests/requestStatusView.html"}, 
        	{displayName: "Feedback", viewName: "help/feedbackView.html"}, 
        	{displayName: "Customer Service", viewName: "help/csView.html"}, 
        	{displayName: "FAQ / Help", viewName: "help/helpFaqView.html"}
    	];
    
    srq.main = {        
        viewModel: kendo.observable({
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


(function (srq) {
    
    var privateVariablesHere;
    
    srq.feedback = {        
        viewModel: kendo.observable({
            logout: function () {
                srq.app.navigate("#welcome");                
                srq.everlive.Users.logout();
            },
            menuData: function () {
                return menuItems;
            }
        })
    }
    
})(srq);
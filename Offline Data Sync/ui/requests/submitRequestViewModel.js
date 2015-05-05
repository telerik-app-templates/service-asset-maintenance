
(function (srq) {
    
    var privateVariablesHere;
    
    var dataSource = {
            createdAt: new Date(),
            reason: '',
            dueDate: new Date(),
            completedDate: new Date(),
            priority: '',
            description: '',
            maintenanceType: '',
            location: '',
            status: ''
    };
    
    srq.submitRequest = {        
        viewModel: kendo.observable({
            logout: function () {
                srq.app.navigate("#welcome");                
                srq.everlive.Users.logout();
            },
            menuData: function () {
                return menuItems;
            },
            show: function (e) {
                kendo.bind($('#submit-service-request-form'), dataSource, kendo.mobile.ui);
            }
        })
    }
    
})(srq);
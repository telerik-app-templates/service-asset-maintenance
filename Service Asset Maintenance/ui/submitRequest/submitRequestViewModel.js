'use strict';

global.submitRequest = {
    viewModel: kendo.observable({
        request: {
            Title: "",
            DueDate: "July 21, 2015",
            Priority: "",
            Type: "",
            AssetNo: "1231232135",
            Description: "Printers can present a bewildering range of problems. Fortunately, many of them can be resolved by consumers armed with a bit of knowledge.",
            CreatedOn: "July 20, 2015",
            CompletedOn: "July 21, 2015",
            CreatedBy: "Peter Petrov",
            CancelReason: "It started to work."
        },
        maintenanceTypes: [{ Id: 1, Name: "Repair" }, { Id: 2, Name: "Request" }],
        onPrioritySelected: function(e) {
            var buttonGroup = e.sender;
            var index = buttonGroup.current().index();
            global.submitRequest.viewModel.request.Priority = index;
        },
        requestImageUrl: "http://cdn.phys.org/newman/csz/news/800/2011/hpslamssensa.jpg"
    })
}

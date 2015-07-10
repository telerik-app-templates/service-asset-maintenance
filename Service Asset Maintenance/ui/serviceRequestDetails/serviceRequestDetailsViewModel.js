'use strict';

global.serviceRequestDetails = {
    viewModel: kendo.observable({
        serviceRequest: {
            id: "1",
            title: "Printer malfuncion",
            dueDate: "July 21, 2015",
            assignedTo: "John Doe",
            priority: "low",
            type: "Repair",
            assetNo: "1231232135",
            description: "Printers can present a bewildering range of problems. Fortunately, many of them can be resolved by consumers armed with a bit of knowledge.",
            createdOn: "July 20, 2015",
            completedOn: "July 21, 2015",
            createdBy: "Peter Petrov",
            reason: "It started to work."
        },
        imageUrl: "http://cdn.phys.org/newman/csz/news/800/2011/hpslamssensa.jpg"
    })
}

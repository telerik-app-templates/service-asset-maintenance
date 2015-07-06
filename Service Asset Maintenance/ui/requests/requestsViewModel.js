'use strict';

global.requests = {
    viewModel: kendo.observable({
        requests: [{ Id: "1", Title: "Coffee machine is broken", DueDate: "July 21, 2015", Status: "CANCELED", Priority: "low" },
            { Id: "2", Title: "Test facilities are powerless", DueDate: "July 21, 2015", Status: "SUBMITTED", Priority: "high" },
            { Id: "3", Title: "Test 3", DueDate: "July 21, 2015", Status: "ASSIGNED", Priority: "medium" }]
    })
}

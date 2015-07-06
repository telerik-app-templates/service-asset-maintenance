'use strict';

global.feedback = {
    viewModel: kendo.observable({
        comment: "Your comment here",
        feedbackItems: [{ UserName: "Peter Petrov", Comment: "Printers can present a bewildering range of problems.", CreatedOn: "July 21, 2015" },
            { UserName: "George Georgiev", Comment: "Fortunately, many of them can be resolved by consumers armed with a bit of knoledge.", CreatedOn: "July 21, 2015" }
        ]
    })
}

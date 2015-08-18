global.feedbackItemModel = {
    dataSource: new kendo.data.DataSource({
        type: "everlive",
        schema: {
            model: {
                id: Everlive.idField,
                fields: {
                    createdAt: {
                        field: "CreatedAt",
                        defaultValue: new Date()
                    },
                    createdBy: {
                        field: "CreatedBy",
                        defaultValue: ""
                    },
                    comment: {
                        field: "Comment",
                        defaultValue: ""
                    },
                    rating: {
                        field: "Rating",
                        defaultValue: 0
                    },
                    serviceRequestId: {
                        field: "RequestId",
                        defaultValue: ""
                    }
                }
            }
        },
        serverFiltering: true,
        transport: {
            typeName: "FeedbackItem",
            read: {
                headers: {
                    "X-Everlive-Expand": JSON.stringify({
                        CreatedBy: {
                            ReturnAs: "CreatedBy",
                            SingleField: "DisplayName"
                        }
                    })
                }
            }
        }
    }),

    submitFeedbackItem: function (feedbackItem) {
        return new Promise(function (resolve, reject) {
            var dataSource = global.feedbackItemModel.dataSource;
            dataSource.add(feedbackItem);
            dataSource.sync().then(resolve, function (error) {
                global.notifications.showErrorMessage(error);
                reject(error);
            });
        });
    }
};

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
        transport: {
            typeName: "FeedbackItem",
            read: {
                headers: {
                    "X-Everlive-Expand": JSON.stringify({
                        CreatedBy: {
                            ReturnAs: "createdByUser",
                            SingleField: "DisplayName",
                            TargetTypeName: "Users"
                        }
                    })
                }
            }
        },
        sort: {field: "createdAt", dir: "desc"}
    }),

    submitFeedbackItem: function (feedbackItem) {
        return new Promise(function (resolve, reject) {
            // TODO: Remove this when fix the datasource problem.
            feedbackItem.createdByUser = global.service.currentUser.DisplayName;

            var dataSource = global.feedbackItemModel.dataSource;
            dataSource.add(feedbackItem);
            dataSource.sync().then(resolve, function (error) {
                global.notifications.showErrorMessage(error);
                reject(error);
            });
        });
    }
};

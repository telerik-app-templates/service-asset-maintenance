
(function (srq) {
    'use strict';
    
    var dataModel = {
        id: Everlive.idField,
            fields: {
                comment: {
                    field: 'Comment',
                    defaultValue: ''
                },
                rating: {
                    field: 'Rating',
                    defaultValue: ''
                },
                requestReview: {
                    field: 'RequestReview',
                    defaultValue: ''
                },
                requestId: {
                    field: 'RequestId',
                    defaultValue: ''
                }
            }
    };
    
    srq.feedbackItemModel = {
        feedbackData: new kendo.data.DataSource({
            offlineStorage: "feedbackData",
            type: 'everlive',
            schema: {
                model: dataModel
            }, 
            transport: {
                typeName: 'FeedbackItem'
            }
        }),
        getItem: function (uid) {
            return srq.feedbackItemModel.feedbackData.getByUid(uid);
        },
        submitFeedbackItem: function (feedback, callback) {
            srq.feedbackItemModel.feedbackData.add(feedback);
            srq.feedbackItemModel.feedbackData.sync()
            	.then(function (success) {
                	callback("Feedback Submitted.");
            	}, function (fail) {
                	callback("Submit failed, try again or contact Customer Service if it continues to fail.");
            	});
        }
    };
    
})(srq);

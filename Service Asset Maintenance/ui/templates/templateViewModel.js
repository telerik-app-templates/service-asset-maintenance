global.templates = {
    viewModel: kendo.observable({
        onShow: function () {
            var template = kendo.template($("#my-template").html());
            $("#content").html(template({}));
        }
    })
}
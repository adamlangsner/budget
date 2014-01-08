define(
[
"jquery",
"underscore",
"marionette"
],
function ($, _, Marionette) {
    return Marionette.ItemView.extend({

        events: {

        },

        initialize: function() {
            this.templateHelpers = this.templateHelpers || {};
            this.templateHelpers.self = this;

            var events = _.result(this, 'events');

            if (this.options.onCancel) {
                events["click .btn-default"] = this.options.onCancel;
            }

            this.onInitialize && this.onInitialize();
        }

    });
});
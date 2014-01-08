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

            if (this.onCancel || this.options.onCancel) {
                events["click .btn-default"] = this.onCancel || this.options.onCancel;
            }

            this.onInitialize && this.onInitialize();
        }

    });
});
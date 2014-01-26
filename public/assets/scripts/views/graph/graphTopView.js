define(
[
"jquery",
"underscore",
"marionette"
],
function($, _, Marionette) {
    return Marionette.Layout.extend({

        template: 'graph/graphTop',
        className: 'graph-top',

        templateHelpers: {

        },

        ui: {
            currentBalance: "input[name=currentBalance]"
        },

        events: {
            "keyup input[name=currentBalance]": "onCurrentBalanceChange"
        },

        onCurrentBalanceChange: function(e) {
            clearTimeout(this.currentBalanceTimeout);

            this.currentBalanceTimeout = setTimeout(_.bind(function() {

                var newBalance = parseInt($(e.currentTarget).val()) || 0;

                this.model.set('currentBalance', newBalance);
                this.model.save({}, {silent: true});

            }, this), 150);
        }
    });
});
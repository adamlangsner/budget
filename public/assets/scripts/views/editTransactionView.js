define(
[
"jquery",
"underscore",
"marionette",
"views/specView"
],
function ($, _, Marionette, SpecView) {

    var specViews = {
        months: SpecView.extend({
            template: 'monthSpec'
        }),
        weeks: SpecView.extend({
            template: 'weekSpec'
        }),
        days: SpecView.extend({
            template: 'daySpec'
        }),
        years: SpecView.extend({
            template: 'yearSpec'
        })
    };

    return Marionette.Layout.extend({
        template: 'editTransaction',
        className: 'edit-transaction-view',

        regions: {
            lowArea: ".low-area"
        },

        ui: {
            unitSelector: ".unit-selector"
        },

        events: {
            "change .unit-selector": "updateLowArea"
        },

        onShow: function() {
            this.ui.unitSelector.trigger('change');
        },

        updateLowArea: function(e) {
            var unit = this.ui.unitSelector.val();
            this.lowArea.show(new (specViews[unit])({

            }));
        }
    });
});
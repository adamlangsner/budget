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
            template: 'monthSpec',

            transform_input: function(raw) {
                return parseInt(raw);
            }
        }),
        weeks: SpecView.extend({
            template: 'weekSpec'
        }),
        days: SpecView.extend({
            template: 'daySpec'
        }),
        years: SpecView.extend({
            template: 'yearSpec',

            get_specs: function() {
                return _.map(this.$('.calendar-day-input'), function(cal_input) {
                    var $cal_input = $(cal_input),
                        $month = $cal_input.find('.month-selector'),
                        $date = $cal_input.find('.date-selector');
                    return $month.val() + "-" + $date.val();
                }, this);
            }
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
            "change .unit-selector": "updateLowArea",
            "click .create-transaction": "createTransaction"
        },

        onShow: function() {
            this.ui.unitSelector.trigger('change');
        },

        updateLowArea: function(e) {
            var unit = this.ui.unitSelector.val();
            this.lowArea.show(new (specViews[unit])({

            }));
        },

        createTransaction: function(e) {
            e.preventDefault();


        }
    });
});
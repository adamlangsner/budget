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
            frequencySelector: ".frequency-selector",
            unitSelector: ".unit-selector",
            nameInput: "input[name=name]",
            amountInput: "input[name=amount]"
        },

        events: {
            "change .unit-selector": "onChangeUnit",
            "click .create-transaction": "createTransaction"
        },

        onShow: function() {
            this.ui.unitSelector.trigger('change');
        },

        onChangeUnit: function(e) {
            this.ui.frequencySelector.val(1);

            var unit = this.ui.unitSelector.val();
            if (unit === 'years') {
                this.ui.frequencySelector.attr('disabled', 'disabled');
            } else {
                this.ui.frequencySelector.removeAttr('disabled');
            }

            this.lowArea.show(new (specViews[unit])({}));
        },

        createTransaction: function(e) {
            e.preventDefault();

            this.model.set({
                name: this.ui.nameInput.val(),
                amount: parseInt(this.ui.amountInput.val()),
                type: this.$('.type button.active').text().toLowerCase(),
                unit: this.ui.unitSelector.val(),
                frequency: this.ui.frequencySelector.val(),
                specifics: this.lowArea.currentView.get_specs()
            });

            this.trigger('createdTransaction', this.model);
        }
    });
});
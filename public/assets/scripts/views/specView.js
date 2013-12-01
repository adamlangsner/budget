define(
[
"jquery",
"underscore",
"marionette"
],
function ($, _, Marionette) {
    var months = [{
        value: "1",
        text: "January",
        days: 31
    }, {
        value: "2",
        text: "February",
        days: 28
    }, {
        value: "3",
        text: "March",
        days: 31
    }, {
        value: "4",
        text: "April",
        days: 30
    }, {
        value: "5",
        text: "May",
        days: 31
    }, {
        value: "6",
        text: "June",
        days: 30
    }, {
        value: "7",
        text: "July",
        days: 31
    }, {
        value: "8",
        text: "August",
        days: 31
    }, {
        value: "9",
        text: "September",
        days: 30
    }, {
        value: "10",
        text: "October",
        days: 31
    }, {
        value: "11",
        text: "November",
        days: 30
    }, {
        value: "12",
        text: "December",
        days: 31
    }];


    return Marionette.ItemView.extend({
        tagName: 'span',

        templateHelpers: {
            calendar_day: function() {
                var selectedIndex = 0;
                return '<span class="calendar-day-input">' +
                        this._build_select(months, selectedIndex, 'month-selector') +
                        this.days_selector(months[selectedIndex], 'date-selector') +
                        '</span>';
            },

            days_selector: function(month, className) {
                var days = _.map(_.range(1, month.days+1), function(day) {
                        return { value: day.toString(), text: day };
                    });

                return this._build_select(days, 0, className);
            },

            _build_select: function(items, selectedIndex, className) {
                var className = className ? 'class="'+className+'"' : '';

                return _.reduce(items, function(out, item, i) {
                    out += this._build_option(item.value, item.text, i == selectedIndex);
                    return out;
                }, ['<select', className, '>'].join(' '), this) + '</select>';
            },

            _build_option: function(value, text, selected) {
                var value = (value ? ('value="'+value+'"') : ''),
                    selected = selected ? 'selected' : '';
                return ['<option', value, selected, '>', text, '</option>'].join(' ');
            }
        },

        events: {
            "click .pressable": "on_press",
            "change .month-selector": "update_date_selector"
        },

        on_press: function(e) {
            $(e.target).toggleClass('pressed');
        },

        update_date_selector: function(e) {
            var $target = $(e.currentTarget),
                $parent = $target.parent(),
                month = months[parseInt($target.val()) - 1],
                $dateSelector = $(this.templateHelpers.days_selector(month, 'date-selector'));

            $parent.find('.date-selector').replaceWith($dateSelector);
        },

        // can be overridden
        get_specs: function() {
            return _.map(this.$('.pressed'), function(pressed) {
                var $pressed = $(pressed),
                    raw_value = $pressed.attr('data-spec-value')
                        ? $pressed.data('spec-value')
                        : $pressed.text();

                return this.transform_input(raw_value);
            }, this);
        },

        // for the purpose of being overridden
        transform_input: function(raw) {
            return raw;
        }
    });
});
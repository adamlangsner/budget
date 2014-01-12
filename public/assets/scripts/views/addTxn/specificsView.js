define(
[
"jquery",
"underscore",
"views/common/modalView"
],
function($, _, ModalView) {
    return ModalView.extend({
        template: 'addTxn/specifics',

        className: 'specifics-view',

        templateHelpers: {
            header: function() {
                var unit,
                    modelUnit = this.self.model.get('unit'),
                    isMany = this.self.model.get('specifics').length > 1,
                    s = isMany ? 's' : '';

                if (this.self.model.isOneTime()) {
                    unit = 'date';
                } else {
                    unit = 'day'+s+ ' of the ' + modelUnit.substring(0, modelUnit.length-1);
                }

                return 'On which ' + unit + ' does this transaction happen?';
            },

            specific: function() {
                var unit = this.self.model.get('unit'),
                    output;

                return this[unit+'_spec']();
            },

            one_time_spec: function() {
                return this.select(this.month_options(), 'width: 110px;', 'month') +
                        '&nbsp;'+
                        this.select(this.date_options(), 'width: 50px;', 'date') +
                        '&nbsp;'+
                        this.select(this.year_options(), 'width: 65px;', 'year');
            },

            months_spec: function() {
                return this.select(this.date_options(), 'width: 50px;', 'date');
            },

            weeks_spec: function() {
                return this.select(this.week_options(), 'width: 110px;', 'week');
            },

            years_spec: function() {
                return this.select(this.month_options(), 'width: 110px;', 'month') +
                        '&nbsp;'+
                        this.select(this.date_options(), 'width: 50px;', 'date');
            },

            select: function(inside, style, name) {
                return '<select name="'+name+'" style="'+(style||'')+'">'+inside+'</select>';
            },

            date_options: function() {
                return _.reduce(_.range(1, 29), function(out, val, i) {
                    return out += this.option(val, val, i==0);
                }, '', this);
            },

            month_options: function() {
                return _.reduce(_.range(1, 13), function(out, val, i) {
                    return out += this.option(val, moment(new Date(2013, val-1, 1)).format('MMMM'), i==0);
                }, '', this);
            },

            year_options: function() {
                return _.reduce(_.range(2), function(out, val, i) {
                    var year = new Date().getFullYear()+val;
                    return out += this.option(year, year, i==0);
                }, '', this);
            },

            week_options: function() {
                var values = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                return _.reduce(values, function(out, val, i) {
                    return out += this.option(i, val, i==0);
                }, '', this);
            },

            option: function(value, label, selected) {
                return '<option value="'+value+'" '+(selected?'selected':'')+'>'+label+'</option>';
            },

            getDaysInMonth: function(m) {
               return /8|3|5|10/.test(--m)?30:m==1?28:31;
            }
        },

        events: {
            "click .btn-success": "onComplete"
        },

        ui: {
        },

        onInitialize: function() {
        },

        _get_one_time_specs: function($item) {
            return $item.find('[name=year]').val() +
                    '-' +
                    $item.find('[name=month]').val() +
                    '-' +
                    $item.find('[name=date]').val();
        },

        _get_months_specs: function($item) {
            return parseInt($item.find('[name=date]').val());
        },

        _get_weeks_specs: function($item) {
            return parseInt($item.find('[name=week]').val());
        },

        _get_years_specs: function($item) {
            return $item.find('[name=month]').val() +
                    '-' +
                    $item.find('[name=date]').val();
        },

        onComplete: function(e) {
            var specifics = [];
            this.$('p').each(_.bind(function(i, p) {
                specifics.push(this['_get_'+this.model.get('unit')+'_specs']($(p)));
            }, this));

            this.model.set('specifics', specifics);

            this.options.onComplete && this.options.onComplete();
        }
    });
});
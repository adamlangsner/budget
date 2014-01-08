define(
[
"jquery",
"underscore",
"views/common/modalView"
],
function($, _, ModalView) {
    return ModalView.extend({
        template: 'addTxn/frequency',

        className: 'frequency-view',

        templateHelpers: {
            once_options: function() {
                var values = ['Twice', '3 times', '4 times', '5 times', '6 times', '7 times'];

                return _.reduce(values, function(out, val, i) {
                    return out += '<option value="'+(i+2)+'" '+(i==0 ? 'selected' : '')+'>' + val + '</option>';
                }, '');
            },

            unit_options: function(values, plural) {

                return _.reduce(values, function(out, val, i) {
                    return out += '<option value="'+val.toLowerCase()+'s" '+(i==0 ? 'selected' : '')+'>' + val + (plural ? 's':'') + '</option>';
                }, '');
            },

            every_options: function() {
                return _.reduce(_.range(1,7), function(out, val, i) {
                    return out += '<option value="'+val+'" '+(i==0 ? 'selected':'')+'>'+val+'</option>';
                }, '');
            }
        },

        events: {
            "click .btn-primary": "onComplete"
        },

        ui: {
            inputOnceUnit: ".input-group.once select[name=unit]",
            inputEveryUnit: ".input-group.every select[name=unit]",
            inputOnceFrequency: ".input-group.once select[name=frequency]",
            inputEveryFrequency: ".input-group.every select[name=frequency]"
        },

        onInitialize: function() {
        },

        onComplete: function(e) {
            var typeVal = this.$('input:checked[name=type]').val(),
                attrs = {};

            switch(typeVal) {
                case 'one_time':
                    attrs.unit = typeVal;
                    attrs.specifics = [0];
                    break;

                case 'once':
                    attrs.unit = this.ui.inputOnceUnit.val();
                    attrs.frequency = 1;

                    var num = parseInt(this.ui.inputOnceFrequency.val()) || 0;
                    attrs.specifics = _.chain(_.range(num)).map(function() { return 0; }).value();
                    break;

                case 'every':
                    attrs.unit = this.ui.inputEveryUnit.val();
                    attrs.frequency = parseInt(this.ui.inputEveryFrequency.val()) || 0;
                    attrs.specifics = [0];
                    break;
            }

            this.model.set(attrs);

            this.options.onComplete && this.options.onComplete();
        }
    });
});
define(
[
"jquery",
"underscore",
"marionette"
],
function ($, _, Marionette) {
    return Marionette.ItemView.extend({
        tagName: 'span',
        events: {
            "click .pressable": function(e) {
                $(e.target).toggleClass('pressed');
                console.log(this.get_specs());
            }
        },

        get_specs: function() {
            return _.map(this.$('.pressed'), function(pressed) {
                var $pressed = $(pressed);
                return $pressed.attr('data-spec-value')
                    ? $pressed.data('spec-value')
                    : $pressed.text();
            });
        }
    });
});
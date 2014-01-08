define(
[
"marionette"
],
function(Marionette) {
    return Marionette.Region.extend({
        el: "#modal",

        initialize: function() {
            this.$el = $(this.el);
            this.$injectPoint = this.$el.find('.modal-content');

            this.$el.hide();
        },

        open: function(view) {
            this.$injectPoint.empty().append(view.el);
            this.$el.show();
        },

        close: function() {
            this.$el.hide();
            Marionette.Region.prototype.close.apply(this, arguments);
        }
    });
});
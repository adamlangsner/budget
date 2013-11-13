define(
[
"marionette"
],
function(Marionette) {
    return Marionette.Region.extend({

        initialize: function() {
            this.animating = false;
        },

        show: function(view) {
            if (this.animating) { return; }
            this.animating = true;
            Marionette.Region.prototype.show.apply(this, arguments);
        },

        open: function(view) {
            Marionette.Region.prototype.open.apply(this, arguments);
            this.$el.show();
            this.$el.animate({
                right: parseFloat(this.$el.css('right')) - this.$el.width()
            }, function() {
                this.animating = false;
            }.bind(this));
        },

        close: function() {
            if (this.animating) { return; }
            this.animating = true;

            this.$el.animate({
                right: parseFloat(this.$el.css('right')) + this.$el.width()
            }, function() {
                Marionette.Region.prototype.close.apply(this, arguments);
                this.$el.hide();
                this.animating = false;
            }.bind(this));
        }
    });
});
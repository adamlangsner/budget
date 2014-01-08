define(
[
"underscore"
],
function(_) {
    // add instance-level function to String objects
    _.extend(String.prototype, {
        capitalize: function() {
            return this.substr(0, 1).toUpperCase() + this.substr(1).toLowerCase();
        }
    });
});
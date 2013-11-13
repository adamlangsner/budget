define(
[
"jquery",
"underscore",
"marionette"
],
function ($, _, Marionette) {
    return Marionette.ItemView.extend({
        template: 'editTransaction'
    });
});
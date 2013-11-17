define(
[
"jquery",
"underscore",
"marionette"
],
function ($, _, Marionette) {
    return Marionette.ItemView.extend({
        template: 'editTransaction',
        className: 'edit-transaction-view'
    });
});
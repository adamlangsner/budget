define(
[
"jquery",
"underscore",
"views/common/modalView"
],
function($, _, ModalView) {
    return ModalView.extend({
        template: 'sideBar/removeTxn',

        className: 'remove-txn-view',

        templateHelpers: {
        },

        events: {
            "click .btn-danger": "removeTxn"
        },

        removeTxn: function(e) {
            App.graphInfo.get('transactions').remove(this.model);
            App.graphInfo.save({}, {silent: true});
            App.modal.close();
        },

        onCancel: function(e) {
            App.modal.close();
        }
    });
});
define(
[
"jquery",
"underscore",
"views/common/modalView"
],
function($, _, ModalView) {
    return ModalView.extend({
        template: 'addTxn/nameAndAmount',

        className: 'name-and-amount-view',

        events: {
            "click .btn-primary": "onComplete"
        },

        ui: {
            inputName: "input[name=name]",
            inputAmount: "input[name=amount]",
            inputType: "#type"
        },

        onInitialize: function() {
        },

        onComplete: function(e) {
            this.model.set({
                name: this.ui.inputName.val(),
                amount: parseInt(this.ui.inputAmount.val()) || 0,
                type: this.ui.inputType.find('button.active').text().toLowerCase()
            });

            this.options.onComplete && this.options.onComplete();
        }
    });
});
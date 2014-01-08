define(
[
"jquery",
"underscore",
"views/addTxn/nameAndAmountView",
"views/addTxn/frequencyView",
"views/addTxn/specificsView",
"models/transaction"
],
function($, _, NameAndAmountView, FrequencyView, SpecificsView, Transaction) {
    var chain = [nameAndAmount, frequency, specifics],
        i,
        onCancel,
        onComplete,
        model;

    function gotoNext() {
        if (i < chain.length) {
            chain[i++]();
        } else {
            onComplete();
        }
    }

    function nameAndAmount() {
        App.modal.show(new NameAndAmountView({

            model: model,

            onComplete: function(e) {
                gotoNext();
            },

            onCancel: function(e) {
                onCancel();
            }
        }));
    }

    function frequency() {
        App.modal.show(new FrequencyView({

            model: model,

            onComplete: function(e) {
                gotoNext();
            },

            onCancel: function(e) {
                onCancel();
            }
        }));
    }

    function specifics() {
        App.modal.show(new SpecificsView({

            model: model,

            onComplete: function(e) {
                gotoNext();
            },

            onCancel: function(e) {
                onCancel();
            }

        }));
    }

    return {

        start: function(options) {
            i = 0;

            model = new Transaction();

            onCancel = function() {
                App.modal.close();
                options.onCancel(model);
            };

            onComplete = function() {
                App.modal.close();
                options.onComplete(model);
            };

            gotoNext();
        }
    };
});
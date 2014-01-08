define(
[
"jquery",
"underscore",
"marionette",
"models/transaction",
"views/sideBar/transactionView",
"chains/addTransactionChain"
],
function ($, _, Marionette, Transaction, TransactionView, AddTransactionChain) {
	return Marionette.Layout.extend({

		template: 'sideBar/sideBar',
		className: 'side-bar',

		templateHelpers: {

		},

		ui: {
			currentBalance: "input[name=currentBalance]",
			addTxnArea: ".add-transaction",
			addTxnButton: ".add-txn-btn",
			nevermindButton: ".nevermind-btn"
		},

		regions: {
			transactionsRegion: '.transactions-region'
		},

		events: {
			"keyup input[name=currentBalance]": "onCurrentBalanceChange",
			"click .add-txn-btn": "addTransaction"
		},

		onRender: function() {
			this.transactionsRegion.show(new Marionette.CollectionView({
				collection: this.model.get('transactions'),
				itemView: TransactionView,
				className: 'transactions'
			}));
		},

		addTransaction: function(e) {
			if (this.isAddingTxn) {
				return;
			}

			this.isAddingTxn = true;

			AddTransactionChain.start({
				onComplete: _.bind(function(txn) {
					this.isAddingTxn = false;
					this.model.get('transactions').add(txn);
					this.model.save({}, { silent: true });
				}, this),

				onCancel: _.bind(function(txn) {
					this.isAddingTxn = false;
				}, this)
			});
		},

		onCurrentBalanceChange: function(e) {
			clearTimeout(this.currentBalanceTimeout);

			this.currentBalanceTimeout = setTimeout(_.bind(function() {

				var newBalance = parseInt($(e.currentTarget).val()) || 0;

				this.model.set('currentBalance', newBalance);
				this.model.save({}, {silent: true});

			}, this), 150);
		}
	});
});
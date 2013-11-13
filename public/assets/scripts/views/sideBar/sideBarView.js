define(
[
"jquery",
"underscore",
"marionette",
"models/transaction",
"views/sideBar/transactionView",
"views/addTransactionView"
],
function ($, _, Marionette, Transaction, TransactionView, AddTransactionView) {
	return Marionette.Layout.extend({

		template: 'sideBar/sideBar',
		className: 'side-bar',

		templateHelpers: {

		},

		ui: {
			currentBalance: "input[name=currentBalance]",
			addTxnArea: ".add-transaction",
			addTxnButton: ".add-transaction button"
		},

		regions: {
			transactionsRegion: '.transactions-region'
		},

		events: {
			"keyup input[name=currentBalance]": "onCurrentBalanceChange",
			"click .add-transaction button": "showAddTransactionView"
		},

		initialize: function() {
		},

		onRender: function() {
			this.transactionsRegion.show(new Marionette.CollectionView({
				collection: this.model.get('transactions'),
				itemView: TransactionView,
				className: 'transactions'
			}));
		},

		showAddTransactionView: function(e) {
			// standard animation stuff
			if (this.animating) { return; }
			this.animating = true;

			this.ui.addTxnArea.slideUp(function() {
				this.animating = false;
			}.bind(this));

			App.slideIn.show(new AddTransactionView());

			// // create new transaction and show the view with the form for the transaction
			// this.transaction = new Transaction();
			// this.addTransactionRegion.show(new AddTransactionView({
			// 	model: this.transaction
			// }));

			// // animate in the form
			// this.ui.addTxnButton.fadeOut();
			// this.ui.addTxnArea.animate({height: '200px'}, function() {
			// 	this.ui.addTxnArea.css('height', 'auto');
			// 	this.ui.addTxnRegion.fadeIn();
			// 	this.ui.addButton.fadeIn();
			// 	this.ui.closeButton.fadeIn(function() {
			// 		this.animating = false;
			// 	}.bind(this));
			// }.bind(this));
		},

		onCurrentBalanceChange: function(e) {
			clearTimeout(this.currentBalanceTimeout);
			this.currentBalanceTimeout = setTimeout(function() {
				this.model.set('currentBalance', parseInt($(e.currentTarget).val()) || 0);
				this.model.save({});
			}.bind(this), 150);
		}
	});
});
define(
[
"jquery",
"underscore",
"marionette",
"models/transaction",
"views/sideBar/transactionView",
"views/editTransactionView"
],
function ($, _, Marionette, Transaction, TransactionView, EditTransactionView) {
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
			"click .add-txn-btn": "showEditTransactionView",
			"click .nevermind-btn": "hideEditTransactionView"
		},

		onRender: function() {
			this.transactionsRegion.show(new Marionette.CollectionView({
				collection: this.model.get('transactions'),
				itemView: TransactionView,
				className: 'transactions'
			}));
		},

		showEditTransactionView: function(e) {
			// standard animation stuff
			if (this.animating) { return; }
			this.animating = true;

			_.each([this.ui.addTxnButton, this.ui.nevermindButton], function(btn) {
				btn.blur();
				btn.animate({
					left: parseFloat(btn.css('left')) - (15 + btn.outerWidth())
				}, function() {
					// ostrich algorithm
					this.animating = false;
				}.bind(this));
			}, this);


			var editTxnView = new EditTransactionView({
				model: new Transaction()
			});

			editTxnView.on('createdTransaction', function(txn) {
				this.model.get('transactions').add(txn);
				this.model.save({}, {silent: true}); // don't want to trigger reset event
			}, this);

			App.slideIn.show(editTxnView);
		},

		hideEditTransactionView: function(e) {
			// standard animation stuff
			if (this.animating) { return; }
			this.animating = true;

			_.each([this.ui.addTxnButton, this.ui.nevermindButton], function(btn) {
				btn.blur();
				btn.animate({
					left: parseFloat(btn.css('left')) + (15 + btn.outerWidth())
				}, function() {
					// ostrich algorithm
					this.animating = false;
				}.bind(this));
			}, this);

			App.slideIn.close();
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
define(
[
"underscore",
"moment",
"backbone",
"models/transaction",
"backbone.localStorage"
],
function(_, moment, Backbone, Transaction) {
	return Backbone.Model.extend({

		localStorage: new Backbone.LocalStorage("budgitMe"),

		url: function() {
			return '/api/budget';
		},

		toJSON: function() {
			var attribues = Backbone.Model.prototype.toJSON.call(this);
			return attribues;
		},

		defaults: {
			currentBalance: 2000,
			transactions: new Backbone.Collection([])
		},

		parse: function(resp, options) {
			resp.transactions = _.map(resp.transactions, function(txn) {
				return new Transaction(txn);
			});

			if (!options || !options.silent) {
				this.get('transactions').reset(resp.transactions);
			}

			delete resp.start;
			delete resp.end;
			delete resp.transactions;
			return resp;
		},

		initialize: function() {
			this._init_data();

			this.on('change:currentBalance', function() {
				var diff = this.get('currentBalance') - this._previousAttributes['currentBalance'];

				this._data.each(function(d) {
					d.set('balance', d.get('balance') + diff);
				});
				this.trigger('change:data');
			});

			this.on('change:end', function() {
				this.trigger('change:data');
			});

			this.get('transactions').on('add', this._on_add_transaction, this);
			this.get('transactions').on('remove', this._on_remove_transaction, this);
			this.get('transactions').on('reset', function(txns) {
				txns.each(this._on_add_transaction, this);
			}, this);
		},

		getData: function() {
			return this._data.toJSON();
		},

		_on_add_transaction: function(txn) {
			var total_change = 0,
				dates = txn.isOneTime()
					? [moment(txn.get('specifics')[0])]
					: txn.dates(this.get('start'), this.get('end'));
			this._update_data(dates, txn.signedAmount());

			txn.on('change:amount', function() {
				var diff = txn.signedAmount() - txn.signedAmount(txn._previousAttributes['amount']);
					dates = txn.dates(this.get('start'), this.get('end'));

				this._update_data(dates, diff);
				this.save({}, {silent: true});
			}, this);
		},

		_on_remove_transaction: function(txn) {
			var total_change = 0,
				dates = txn.isOneTime()
					? [moment(txn.get('specifics')[0])]
					: txn.dates(this.get('start'), this.get('end'));
			this._update_data(dates, -1 * txn.signedAmount());

			txn.off('change:amount');
		},

		_update_data: function(dates, amount) {
			var total_change = 0;

			this._data.each(function(d, i) {
				if (d.get('date').isSame(dates[0], 'day')) {
					total_change += amount;
					dates.shift();
				}

				d.set('balance', d.get('balance') + total_change);
			}, this);
			this.trigger('change:data');
		},

		_init_data: function() {
			var data = new (Backbone.Collection.extend({
					comparator: function(point) {
						return point.get('date').toDate().getTime();
					}
				}))(),
				date = this.get('start').clone();

			while (date <= this.get('end')) {
				var point = new Backbone.Model({
					date: date.clone().startOf('day'),
					balance: this.get('currentBalance')
				});

				data.add(point);
				date.add('days', 1);
			}

			this._data = data;
		}
	});
});
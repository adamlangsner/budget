define(
[
"jquery",
"underscore",
"marionette",
"common/graph",
"models/transaction",
"views/graph/graphTopView"
],
function ($, _, Marionette, Graph, Transaction, GraphTopView) {
	var X_MARGIN = 40,
		Y_MARGIN = 80;

	return Marionette.Layout.extend({
		template: 'graph/graph',
		tagName: "div",
		className: "graph",

		regions: {
			graphTopRegion: ".graph-top-region"
		},

		events: {
		},

		initialize: function() {
			this.listenTo(this.model, "change:data", this.updateGraph);
			this.start = 0;
			this.end = 60;
		},

		_getSliderValues: function() {
			var vals = _.map(this.$('.slider').val(), function(v) {
				return parseInt(v);
			});
			return vals;
		},

		onShow: function() {
			this.graphTopRegion.show(new GraphTopView({
				model: this.model
			}));

			this.graph = new Graph({
				windowStart: App.now().add('days', this.start),
				windowEnd: App.now().add('days', this.end),
				width: this.$el.width(),
				height: this.$el.height() - 115,
				x_margin: X_MARGIN,
				y_margin: Y_MARGIN,
				selector: '.svg-area',
				data: this.model.getData(),
			});

			this.$('.slider').noUiSlider({
				range: [0, 365],
				start: [this.start, this.end],
				step: 1,
				margin: 30,
				slide: _.throttle(_.bind(this.updateGraph, this), 250)
			});
		},

		updateGraph: function() {
			var values = this._getSliderValues(),
				start = App.now().add('days', values[0]),
				end = App.now().add('days', values[1]);

			console.log(start, end);

			this.graph.update(this.model.getData(), start, end);
		}
	});
});
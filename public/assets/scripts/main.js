require.config({
	paths: {
		jquery: "libs/jquery",
		bootstrap: "libs/bootstrap",
		'bootstrap.datepicker': "libs/bootstrap.datepicker",
		underscore: "libs/underscore",
		moment: "libs/moment",
		backbone: "libs/backbone",
		marionette: "libs/marionette",
		d3: "libs/d3",
		'backbone.babysitter': "libs/backbone.babysitter",
		'backbone.wreqr': "libs/backbone.wreqr",
		'backbone.localStorage': "libs/backbone.localStorage",
		'nouislider': "libs/jquery.nouislider.min"
	}
});

require(
[
"jquery",
"app",
"nouislider",
"bootstrap",
"bootstrap.datepicker",
"common/mixins",
"common/overrides"
],
function($, App) {

	$(function() {
		App.start();
	});

});
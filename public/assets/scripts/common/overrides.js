define(
[
"jquery",
"underscore",
"marionette"
],
function($, _, Marionette) {
	Marionette.TemplateCache.prototype.loadTemplate = window.loadTemplate;
});
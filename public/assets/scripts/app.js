define(
[
"jquery",
"underscore",
"backbone",
"marionette",
"models/graphInfo",
"views/graph/graphView",
"views/sideBar/sideBarView",
"regions/slideInRegion",
"regions/modalRegion"
],

function ($, _, Backbone, Marionette, GraphInfo, GraphView, SideBarView, SlideInRegion, ModalRegion) {

    App = new Marionette.Application();

    App.addInitializer(function(options) {
        var _now;
        _.extend(App, {
            // add methods to App object here
            now: function() {
                if (!_now) {
                    _now = moment().startOf('day')
                }

                return _now.clone();
            }
        });
    });

    App.addInitializer(function(options) {
        // create application level regions for sidebar and graph
        App.addRegions({
            sideBar: "section#sideBar",
            slideIn: {
                selector: "section#slideIn",
                regionType: SlideInRegion
            },
            graphArea: "section#graphArea",
            modal: ModalRegion,
        });
    });

    // gets triggered when app starts
    App.on("start", function() {

        // create a graphInfo model and hang it off of App object
        App.graphInfo = new GraphInfo({
            id: 1,
            start: App.now(),
            end: App.now().clone().add('days', 365)
        });

        // download the budget from the server
        App.graphInfo.fetch({
            complete: function() {
                // show the views in their respective regions with the data we just downloaded
                App.sideBar.show(new SideBarView({ model: App.graphInfo }));
                App.graphArea.show(new GraphView({ model: App.graphInfo }));
            }
        });
    });

    return App;
});
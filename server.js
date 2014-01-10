var _ = require("underscore"),
    express = require("express"),
    app = express();

// process arguments
var production = false;
process.argv.forEach(function(val, index, array) {
    if (val == '-p') {
        production = true;
    }
});

console.log('...running in ' + (production ? 'production' : 'development') + ' mode');

// app vars
var assets_dir = __dirname + (production ? '/build' : '/public'),
    views_dir = __dirname + '/views';

app.configure(function() {
    // set ejs as view rendering engine
    app.set('view engine', 'ejs');
    app.set('views', views_dir);

    // serves frontend application
    app.use(express.static(assets_dir));

    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));

    app.use(express.logger());
    app.use(app.router);
});

// serves index ejs file
app.get("/", function(req, res) {
    res.render('index', {
        production: production
    });
});

// start express server
console.log('starting express server...');
app.listen(4000);

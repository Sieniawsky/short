// Load module dependencies

var express    = require( "express" );
var path       = require( "path" );
var favicon    = require( "static-favicon" );
var logger     = require( "morgan" );
var bodyParser = require( "body-parser" );

var routes  = require( "./routes" );

var app     = express();

// Setup enviroment

app.set( "port", process.env.PORT || 3000 );
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "jade" );

app.use( favicon() );
app.use( logger( "dev" ) );
app.use( express.static( path.join( __dirname, "public" ) ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded() );

// Define routes

app.get( "/", routes.index );
app.get( "/:encoded", routes.redirect );
app.post( "/add", routes.add );

// Catch 404 and forward to error handler
app.use(function( req, res, next ) {
    var err = new Error( "Not Found" );
    err.status = 404;
    next( err );
});

// Set error handlers

// Development error handler
// will print stacktrace
if ( app.get( "env" ) === "development" ) {
    app.use( function( err, req, res, next ) {
        res.status( err.status || 500 );
        res.render( "error", {
            message: err.message,
            error: err
        });
    });
}

// Production error handler
// no stacktraces leaked to user
app.use( function( err, req, res, next ) {
    res.status( err.status || 500 );
    res.render( "error", {
        message: err.message,
        error: {}
    });
});

// Initialize server

app.listen( app.get( "port" ), function() {
    console.log( "This server be starting on " + app.get( "port" ) );
});

module.exports = app;
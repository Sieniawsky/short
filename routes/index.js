// Initialize dependencies
// Define route logic

var base62    = require( "../lib/base62" );
var dao       = require( "../lib/dao" );

var shortener = new base62.Shortener();
var urlDAO    = new dao.UrlDAO( "mongodb://localhost:27017/mini" );

exports.index = function( req, res ) {
  res.render( "index", { title: "short." } );
};

exports.redirect = function( req, res ) {

  var decoded = shortener.decode( req.params.encoded );

  urlDAO.get( decoded, function( url ) {
    res.redirect( url );
  });
};

exports.add = function( req, res ) {

  console.log( "Add on server-side" );

  var url       = req.body.url;
  var encoded   = "";
  var short_url = "";

  urlDAO.add( url, function( new_id ) {
    encoded = shortener.encode( new_id );
    short_url = "localhost:3000/" + encoded;

    res.send( short_url );
  });

};
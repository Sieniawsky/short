// Data Access Object for the urls collection
// Provides a simple interface for adding new 
// urls and retrieving them based on an ID.

var mongo = require( "mongodb" );
var monk  = require( "monk" );

var DAO = (function() {

  var UrlDAO = function( socket ) {
    this.socket = socket;
  };

  UrlDAO.prototype.add = function( url, callback ) {

    var db = monk( this.socket );
    var counters = db.get( "counters" );
    var urls = db.get( "urls" );

    counters.findAndModify( { query: { type: "urlid" }, update: { $inc: { seq: 1 } }, new: true } ).on( "success", function( doc ) {

      // insert new document to url collection

      urls.insert( { _id: doc.seq + 1, url: url } ).on( "success", function( doc ) {

        callback( doc._id );
        db.close();
      });
    });  
  };

  UrlDAO.prototype.get = function( id, callback ) {

    var db = monk( this.socket );
    var urls = db.get( "urls" );

    urls.find( { _id: id } ).on( "success", function( doc ) {

      callback( doc[0].url );
      db.close();
    });
  };

  return UrlDAO;

})();

exports.UrlDAO = DAO;
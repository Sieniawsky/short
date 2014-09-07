// Data Access Object for the urls collection
// Provides a simple interface for adding new 
// urls and retrieving them based on an ID.

// Load mongo dependencies

var mongo = require("mongodb");
var monk  = require("monk");

var DAO = (function() {

  // The UrlDAO object has one property, a socket. 
  // Upon initialization a web-socket of the form:
  //  mongodb://host:port/database
  // is stored to later establish connections.
  var UrlDAO = function(socket) {
    this.socket = socket;
  };

  // Object method that adds a new url to the urls 
  // collection. The method also takes a callback that 
  // is executed after the insert operation is completed.
  UrlDAO.prototype.add = function(url, callback) {

    // Establish database connection
    var db = monk(this.socket);

    // Get the counters collection
    var counters = db.get("counters");

    // Get the urls collection
    var urls = db.get("urls");

    // The urls collection uses autoincrimented ids. 
    // The current id in the sequence is stored in 
    // the counters collection. The current sequence 
    // value needs to be incremented and returned for 
    // use when inserting the new url. This new id value 
    // is then used as the _id property of the new document 
    // along with the provided url.
    counters.findAndModify({ query: { type: "urlid" }, update: { $inc: { seq: 1 } }, new: true } ).on( "success", function(doc) {

      // Insert new document into the urls collection 
      // with the newly generated id.
      urls.insert({ _id: doc.seq + 1, url: url }).on("success", function(doc) {

        // After inserting the document, execute the callback 
        // with the newly generated id as a parameter. The 
        // id is needed so that it can be encoded into base 62 
        // for use with the shortened url.
        callback(doc._id);

        // Close the database connection.
        db.close();
      });
    });
  };

  // Object method that takes an id and returns the url 
  // associated with that id.
  UrlDAO.prototype.get = function(id, callback) {

    // Establish a database connection
    var db = monk(this.socket);

    // Get the urls collection
    var urls = db.get("urls");

    // Find the document with the provided id.
    urls.find({ _id: id } ).on("success", function(doc) {

      // Execute the callback function with the queries 
      // documents url as a parameter. The url is needed 
      // to perform the redirection operation.
      callback(doc[0].url);

      // Close the database connection.
      db.close();
    });
  };

  return UrlDAO;
})();

exports.UrlDAO = DAO;
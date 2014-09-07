// Index route
// This route handles all logic for the application since it 
// is a simple single-page web app. Three exports are defined 
// that carry out the operations of serving the index page, 
// adding a new url to the database, and retrieving a url from 
// the database using a provided id. Two library files are used. 
// The dao.ja file provides a simple Data-Access-Object interface 
// for interacting with the database. The base62.js file provides 
// methods for performing base 62 encoding and decoding.

// Load library modules
var base62    = require("../lib/base62");
var dao       = require("../lib/dao");

// Initialize
var shortener = new base62.Shortener();
var urlDAO    = new dao.UrlDAO("mongodb://localhost:27017/mini");

// Index route that serves the main page.
exports.index = function(req, res) {
  res.render("index", { title: "short." });
};

// Redirect route that takes a base 62 encoded string from the request 
// body. The string is then decoded to a base 10 number which is then 
// used to fetch a url from the urls database collection. The user is 
// then redirected to the fetched url.
exports.redirect = function(req, res) {

  var decoded = shortener.decode(req.params.encoded);

  urlDAO.get(decoded, function(url) {
    res.redirect(url);
  });
};

// Add route that takes a url and inserts it into the urls database 
// collection. The auto-incremented id generated for the insert is 
// then encoded into a base 62 string and used to create a shortened 
// url which is then returned as part of the response for use on the 
// front-end.
exports.add = function(req, res) {
  
  var url       = req.body.url;
  var encoded   = "";
  var short_url = "";

  urlDAO.add(url, function(new_id) {
    encoded = shortener.encode(new_id);
    short_url = "localhost:3000/" + encoded;

    res.send(short_url);
  });
};
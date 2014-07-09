var Standard = (function() {

  var Standard = function() {
    this.regex = new RegExp(
                  "^" +
                    // protocol identifier
                    "(?:(?:https?|ftp)://)" +
                    // user:pass authentication
                    "(?:\\S+(?::\\S*)?@)?" +
                    "(?:" +
                      // IP address exclusion
                      // private & local networks
                      "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
                      "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
                      "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
                      // IP address dotted notation octets
                      // excludes loopback network 0.0.0.0
                      // excludes reserved space >= 224.0.0.0
                      // excludes network & broacast addresses
                      // (first & last IP address of each class)
                      "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
                      "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
                      "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
                    "|" +
                      // host name
                      "(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)" +
                      // domain name
                      "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*" +
                      // TLD identifier
                      "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
                    ")" +
                    // port number
                    "(?::\\d{2,5})?" +
                    // resource path
                    "(?:/[^\\s]*)?" +
                  "$", "i"
                );
  };

  Standard.prototype.prefix = function( url ) {

    var array = url.split(".");

    if ( array.length === 2 ) {
      array[0] = "http://www." + array[0];

    } else if ( array.length >= 3 ) {
      if ( array[0].substring(0, 7) !== "http://" && array[0].substring(0, 8) !== "https://" ) {
        array[0] = "http://" + array[0];
      }

    }

    return array.join(".");

  };

  Standard.prototype.isValid = function( url ) {
    return this.regex.test( url );
  };

  return Standard;

})();
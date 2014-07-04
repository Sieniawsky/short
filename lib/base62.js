// A url shortener object that performs base 62 
// encoding and decoding. The object provides two 
// methods that perform the encoding of base 10 
// numbers to base 62 strings, and a decoding 
// function that converts base 62 strings to a base 10 number.

var Shortener = (function() {

  // Shortener object. Contains two properties, 
  // a 62 character alphabet made up of a-z lowercase, 
  // A-Z uppercase, and the numbers 0-9. Also the base 
  // value is stored.
  var Shortener = function() {
    this.alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    this.base     = 62;
  };

  // Object method that performs the encoding operation. 
  // The method takes a base 10 number as input and encodes 
  // it into a base 62 string.
  Shortener.prototype.encode = function( number ) {

    var encoded   = "",
        remainder = 0;

    // If the input is equal to zero return a.
    if ( number === 0 ) {

      return "a";
      
    }

    // Perform the encoding.
    while ( number > 0 ) {

      remainder = number % this.base;
      encoded += this.alphabet[ remainder ];
      number = ( number - remainder ) / this.base;

    }

    // Reverse the encoded string and return the encoded value.
    return encoded.split("").reverse().join("");

  };

  // Object method that performs the decoding operation. 
  // A base 62 string is taken as input and decoded to a 
  // base 10 number.
  Shortener.prototype.decode = function( string ) {

    var decoded = 0,
        i       = 0;

    // Perform the decoding operation.
    for ( i = 0; i < string.length; i++ ) {

      decoded = ( decoded * this.base ) + this.alphabet.indexOf( string[ i ] );

    }

    return decoded;

  };

  return Shortener;

})();

exports.Shortener = Shortener;
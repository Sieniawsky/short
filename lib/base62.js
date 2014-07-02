var Shortener = (function() {

  var Shortener = function() {
    this.alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    this.base     = 62;
  };

  Shortener.prototype.encode = function( number ) {

    var encoded   = "",
        remainder = 0;

    if ( number === 0 ) {

      return "a";
      
    }

    while ( number > 0 ) {

      remainder = number % this.base;
      encoded += this.alphabet[ remainder ];
      number = ( number - remainder ) / this.base;

    }

    return encoded.split("").reverse().join("");

  };

  Shortener.prototype.decode = function( string ) {

    var decoded = 0,
        i       = 0;

    for ( i = 0; i < string.length; i++ ) {

      decoded = ( decoded * this.base ) + this.alphabet.indexOf( string[ i ] );

    }

    return decoded;

  };

  return Shortener;

})();

exports.Shortener = Shortener;
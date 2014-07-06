// Basic front-end code. Hooks the enter key press 
// and makes a POST request to add the nex URL. The 
// return data is then presented to the user.

$( function() {

  var valid = new Standard();

  $( "#url" ).on( "keyup", function( e ) {
    if( e.keyCode === 13 ) {
      var url = $( this ).val();
      url = valid.prefix( url );

      if ( valid.isValid( url ) ) {
        var parameters = { url: url };

        $.post( "/add", parameters, function( data ) {
          $( "#result" ).text( "Shortened URL: " + data );
        });
      } else {
        $( "#result" ).text( "Invalid URL" );
      }
    }
  });
});
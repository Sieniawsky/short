// Basic front-end code. Hooks the enter key press 
// and makes a POST request to add the new URL. The 
// return data is then presented to the user.

$(function() {

  // Initialize the URL validator
  var valid = new ValidURL();

  // Add event listeners for when the enter key is pressed while focus is on the 
  // URL input field, and for when the shorten button is clicked.

  $("#url").on("keyup", function(e) {
    if(e.keyCode === 13) {
      var url = $(this).val();
      add_url(url);
    }
  });

  $("#submit").on("click", function(e) {
    var url = $("#url").val();
    add_url(url);
  });

  // Helper function that is called after a URL is submitted. 
  // The URL is sent via AJAX HTTP POST to the back-end to be 
  // inserted into the database. Upon insertion the new shortened 
  // URL is return and then displayed to the user.
  var add_url = function(url) {

    var normalized_url = valid.add_prefix(url);

    if (valid.is_valid(normalized_url)) {
      var parameters = { url: normalized_url };

      $.post("/add", parameters, function(data) {
        display(data);
      });
    } else {
      $("#bucket").append("<p>Invalid URL</p>");
    }
  };

  // Helper function that takes a newly shortened URL as a parameter. 
  // This URL is then displayed to the user.
  var display = function(url) {

    var bucket = $("#bucket").empty();

    bucket.append("<p class='description'>Here's your shortened URL, enjoy <span class='heart'>&#9825;</span></p>");
    bucket.append("<input type='text' readonly='true' class='form-control' onclick='this.select()' value='" + url +"'>");
  };
});
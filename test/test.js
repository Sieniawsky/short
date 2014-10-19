// Basic test cases for the front-end URL
// validation code. First step is to normalize
// input urls into a common format. Next, the
// validation regex is used to verify that URLs
// are well formed.
$(function() {
  var valid = new ValidURL();

  // Test Data
  var data = {
    normalization: [
      {input: 'www.google.com', output: 'http://www.google.com',
        success: 'WWW sub-domain passed.', error: 'WWW sub-domain failed.'},
      {input: 'google.com', output: 'http://www.google.com',
        success: 'No sub-domain passed.', error: 'No sub-domain failed.'},
      {input: 'code.google.com', output: 'http://code.google.com',
        success: 'Sub-domain passed.', error: 'Sub-domain failed.'},
      {input: 'google.com:8080', output: 'http://www.google.com:8080',
        success: 'With port passed.', error: 'With port failed.'},
      {input: 'google.com?foo=foo', output: 'http://www.google.com?foo=foo',
        success: 'With single parameter passed.', error: 'With single parameter failed.'},
      {input: 'ajax.googleapis.com/ajax/libs/jquery/1.11.0',
        output: 'http://ajax.googleapis.com/ajax/libs/jquery/1.11.0',
        success: 'Virtual file system passed.', error: 'Virtual file system failed.'}
    ],
    validity: [
      'http://www.google.com',
      'http://code.google.com',
      'http://www.google.com:8080',
      'http://www.google.com?foo=foo',
      'http://ajax.googleapis.com/ajax/libs/jquery/1.11.0'
    ]
  };

  // Normalization tests
  var normal_data = data.normalization,
      is_valid,
      normalized,
      html,
      test;
  for (var i = 0; i < normal_data.length; i++) {
    test = normal_data[i];
    normalized = valid.normalize(test.input);
    is_valid = normalized === test.output;
    if (is_valid) {
      html = '<li>' + test.success + ' <span class="success">&#x2713;</span></li>';
    } else {
      html = '<li>' + test.error + ' <span class="error">&#x2717;</span>' +
        '<ul><li class="code">Input: ' + test.input + '</li>' +
        '<li class="code">normalized: ' + normalized + '</li>' +
        '<li class="code">Ouput: ' + test.output + '</li></ul></li>';
    }

    $('.normalization-list').append(html);
  }

  // Validity Tests
  var valid_data = data.validity;
  for (i = 0; i < valid_data.length; i++) {
    test = valid_data[i];
    is_valid = valid.validate(test);
    if (is_valid) {
      html = '<li><span class="code">' + test + '</span> is valid. <span class="success">&#x2713;</span></li>';
    } else {
      html = '<li><span class="code">' + test + '</span> is not valid. <span class="error">&#x2717;</span></li>';
    }

    $('.validity-list').append(html);
  }
});
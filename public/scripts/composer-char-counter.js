$(document).ready(function () {

  //.new-tweet class selector
  var $newtweet = $('.new-tweet');

  $newtweet.on('input change', 'textarea', function () {

    //resets error message to empty string after changing input
    $(this).parent().find('.errorMsg').text('');
    // obtain the current length of user's input
    let lengthOfInput = $(this).val().length;
    // maximum amount of input characters is 140
    let maxInputLength = 140;
    // character counter
    let charCount = maxInputLength - lengthOfInput;
    // .counter class selector
    let $counter = $(this).parent().find('.counter');

    // change the number of characters as user types
    $counter.text(charCount);

    //
    if (charCount < 0) {
      $counter.css({ 'color': 'red'});
    } else {
      $counter.css({ 'color': ''});
    }
  });
});

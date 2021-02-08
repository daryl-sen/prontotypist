$(document).ready(function() {
  $('#typing-field').on('keyup', function() {
    const newVal = 140 - $(this).val().length;
    const counter = $(this).parent().children('#tweetButtonAndCounter').children('output');
    counter.val(newVal);
    if (newVal < 0) {
      counter.addClass('red');
    } else {
      counter.removeClass('red');
    }
  });
});
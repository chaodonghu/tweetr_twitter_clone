/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


 $(document).ready(function () {
// function that takes in a tweet object and returns a tweet article element
// containing the entire HTML structure of the tweet
function createTweetElement(tweet) {
  var $tweet = $('<article>').addClass('tweet');
  var $header = $('<header>');
  var $avatar = $('<img>').addClass('avatar').attr("src", tweet.user.avatars.regular);
  var $user = $('<h2>').addClass('user').text(tweet.user.name);
  var $handle = $('<span>').addClass('handle').text(tweet.user.handle);
  var $content = $('<div>').text(tweet.content.text);
  var days_since = Math.floor((Date.now() - tweet.created_at)/(1000*60*60*24));
  var $footer = $('<footer>');
  var $createdAt = $('<span>').text(days_since + " days ago");
  var $iconHeart = $("<i>").attr({"class": "fa fa-heart", "aria-hidden": "true"});
  var $iconRetweet = $("<i>").attr({"class": "fa fa-retweet", "aria-hidden": "true"});
  var $iconFlag = $("<i>").attr({"class": "fa fa-font-awesome", "aria-hidden": "true"});

  $header = $header.append($avatar).append($user).append($handle);
  $footer = $footer.append($createdAt).append($iconHeart).append($iconRetweet).append($iconFlag);

  $tweet = $tweet.append($header).append($content).append($footer);

  return $tweet;
}

// function takes an array of tweet objects and appends
// each one to the #tweets-container
function renderTweets(tweets) {
  for (tweet in tweets) {
    let tweetObject = tweets[tweet];
    let $tweet = createTweetElement(tweetObject);
    $('#tweets-container').prepend($tweet);
  }
}

// prevents redirection after submission of form, serializes
// input into a jquery string
$('#tweet-box').on('submit', function (event) {
  event.preventDefault();
  var $enteredTweet = $(this).find('textarea').serialize();
  //console.log($enteredTweet);
});

// utilizes AJAX to fetch(get) data from server
function loadTweets () {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    data: $(this).serialize(),
    dataType: 'JSON',
    success: function (data) {
      //console.log('Success: ', data);
      renderTweets(data);
    }
  });
}
  loadTweets()

});

// run the jquery
  // $('#tweet-box').on('submit', function (e) {
  //   e.preventDefault();
  //   console.log($('textarea').val());
  //   $('#tweets-list').append(`<li>${$('textarea').val()}</li>`)
  // })

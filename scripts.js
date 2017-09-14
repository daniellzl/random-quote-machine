var quote = document.querySelector('.quote');
var author = document.querySelector('.author');
var newQuote = document.querySelector('.new-quote');
var twitter = document.querySelector('.twitter');
var quoteMachine = $('.quote-machine');
var body = document.querySelector('body');
var colors = ["#cbbeb5", "#ff6666", "#525266", "#423f3b", "#ffe5a9", "#dbcccc", "#8faab3", "#c4bd8b", "#81b14f", "#451b04"];

newQuote.addEventListener('click', addNewQuote);

// get new color index
function newIndex() {

  return Math.floor(Math.random() * colors.length);
}

// get new quote and change page background color
function addNewQuote() {

  quoteMachine.fadeOut(1000, function() {

    // get new quote
    $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?", function(json) {

      quote.textContent = json.quoteText;
      if (json.quoteAuthor === '') {
        json.quoteAuthor = 'Anonymous';
      }

      // change quote text
      author.textContent = '- ' + json.quoteAuthor;
      twitter.setAttribute('href', "https://twitter.com/intent/tweet?text=" + json.quoteText + "~" + json.quoteAuthor);
    });

    // change page background and fade in
    var index = newIndex();
    body.style.background = colors[index];
    newQuote.style.background = colors[index];
    quoteMachine.fadeIn(1000);
  });
}

addNewQuote();

var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$(document).ready( function() {
  MatchGame.renderCards(MatchGame.generateCardValues(), $('#game'));
})

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var cardValues = [];
  for (var i = 1; i < 9; i++) {
    cardValues.push(i);
    cardValues.push(i);
  }
  var randomCardValues = [];
  while (cardValues.length !== 0) {
    var randomIndex = Math.floor(Math.random() * cardValues.length);
    var randomValue = cardValues.splice(randomIndex,1)[0];
    randomCardValues.push(randomValue);
  }

  return randomCardValues;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  var cardColors = ['hsl(25, 85%, 65%)',
                    'hsl(55, 85%, 65%)',
                    'hsl(90, 85%, 65%)',
                    'hsl(160, 85%, 65%)',
                    'hsl(220, 85%, 65%)',
                    'hsl(265, 85%, 65%)',
                    'hsl(310, 85%, 65%)',
                    'hsl(360, 85%, 65%)'];
  $game.empty();
  $game.data('flippedCards', []);
  for (var cardIndex = 0; cardIndex < cardValues.length; cardIndex++) {
    var $card = $('<div class="col-xs-3 card"></div>');
    $card.data('value', cardValues[cardIndex]);
    $card.data('isFlipped', false);
    $card.data('color', cardColors[(cardValues[cardIndex] - 1)])
    $game.append($card);
  }

  $('.card').click( function() {
    MatchGame.flipCard($(this), $('#game'));
  });
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if ($card.data('isFlipped')) {
    return;
  }
  $card.text($card.data('value'));
  $card.css('background-color', $card.data('color'));
  $card.data('isFlipped', true);
  var flipped = $game.data('flippedCards');
  flipped.push($card);

  if (flipped.length === 2) {
    if (flipped[0].data('value') === flipped[1].data('value')) {
      flipped[0].css('background-color', 'rgb(153, 153, 153)');
      flipped[1].css('background-color', 'rgb(153, 153, 153)');
    } else {
      window.setTimeout( function() {
        flipped[0].text('');
        flipped[0].css('background-color', 'rgb(32, 64, 86)');
        flipped[0].data('isFlipped', false);
        flipped[1].text('');
        flipped[1].css('background-color', 'rgb(32, 64, 86)');
        flipped[1].data('isFlipped', false);
      }, 350);
    }
    $game.data('flippedCards', []);
  }
};

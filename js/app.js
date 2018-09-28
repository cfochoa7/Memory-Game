//Creating an array to store the cards along with adding a pair for each through the concat() method.
let sets = ["fa fa-diamond", "fa fa-paper-plane-o","fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle"];
const set = sets.concat(sets);

//list of elements from the DOM.
const deck = document.querySelector('.deck');
const reset = document.querySelector('.restart');
const sCard = document.createElement('li');
const movesText = document.querySelector('.moves');
const tryAgain = document.querySelector('.try_again');
const cancel = document.querySelector('.cancel_button');

//List of values.
let move = 0
let open = [];
let min = 0;
let sec = -16;
let equal = 0;

/* Places the cards on the webpage. Creates a classlist within the created 'li' element
and adds 'set' array within the 'i' element. tCard is inserted within the sCard and the sCard is inserted
within the deck */

//Inspired by Mikes Wales in setting up the cards--https://www.youtube.com/watch?v=_rUH-sEs68Y
set.forEach(function(pack) {
    const sCard = document.createElement('li');
    const tCard = document.createElement('i');
    
    sCard.classList.add('card');
    tCard.className += (pack);
    sCard.appendChild(tCard);
    deck.prepend(sCard);

    start(sCard);
    time();
    doOver();
});

/* This function creates an addEventListener to the sCard that will 'open' and 'show' the card of a length
of no more than 2 cards. The sCard will be inserted within the new array 'open'.
For each two clicks the step() and countstars() will go into effect.
The gameover() will fire after all cards are paired.*/

//Inspired by Mikes Wales--https://www.youtube.com/watch?v=_rUH-sEs68Y
function start(sCard){
    sCard.addEventListener('click', event => {

      if (open.length === 2 || open.length < 2 && !open.includes(event.target)) {
        sCard.classList.add('open', 'show');
        open.push(sCard);
          
          match();
          step();
          countStars();
          gameOver();
    }
  });
}

/* This function will check the className of the firstChild in order to match the card. If matched
then the pair will be pushed into the open-array along with recording a move and adding to the equal of +1.
Otherwise a mismatch will remove the 'open' and 'show' of the selected card. A move will still be recorded
and a setTimeout will go into effect limiting the two cards to be open for 450 milliseconds. */

//Code is influenced from Matthew Cranford--https://matthewcranford.com/memory-game-walkthrough-part-3-matching-pairs/
function match () {

  if (open[0].firstChild.className === open[1].firstChild.className) {
    console.log('match');
    open[0].classList.add('match') || open[1].classList.add('match');

  open = [];
  equal++;
  move++

} else {
  function limit(){
      if(open[0].firstChild.className !== open[1].firstChild.className) {
        console.log('no match');
        open[0].classList.remove('open', 'show') || open[1].classList.remove('open', 'show');

        open = [];
      }
    }
  setTimeout(limit, 450)
  move++
 }
}

function step() {
  document.querySelector('.moves').innerText = move;
}

/* The  addEventListener to the reset button will reverse the game back to its
original state.

The gone() will remove any open cards or matches using the forEach() method on selecting its classes.

The mix() will use an array form the '.deck li' and place it inside the shuffle function.
Then the shuffle function will be placed inside the sleightOfHand and use the forEach() method
to randomly reset the cards in a different place. Then a node will be added to the deck by appending
the child from the card.

The add() will select the DOM of '.stars' and reset their number by using the innerHTML.

The reStep() will reset the number of moves back to zero and displaying them on the page with innerHTML.

The timeTravel() will reset the timer back to 0.*/
function doOver(){
reset.addEventListener('click', startOver => {
 //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
  function gone() {
    const remove = Array.from(document.querySelectorAll('.card'));
    remove.forEach(function(card){
      card.classList.remove('open', 'show', 'match');
    });
  }

    function mix() {
      const shuffling = Array.from(document.querySelectorAll('.deck li'));
      const sleightOfHand = shuffle(shuffling);
      sleightOfHand.forEach(function(card) {
        deck.appendChild(card);
      });
    }


    function add() {
      const star = document.querySelector('.stars')
      star.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`
    }

    function reStep() {
      if(move = 0) {
        console.log('This works');
      }
      movesText.innerHTML = ''
    }

    function timeTravel() {
      sec = 0;
      min = 0;
      }

    gone();
    mix();
    add();
    reStep();
    timeTravel();
});
}

/* The shuffle function will go into the mix function.*/
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {

    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/* The time function sets the timer. A setInterval is created to a speed of 1000 milliseconds
and placed in the value of 'freeze'. */
function time() {
 if (sec > 59) {
   min++;
   sec = 0;
 } else {
   sec++;
 }
 document.getElementById("minutes").innerHTML = min;
 document.getElementById("seconds").innerHTML = sec;
}
let freeze = setInterval(time, 1000);

/* This function will use the '.stars' from the DOM and will be removed through the innerHTML
depending on the amount of moves is recorded. */
function countStars() {
 let star = document.querySelector('.stars')
 if(move === 9) {
   console.log('loss');
   star.innerHTML = `<li><i class="fa fa-star"></i></li>
                     <li><i class="fa fa-star"></i></li>`
 }
  else if (move === 17) {
   console.log('losses');
   star.innerHTML = `<li><i class="fa fa-star"></i>`
 }
 else if (move === 21) {
   console.log('done');
   star.innerHTML = ``
 }
}

/* The function will fire off the modalOn() and modalSats() if the equal from the match()
is equivalent to 8 pairs. */
function gameOver() {
 if (equal === 8) {
   modalOn();
   modalStats();
 }
}

/* This function will unveil the '.modal_background' using the toggle method only if
8 pairs are matched. */

//Inspired from Matthew Cranford-https://matthewcranford.com/memory-game-walkthrough-part-8-putting-it-all-together/
function modalOn() {
 document.querySelector('.modal_background').classList.toggle('hidden');
}

/* This function will unveil the score only if 8 pairs are matched.
The DOMs are selected and added to each appropriate self to record the data. */

//Code is influenced from Matthew Crandord--https://matthewcranford.com/memory-game-walkthrough-part-7-making-a-modal/
function modalStats() {
 document.querySelector('.time').textContent = 'Time : ' + document.querySelector('.clock').textContent;
 document.querySelector('.starz').innerHTML = 'Rank ' + document.querySelector('.stars').innerHTML;
 document.querySelector('.movez').textContent ='Moves : ' + move;
}


/* The addEventListener is added through the tryAgain button. This button is only available after the player
finishes the game. The replay() has the same exact functions from the doOver() on line 109. */
tryAgain.addEventListener('click', replay);
function replay() {
 const remove = Array.from(document.querySelectorAll('.card'));
    remove.forEach(function(card) {
            card.classList.remove('open', 'show', 'match');
    });

  const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
  const sleightOfHand = shuffle(cardsToShuffle);
    sleightOfHand.forEach(function(card) {
      deck.appendChild(card);
    });

 const star = document.querySelector('.stars')
 star.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`

 if(move = 0) {
   console.log('This works');
 }

 sec = 0;
 min = 0;
 equal = 0;
 modalOn();
}

/* The addEventListener is added through the tryAgain button. This button is only available after the player
finishes the game. The '.feature' from the DOM is unveiled throught the toggle method.
The clearInterval will stop the timer using the 'freeze' value.*/

//Inspired by Matthew Cranford-https://matthewcranford.com/memory-game-walkthrough-part-8-putting-it-all-together/
cancel.addEventListener('click', function() {
 document.querySelector('.feature').classList.toggle('disapear');
 clearInterval(freeze);
});

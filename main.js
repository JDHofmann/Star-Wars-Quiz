// ** label class could be blank for question format, and toggled correct and incorrect for answer page.

// ** prompt after question can be the same for either correct or incorrect, with the exception of CORRECT or INCORRECT at the top

// this function will run when the "start the quiz" btn is clicked via $('.submit-button').on('click', function(){})
/*
function generateQuestion(){
  console.log("`generateQuestion` ran");
}
*/
let questionNumber = 0;
let currentScore = 0;

function updateScore() {
  currentScore ++;
  $('.test-tracker').html(`
    <li>Question: ${questionNumber}/10</li><li>Score: ${currentScore}</li>`);
    console.log(currentScore);
}

function startQuiz() {
  $('.Questions-Answers').on('click', '.start-quiz', function(event){
    event.preventDefault();
    $('.start-quiz').css('display', 'none');
    $('.shouldWeStart').css('display', 'none');
    $('.test-tracker').append(`
      <li>Question: ${questionNumber}/10</li><li>Score: ${currentScore}</li>`);
    console.log('`startQuiz` ran')
    createQuestion();

  }
  );
}
// turn into a if else loop
function createQuestion() {
  $('.Question').css('display', 'block');
  $('form').css('display', 'block');

  $('.Question').text(`${STORE[0].question}`);

  $('form').html(`<fieldset>
    <label class="answer-option">
      <input type="radio" name="answer" value="${STORE[0].answers[0]}">
    <span>${STORE[0].answers[0]}</span>
    </label>
    <label class="answer-option">
      <input type="radio" name="answer" value="${STORE[0].answers[1]}">
    <span>${STORE[0].answers[1]}</span>
    </label>
    <label class="answer-option">
      <input type="radio" name="answer" value="${STORE[0].answers[2]}">
    <span>${STORE[0].answers[2]}</span>
    </label>
    <label class="answer-option">
      <input type="radio" name="answer" value="${STORE[0].answers[3]}">
    <span>${STORE[0].answers[3]}</span>
    </label>
    <button type="submit" class="submit-button" name="button">Submit</button>
  </fieldset>`);
  console.log('`createQuestion` ran');

}


// target form on click of submit button
let answerSelected = '';
 $('form').on('click', '.submit-button', function(event) {
   event.preventDefault();
    answerSelected = $( "input:checked" ).val();
   $('.Question').css('display', 'none');
   //if (answerSelected !=== ''){
     checkAnswer();
     selectedAnswer();
     triviaDisplay();
   //}
  //  else {
  //    alert('try again');
  //  }
 })

function triviaDisplay() {
  $('.trivia').text(STORE[0].trivia);
  $('.trivia').css('display', 'block');
}
let currentAnswerCorrectOrIncorrect = '';

function checkAnswer() {
  // check to see is value of answer === STORE[0].correctAnswer
  $('.correctOrIncorrect').css('display', 'block');
  if ( answerSelected === STORE[0].correctAnswer){
    currentAnswerCorrectOrIncorrect = 'correct';
    $('.correctOrIncorrect').css('color', 'green');
    updateScore();
  }
  else {
    currentAnswerCorrectOrIncorrect = 'incorrect';
    $('.correctOrIncorrect').css('color', 'red');
  }
  $('.correctOrIncorrect').text(currentAnswerCorrectOrIncorrect);
  
}

function selectedAnswer() {
  console.log('`selectedAnswer` ran');
  $('.submit-button').css('display', 'none');
  $('.nextQuestion').css('display', 'block');

  // target selected answer - if else on is it correct
  // if correct answer choosen {
  //  turn correct answer green
  //  display h3 .correctOrIncorrect CORRECT
  //  }
  // else {}
  // display trivia in h2

  // update Score in testTracker
}
function createNextQuestion() {
  $('form').on('click', 'nextQuestion', function() {

  })
  // update Question in test tracker

  // create a next question button to replace Submit
  // each time it is clicked we run this function
  // this function will be a loop with a function exactly the
  // same as generateQuestion, but with "i" starting on 1, for STORE[i]

  console.log('`createNextQuestion` ran');
}

function createQuiz() {
  startQuiz();
  // createQuestion();
  // selectedAnswer();
  createNextQuestion();
}
$(createQuiz);
// render the page

// go to question 1 when clicked

// display which question Number and Score
// Change submit button text to Submit
// input questions and answers in H2 and labels for each question

// when submit button clicked:
// opacity .3 for answers not selected
// highlight green correct answer
// display correct or incorrect
// show additional trivia along with question
// change submit button text to Next question

// ** repeat until 10/10 questions answered

// display final Score and if the user is a Jedi master or not
// change submit button text to Play Again

// add hover features for each answer
// invert submit button color for hover

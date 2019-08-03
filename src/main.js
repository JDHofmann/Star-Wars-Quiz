// causing error 180803
//let $ = require('jquery');

let questionNumber = 0;
let currentScore = 0;

function startQuiz() {
  // when you click start quiz button
  $('.Questions-Answers').on('click', '.start-quiz', function(event){
    event.preventDefault();
    // remove start button
    $('.start-quiz').css('display', 'none');
    // remove 'should we start' text
    $('.shouldWeStart').css('display', 'none');
    //renderTestTracker();
    $('.test-tracker').css('display', 'block');
    // begin question number display at 1
    $('.question-number').text('1');
    // display test tracker

    console.log('`startQuiz` ran')
    // run question generator
    questionGenerator();
  });
}

function questionGenerator() {
  // remove next question button
  // $('.nextQuestion').css('display', 'none');
  // remove correct or incorrect
  $('.correctOrIncorrect').css('display', 'none');
  // remove question solution
  $('.correctedAnswer').css('display', 'none');
  // remove trivia
  $('.trivia').css('display', 'none');
  // if there are questions left to ask...
  if ( questionNumber < STORE.length){
    // render the score
    renderScore();
    // display form
    $('form').css('display', 'block');
    // display question div
    $('.Question').css('display', 'block');

    // add question from store into question div
    $('.Question').text(`${STORE[questionNumber].question}`);
    // add answers for store into form
    $('fieldset').html(`
      <label class="answer-option a">
        <input type="radio" name="answer" value="${STORE[questionNumber].answers[0]}" checked>
      <span>${STORE[questionNumber].answers[0]}</span>
      </label>
      <label class="answer-option b">
        <input type="radio" name="answer" value="${STORE[questionNumber].answers[1]}">
      <span>${STORE[questionNumber].answers[1]}</span>
      </label>
      <label class="answer-option c">
        <input type="radio" name="answer" value="${STORE[questionNumber].answers[2]}">
      <span>${STORE[questionNumber].answers[2]}</span>
      </label>
      <label class="answer-option d">
        <input type="radio" name="answer" value="${STORE[questionNumber].answers[3]}">
      <span>${STORE[questionNumber].answers[3]}</span>
      </label>
      <button type="submit" class="submit-button" name="button">Submit</button>
    `);
  }
    else {
      endOfGame();
    }
  console.log('`questionGenerator` just ran');
}

function changeQuestionNumber() {
  // add 1 to questionNumber
  questionNumber ++;
  // push questionNumber to test-tracker
  $('.question-number').text(questionNumber+1);
  console.log(`we are now displaying question number ${questionNumber}`);
}

function updateScore() {
  // add 1 to currentScore
  currentScore = currentScore + 1;
}
function renderScore() {
  // render currentScore to test-tracker
  $('.score').text(currentScore);
  console.log(`Your current score is ${currentScore}`);
}

let answerSelected = '';

//  once user checks an input
function submitAnswer() {
  $('form').on('click', '.submit-button', function(event) {
    event.preventDefault();
    // create variable for checked answer
    answerSelected = $( "input:checked" ).val();
      // toggleClass for form-button to nextQuestion
    $('form button').removeClass('submit-button');
    $('form button').addClass('nextQuestion');
    $('form button').text('next question');
     // remove question div
    $('.Question').css('display', 'none');
    //$('.submit-button').css('display', 'none');
      checkAnswer();
      selectedAnswer();
      triviaDisplay();
    console.log('`submitAnswer` just ran');
  })
}

// when user clicks to submit answer
function triviaDisplay() {
  $('.trivia').text(STORE[questionNumber].trivia);
  $('.trivia').css('display', 'block');
  console.log('`triviaDisplay` just ran');
}
let currentAnswerCorrectOrIncorrect = '';

function checkAnswer() {
  $('.correctOrIncorrect').css('display', 'block');
  if ( answerSelected === STORE[questionNumber].correctAnswer){
    currentAnswerCorrectOrIncorrect = 'correct!';
    let selectedAnswerLabel = $( "input:checked" ).closest('label');
    $('.correctOrIncorrect').css('color', '#80E2AD');
    $('.correctOrIncorrect').css('text-shadow', '0 0 3px #111');
    $(selectedAnswerLabel).addClass('correct');
    updateScore();
  }
  else {
    currentAnswerCorrectOrIncorrect = `incorrect`;
    $('.correctedAnswer').text(`the correct answer is ${STORE[questionNumber].correctAnswer}`);
    $('.correctOrIncorrect').css('color', 'red');
    $('.correctOrIncorrect').css('text-shadow', '0 0 4px #fff');
  }
  $('.correctOrIncorrect').text(currentAnswerCorrectOrIncorrect);
  console.log('`checkAnswer` just ran');
}

function selectedAnswer() {
  console.log('`selectedAnswer` ran');
  //$('.submit-button').css('display', 'none');
  $('.nextQuestion').css('display', 'block');
  renderSolution();
  createNextQuestion();
}

function renderSolution() {
  let selectedAnswerLabel = $( "input:checked" ).closest('label');
  $(selectedAnswerLabel).removeClass('answer-option');
  $(selectedAnswerLabel).addClass('selected');
  $('.answer-option').css('opacity', '.3');
  renderScore();
  console.log('`renderSolution` just ran');
}

function createNextQuestion() {
  // $('.Questions-Answers').css('background-color', 'black');
  $('.nextQuestion').click(function(event){
    event.preventDefault();
    $('form button').removeClass('nextQuestion');
    $('form button').addClass('submit-button');
    $('form button').text('submit');
    console.log('`createNextQuestion` is running');
    $('.nextQuestion').css('display', 'none');
    changeQuestionNumber();
    questionGenerator();
  });
}
function endOfGame() {
  console.log('`endOfGame` ran');
  reloadGame();
  $('.question-number').text(questionNumber);
  $('form').html(`<fieldset>
    <button type="submit" class="restart-quiz" name="button">Restart the Quiz</button>
  </fieldset>`);
  if( currentScore > 7){
    $('.final-score').html(`<span>Congratulations!<br>Your Final Score is <br><span class="final-score-display"> ${currentScore}</span><br>You are truly a Jedi Master!</span>`)
  }
  else {
    $('.final-score').html(`<span>Maybe You should watch the movies again<br>Your Final Score is<br><span class="final-score-display"> ${currentScore}</span><br>Better luck next time. <br>Click below to play again</span>`)
  }
}
function reloadGame() {
  // this function isn't working!!!!
  $('.restart-quiz').on('click', function(){
    // event.preventDefault();
    questionNumber = 0;
    currentScore = 0;
    // remove start button
    $('.final-score').css('display', 'none');
    // remove 'should we start' text
    $('.test-tracker').css('display', 'block');
    // begin question number display at 1
    $('.question-number').text('1');
    // display test tracker
    alert ('reboot');
    console.log('`reload game` ran')
    // run question generator
    questionGenerator();
  })
}
function createQuiz() {
  startQuiz();
  submitAnswer();
  //createQuestion();
  // selectedAnswer();
  // createNextQuestion();
}
$(createQuiz);
/*
Here are a few ways that I think this quiz can improve in order to make it an even stronger portfolio piece:


While not directly related to your code, you need a README for this (and every other) project you work on. It's a best practice and an industry standard. Employers won’t look at a project as fully complete or polished if it is missing aREADME. Content for the README can include things like the reason behind the app, technologies used, screen shots of the app, challenges encountered and overcome throughout the development process, etc.

Finally, I noticed that you are using a full window reload to take the user back to the start of the quiz, and while this technically works, it's not necessarily the best way it could be done. Refreshes are an expensive operation, especially in larger applications where you may have to make several database calls in order to grab the data you need and render it to the browser again.

Reloads can also hinder the overall user experience, as your users have to wait a few seconds for everything to finish rendering. Instead, you can perform the operations through DOM manipulation, which will give you a chance to show off more of your jQuery skills, as well as create a smoother user flow.
*/

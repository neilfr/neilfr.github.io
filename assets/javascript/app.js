var rights;
var wrongs;
var unanswered;
var questionNumber;
var myInterval;

// load question bank.  Questions sourced from https://pleated-jeans.com and modified for this form factor.
var trivia =[
    {
        question:"Justin Bieber is thrown horizontally at 10.0m/s from the back of a plane travelling at 700km/h at 20,000ft.  What is Justin’s velocity at the time of impact?",
        optionA:"Pi * radius ^ 2",
        optionB:"Somewhere between 200 to 500km/h depending on the angle of his body position",
        optionC:"What?!?",
        optionD:"You shouldn’t throw people from a plane!",
        answer:"B",
    },{
        question:"If your car begins to hydroplane you should immediately:",
        optionA:"Remove your foot from the accelerator and let the car decelerate",
        optionB:"Pump the brakes repeatedly",
        optionC:"Slam your foot firmly on the brakes",
        optionD:"Do nothing and allow your car to turn into the plane it has always dreamed of being",
        answer:"A",
    },{
        question:"Rick Astley is never gonna:",
        optionA:"Give you up",
        optionB:"Let you down",
        optionC:"Make you cry, hurt you",
        optionD:"All of the above",
        answer:"D",
    },{
        question:"The Titanic was powered by:",
        optionA:"Thousands of hamsters running inside little wheels",
        optionB:"The rowing of the third class passengers",
        optionC:"16 giant steam boilers",
        optionD:"The crew members 'hocking lugies' off the stern all at once",
        answer:"C",
    },{
        question:"The eerie sense of having previously experienced a situation is known as:",
        optionA:"The serial position effect",
        optionB:"Mood-congruent memory",
        optionC:"Source amnesia",
        optionD:"Deja vu",
        answer:"D",
    },{
        question:"The eerie sense of having previously experienced a situation is known as:",
        optionA:"The serial position effect",
        optionB:"Mood-congruent memory",
        optionC:"Source amnesia",
        optionD:"Deja vu",
        answer:"D",
    },{
        question:"Stand up and yell your favourite color, the street you live on, and your lucky number!",
        optionA:"Mission accomplished!",
        optionB:"I'm too shy",
        optionC:"I'm not even reading these questions, I'm just picking at random",
        optionD:"What are you crazy?!?",
        answer:"A",
    },{
        question:"This author is tired of making questions... so if you made it this far, choose 'C' to get this one correct! Peace out...",
        optionA:"No, not this one",
        optionB:"Keep going...",
        optionC:"Yup, right here",
        optionD:"Too far! Too far! Backup!",
        answer:"C",
    }
];

// show the start screen
function showStartScreen(){
    $('.questionScreen').hide();
    $('.answerScreen').hide();
    $('.statScreen').hide();
    $('.startScreen').show();
}

// show the question screen
function showQuestionScreen(){
    $('#correctAnswer').html(""); //make sure old posted answers are cleared
    $('.startScreen').hide();
    $('.answerScreen').hide();
    $('.statScreen').hide();
    $('.questionScreen').show();
}

// show the answer screen
function showAnswerScreen(){
    $('.startScreen').hide();
    $('.questionScreen').hide();
    $('.statScreen').hide();
    $('.answerScreen').show();
}

// setup the end of game statistics screen
function showStatScreen(){
    $('.startScreen').hide();
    $('.questionScreen').hide();
    $('.answerScreen').hide();
    $('.statScreen').show();
    $('#correctAnswers').html("Correct Answers: "+rights);
    $('#incorrectAnswers').html("Incorrect Answers: "+wrongs);
    var unanswered = trivia.length-(rights+wrongs);
    $('#unanswered').html("Unanswered: "+unanswered);
}

// display (ask) a trivia question
function askQuestion(number){
    $('#question').html(trivia[number].question);
    $('#A').html(trivia[number].optionA);
    $('#B').html(trivia[number].optionB);
    $('#C').html(trivia[number].optionC);
    $('#D').html(trivia[number].optionD);
}

// ask the next question unless you are at the end of the question bank
function nextQuestion(){
    questionNumber++;
    console.log("question number is: "+questionNumber);
    var temp=trivia.length-1;
    console.log("trivia.length -1 is: "+temp);
    if (questionNumber<(trivia.length)){  // we are not at the end of the question bank
        askQuestion(questionNumber);
        questionCountdown();
        showQuestionScreen();
    }else{ //we are at the end of the question bank
        console.log("we should be showing the stat screen");
        showStatScreen();
    }
}

// show the correct answer for the current question
function showCorrectAnswer(){
    switch (trivia[questionNumber].answer){
        case 'A':
            $('#correctAnswer').html("The correct answer is...<br>"+trivia[questionNumber].optionA);
            break;
        case 'B':
            $('#correctAnswer').html("The correct answer is...<br>"+trivia[questionNumber].optionB);
            break;
        case 'C':
            $('#correctAnswer').html("The correct answer is...<br>"+trivia[questionNumber].optionC);
        break;
        case 'D':
            $('#correctAnswer').html("The correct answer is...<br>"+trivia[questionNumber].optionD);
        break;
        default:
            console.log("something went wrong");
    }
}

// check if the answer is right or wrong, setup to display the appropriate response and increment the appropriate counter
function checkAnswer(number){
    if(event.target.id===trivia[number].answer){
        rights++;
        $('#answerStatus').html("You are correct!");
    }else{
        wrongs++;
        $('#answerStatus').html("Unfortunately, you are incorrect...<br>");
        showCorrectAnswer();
    }
}

// begin the game on the startScreen
showStartScreen();

// reset counters, setup the question, show the screen and start the countdown
$('#startButton').on('click', function(){
    rights=0;
    wrongs=0;
    unanswered=0;
    questionNumber=0;
    askQuestion(questionNumber);
    questionCountdown();
    showQuestionScreen();
});

// check if the selected answer is correct, display the answer, then go to the next question or the end of the game
$('.answer').on('click', function(){
    clearCountdown();
    checkAnswer(questionNumber);
    answerCountdown();
    showAnswerScreen();
});

// start a countdown for the answer screen; if the countdown expires, proceed to the next question
function answerCountdown(){
    var timer=3;
    myInterval = setInterval(function(){
     //   $('#countdown').html("Next question coming in... "+timer+"seconds!");
        if(timer===0){
            clearCountdown();
            nextQuestion();
        }else{
            timer--;
        }
    },1000)
}

// clear the current setinterval
function clearCountdown(){
    clearInterval(myInterval);
    $('#countdown').html(" ");
}

// start a countdown for the question screen; if the countdown expires, procees to the answer screen
function questionCountdown(){
    var timer=20;
        myInterval = setInterval(function(){
        $('#countdown').html("You have "+timer+" seconds to answer!");
        if(timer===0){
            $('#answerStatus').html("");
            clearCountdown();
            showCorrectAnswer();
            answerCountdown();
            showAnswerScreen();
        }else{
            timer--;
        }
    },1000)
}
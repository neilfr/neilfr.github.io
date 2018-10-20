/* set win & loss counters, word list and declare variables*/
var gameContinue=true;
var numberOfWins=0;
var numberOfLosses=0;
var wordList=[
    "bulldog",
    "beagle",
    "poodle",
    "pug",
    "boxer",
    "labrador",
    "doberman"
];
var lettersGuessed=[];
var lettersGuessedString;
var guessCounter;
var lettersSolved;
var secretWord;
var wordMaskString;
var wordMaskArray=[];

/* pick a random word from the word list */
function pickWord(arrayOfWords){
        var randomNumber = Math.floor(Math.random()*arrayOfWords.length)
        return arrayOfWords[randomNumber];
}

/* build the wordMaskString used to display the hidden version of the word */
function maskString(myWord){
    var mask = "";
    for(i=0;i<myWord.length;i++){
        mask+="_";
    }
    return mask;
}

/* build the wordMaskArray used to examine the characters of the secret word */
function maskArray(myWord){
    var mask = [];
    for(i=0;i<myWord.length;i++){
        mask[i]="_";
    }
    return mask;
}

/* reset counters, variables and pick a word to start a new round of the game */
function resetRound(){
    
    /* pick a secret word */
    secretWord=pickWord(wordList);

    /* display the secret word, for now - for testing only
    var myElement = document.getElementById('CurrentWord');
    myElement.innerHTML=secretWord;
    */

    /* create a mask for displaying what is revealed about the secret word */
    wordMaskString = maskString(secretWord);

    /* create an array for the mask for manipulation */
    wordMaskArray = maskArray(secretWord);

    /* display the masked version of the word */
    var myElement = document.getElementById('HiddenWord');
    myElement.innerHTML=wordMaskString;

    /* reset letters guessed and update the display */
    lettersSolved=0;
    lettersGuessed.length=0;
    lettersGuessedString=""; 
    var myElement = document.getElementById('LettersGuessed');
    myElement.innerHTML=lettersGuessedString;

    /* reset guesses remaining */
    guessCounter=0;
    guessesRemaining=10;
    var myElement = document.getElementById('GuessesRemaining');
    myElement.innerHTML=guessesRemaining;

    /* reset the guessedDog section */
    var myElement=document.getElementById('guessedDog');
            myElement.innerHTML="";
}

/* reset for the first round */
resetRound();

/* capture keypresses as guesses and update the page */
document.onkeypress = function (e) {

    if (gameContinue==true){

        
        /* check if pressed key is in the list of already guessed letters, if not, add it to the list of already guessed letters and update the display*/
        var pressedKeyCode = e.charCode;
        var stringKeyCode = String.fromCharCode(pressedKeyCode).toLowerCase();
        var alreadyGuessed = lettersGuessedString.indexOf(stringKeyCode.toUpperCase());
        console.log(stringKeyCode);
        console.log(lettersGuessedString);
        console.log("alreadyGuessed is equal to: "+alreadyGuessed);


        if(alreadyGuessed<0){ // IE. the letter has not already been guessed
            lettersGuessed[guessCounter]=stringKeyCode;
            lettersGuessedString+=stringKeyCode.toUpperCase()+", ";
            guessCounter++;
            var myElement = document.getElementById('LettersGuessed');
            myElement.innerHTML=lettersGuessedString.substring(0,lettersGuessedString.length-2);
        
            /* check if pressed key is in the secret word.  If it is, update the mask array with the guessed letter. */  
            var match=false;
            for(i=0;i<secretWord.length;i++){
                if(stringKeyCode==(secretWord.substring(i,i+1))){
                    wordMaskArray[i]=stringKeyCode;
                    match=true;
                    lettersSolved++;
                };
            }

            /* if pressed key is in the secret word, display the wordMask... otherwise decrement guessesRemaining and update the display */
            if (match){
                wordMaskString="";
                for(i=0;i<secretWord.length;i++){
                    wordMaskString+=wordMaskArray[i];
                }
                var myElement = document.getElementById('HiddenWord');
                myElement.innerHTML=wordMaskString;
            }else{
                guessesRemaining--;
                var myElement = document.getElementById('GuessesRemaining');
                myElement.innerHTML=guessesRemaining;
            }
                
            /* check if player ran out of guesses */
            if(guessesRemaining==0){
                var myElement=document.getElementById('guessedDog');
                myElement.innerHTML=
                '<p>YOU LOST!</p><br><br><p>Press Any Key To Continue</p>';
                numberOfLosses++;
                var myElement = document.getElementById('NumberOfLosses');
                myElement.innerHTML=numberOfLosses;
                
                gameContinue=false; //pause the game while win message is shown
            }

            if(lettersSolved==secretWord.length){
                var myElement=document.getElementById('guessedDog');
                myElement.innerHTML=
                '<p>YOU WIN!</p><br>'+
                '<img id="guessedDog" src="assets/images/'+secretWord+'.jpg" alt="beagle">'+
                '<br><br><p>Press Any Key To Continue</p>';
                numberOfWins++;
                var myElement = document.getElementById('NumberOfWins');
                myElement.innerHTML=numberOfWins;
                gameContinue=false; //pause the game while win message is shown
            } 
    
        }

       }else{

        gameContinue=true;
        resetRound();
    }
    
};
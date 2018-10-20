var wordList = [
    "Kinnick",
    "Fry",
    "Ferentz",
    "Wave",
    "CyHawk",
    "Floyd",
    "Fumble",
    "Touchdown",
    "Herky",
    "Rivalries",
    "Swarm"
];
var wordString = "";
var wordLettersArray = [];


var boardState = {
    pressToStart: "Press SPACEBAR to begin the game!",
    notSpacebar: "Please press SPACEBAR!",
    pressToGo: "Guess any letter key.",
    notALetter: "That is not a letter. Try again.",
    alreadyGussed: "You already tried that one! Please guess another letter.",
    gotIt: "Great you got that one! Please guess another letter.",
    missedIt: "You missed that one. Please guess another letter.",
    gameOver: "You are out of guesses. Please press SPACEBAR to try again.",
    winGame: "CONGRADULATIONS!!! You have won the game!! Press SPACEBAR to play again.",
    alreadyMissed: "You tried that one and missed already! Please guess another letter."
};

var state = {
    active: false,
    gameOver: false
};
var wins = 0;
writeWins(wins);
var guessesLeft = 10;
writeGussesLeft(guessesLeft);
var lettersGussed = [];
var keypress = "";
var hiddenArray = [];
var hiddenWord = "";
writeToScreen(boardState.pressToStart);


function writeToScreen(boardState) {
    document.getElementById('messageBoard').textContent = boardState;
}
function writeGussesLeft(guess) {
    document.getElementById('guessCount').textContent = guessesLeft + "0";
}
function writeWins(win) {
    document.getElementById('winCount').textContent = wins;
}
function nextGame() {
    writeToScreen(boardState.pressToGo);
    writeGussesLeft(guessesLeft);
    writeWins(wins);
    selectRandomWord(wordList);
    }

document.onkeyup = function(event) { 
    keypress = event.key ;
        if (keypress != " " && (!(state.active))) { 
        writeToScreen(boardState.notSpacebar);
        return;
    } else if (!(state.active)) {
            state.active = true;
            nextGame();
                return;
    } 
    else if (!(isLetter(keypress))){
        writeToScreen(boardState.notALetter);
               return;
    }
    if (wordLettersArray.indexOf(keypress) !== -1) { 
        var index = "";
        index = wordLettersArray.indexOf(keypress);   
        for (i = index; i < hiddenArray.length; i++) { 
            if (wordLettersArray[i] == keypress) { 
                hiddenArray[i] = keypress;
                fillSpaces(hiddenArray);  
            }
        }
        if (countInArray(hiddenArray, keypress) >= 1) { 
            writeToScreen(boardState.gotIt);
            if ((writeGuess(keypress))) {
                }
    
        } 

    }
    
    else {
               if ((lettersGussed.indexOf(keypress) == -1) && (guessesLeft > 0)) {
            guessesLeft--;
            writeGussesLeft(guessesLeft);
            writeToScreen(boardState.missedIt);
          writeGuess(keypress);
                    }
        else {
            writeGuess(keypress);
        }

    }
}


function selectRandomWord(wordArray) {
    var selectedWord = Math.floor(((Math.random()) * wordArray.length));
    wordString = wordList[selectedWord].toLowerCase();
    word2Array(wordString);
    blankSpaces(wordLettersArray);
    return wordString;
}

function word2Array(motoBrand) {
    wordLettersArray = motoBrand.split("");
    return wordLettersArray;
}

function blankSpaces(lettersArray) {
    for (i = 0; i < lettersArray.length; i++) {
        hiddenArray.push("_");
        fillSpaces (hiddenArray);
    } 
}
// Check if input is a letter
function isLetter(str){
    str = str.toLowerCase();
    return str.length === 1 && str.match(/[a-z]/i);
}
// Hold already gussed letters
function writeGuess(keypress){
    if (lettersGussed.indexOf(keypress) !== -1){
        writeToScreen(boardState.alreadyGussed);
        return false;
    } else {
        lettersGussed.push(keypress);
        var gussedStr = lettersGussed.join(", ")
        document.getElementById('lettersGuessed').textContent = gussedStr.toLocaleUpperCase();
        return true;
    }
}

function fillSpaces(hiddenArray) {
    hiddenWord = hiddenArray.join(" ");
    document.getElementById('hiddenWord').textContent = hiddenWord.toLocaleUpperCase();
}

function countInArray(array, letter) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {localStorage
        if (array[i] === letter) {
            count++;
        }
    }
    console.log("countInArray is: " + count );
    return count;
}

  $("#clear").on("click", function() {
    $("#display").empty();
 })

 
  
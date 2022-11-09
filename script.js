let number = document.querySelector("#number");
let play = document.querySelector("#play");
let reponse = document.querySelector("#reponse");
let replay = document.querySelector("#replay");
let maxtry = 20;
const NO_OF_HIGH_SCORES = 10;
const HIGH_SCORES = 'highScores';

function changeDifficulty(diff)
{
    if(diff == 'easy'){
        maxtry = 150
    }
    else if(diff == 'normal'){
        maxtry = 20
    }
    else{
        maxtry = 5
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

let trueNumber = getRandomInt(100);
console.log(trueNumber);
let compt = 0;

function compare() {

    compt++;

    if (compt < maxtry || number.value == trueNumber) {
        if (number.value <= 100 && number.value >= 0 && number.value != "") {

            if (number.value < trueNumber) {
                reponse.innerHTML = "C'est plus";
            }

            else if (number.value > trueNumber) {
                reponse.innerHTML = "C'est moins";
            }

            else if (number.value == trueNumber) {
                reponse.innerHTML = "Bravo, le nombre est bien " + trueNumber + "<br>Vous avez réussi en " + compt + " tentative(s)";
                replay.style.opacity = 1;
                gameOver(compt);
            }
        }

        else {
            alert('Choisissez un nombre entre 0 et 100');
        }
    }

    
    else {
        alert('Game Over ! Le nombre était ' + trueNumber);
        number.classList.add("disabled");
        play.classList.add("disabled");
        replay.style.opacity = 1;
    }

    number.value = "";

}

function checkHighScore(score) {
    const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
    const lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.score ?? 0;
    
    if (score > lowestScore) {
      saveHighScore(score, highScores);
      showHighScores();
    }
  }

  function gameOver(score) {
    // Other game over logic.
    checkHighScore(score);
  }

  function saveHighScore(score, highScores) {
    const name = prompt('You got a highscore! Enter name:');
    const newScore = { score, name };
    
    // 1. Add to list
    highScores.push(newScore);
  
    // 2. Sort the list
    highScores.sort((a, b) => a.score - b.score);
    
    // 3. Select new list
    highScores.splice(NO_OF_HIGH_SCORES);
    
    // 4. Save to local storage
    localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));
  };

  function showHighScores() {
    const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
    const highScoreList = document.getElementById(HIGH_SCORES);
    
    highScoreList.innerHTML = highScores
      .map((score) => `<li>${score.score} - ${score.name}`)
      .join('');
  }

function reload() {
    replay.style.opacity = 0;
    document.location.reload(true);
}


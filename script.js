var myPoints = 100;

function updateMyPoints(points) {

    myPoints = points;
    var statusBar = document.querySelector("#statusBar");
    statusBar.style.width = points + "%";

    if(myPoints < 1) {
        alert("Game over!");
        window.location.reload();
    }

}

//assigning background music and gunshot sounds
var myGunSound = new Audio('laser_sound.mp3');
var enemyGunSound = new Audio('enemy_sound.mp3');
var music = new Audio("backMusic.mp3")

music.loop = true;

//creating a function that identify how many livinig enemies that attacks me
function activeEnemies() {
    return document.querySelectorAll(".enemy:not(.dead)");
}

function Shoot(enemy) {
    enemy.classList.add("dead");

    if(!activeEnemies().length) {
        alert("You win!");
        window.location.reload();
    }

}
//when enemy attacks me 
function enemyAttack(enemy) {
//check for my points 
    if(myPoints > 0) {

        enemy.classList.add("showing");

        setTimeout(()=> {
            enemyShoots(enemy);
        }, 1000);// enemy shoots after 1 second

        setTimeout(()=> {
            enemy.classList.remove("showing");
        }, 3000);// enemy hides after 3 seconds of showing
        
    }

}
// enemy shooting at me 
function enemyShoots(enemy) {
	enemyGunSound.play();
    if(!enemy.classList.contains("dead")) {

        enemy.classList.add("shooting");
        updateMyPoints(myPoints - 20);

        setTimeout(()=> {
            enemy.classList.remove("shooting");
        }, 200);

    }

}
//unexpected attack from my enemies
function randomAttacks() {

    var randomEnemyNo = Math.random() * activeEnemies().length;
    randomEnemyNo = Math.floor(randomEnemyNo);
    var enemy = activeEnemies()[randomEnemyNo];

    var randomDelay = Math.random() * 2000 + 1000;

    setTimeout( ()=> {
        enemyAttack(enemy);
        randomAttacks();
    }, randomDelay);// displays a random attacks between 1 & 3 seconds in a random delay

}
function newGame() {
    randomAttacks()
    document.querySelector("button").style.display = "none";
	music.play();
}

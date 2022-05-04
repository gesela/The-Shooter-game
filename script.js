var myPoints = 100;

function updateHealthPoints(points) {

	myPoints = points;
	var healthBar = document.querySelector("#myHealthStatus");
	healthBar.style.width = points + "%";

	if(myPoints < 1) {
		alert("Game over!");
		window.location.reload();
	}

}


function livingEnemies() {
	return document.querySelectorAll(".enemy:not(.dead)");
}


function Shoot(enemy) {
	enemy.classList.add("dead");

	if(!livingEnemies().length) {
		alert("You win!");
		window.location.reload();
	}

}


function enemyAttacksMe(enemy) {

	if(myPoints > 0) {

		enemy.classList.add("showing");

		setTimeout(()=> {
			enemyShootsMe(enemy);
		}, 1000);

		setTimeout(()=> {
			enemy.classList.remove("showing");
		}, 3000);
		
	}


}


function enemyShootsMe(enemy) {

	if(!enemy.classList.contains("dead")) {

		enemy.classList.add("shooting");
		updateHealthPoints(myPoints - 20);

		setTimeout(()=> {
			enemy.classList.remove("shooting");
		}, 200);

	}

}


function randomEnemyAttacks() {

	var randomEnemyNo = Math.random() * livingEnemies().length;
	randomEnemyNo = Math.floor(randomEnemyNo);
	var enemy = livingEnemies()[randomEnemyNo];

	var randomDelay = Math.random() * 2000 + 1000;

	setTimeout( ()=> {
		enemyAttacksMe(enemy);
		randomEnemyAttacks();
	}, randomDelay);

}









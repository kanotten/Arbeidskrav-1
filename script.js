//Stats for heroes
let heroesArray = [
    {
      id: 0,
      name: "Henriette Healer",
      maxHP: 400,
      currentHP: 400,
      damage: 100,
      alive: true,
    },
    {
      id: 1,
      name: "Ariana archer",
      maxHP: 500,
      currentHP: 500,
      damage: 400,
      alive: true,
    },
    {
      id: 2,
      name: "Wyona Warrior",
      maxHP: 600,
      currentHP: 600,
      damage: 400,
      alive: true,
    },
  ];

  let dragonObject = {
    name: "Daar Dragon",
    maxHP: 2000,
    currentHP: 2000,
    damage: 200,
    alive: true,
  };

  document.addEventListener("DOMContentLoaded", function () {
    // Get the healer image element
    const healerImg = document.querySelector(".img-container.healer img");

    // Get elements for health bars and texts
    const dragonHealthBar = document.querySelector(".dragon-health");
    const healerHealthBar = document.querySelector(".healer-health");
    const archerHealthBar = document.querySelector(".archer-health");
    const warriorHealthBar = document.querySelector(".warrior-health");
    const dragonHealthTxt = document.querySelector(".dragon-health-txt");
    const healerHealthTxt = document.getElementById("healer-health-txt");
    const archerHealthTxt = document.getElementById("archer-health-txt");
    const warriorHealthTxt = document.getElementById("warrior-health-txt");

    function UpdateAllHealthBars() {
      // Update health bars and texts
      dragonHealthBar.style.width = `${
        (dragonObject.currentHP / dragonObject.maxHP) * 100
      }%`;

      function SetHealthBar(hero, bar) {
        var life = hero.currentHP / hero.maxHP;
        var pixels = life * 300;
        bar.style.width = `${pixels}px`;
      }

      SetHealthBar(heroesArray[0], healerHealthBar);
      SetHealthBar(heroesArray[1], archerHealthBar);
      SetHealthBar(heroesArray[2], warriorHealthBar);
    }

    // Add click event listener for the healer
    healerImg.addEventListener("click", function () {
      // Handle Henriette Healer's action
      if (heroesArray[0].alive && dragonObject.alive) {
        // Deal damage to the dragon
        dragonObject.currentHP -= heroesArray[0].damage;
        if (dragonObject.currentHP < 0){
            dragonObject.currentHP = 0;
        }

        // Limit healing to 100 HP and only heal alive heroes
        heroesArray.forEach((hero) => {
          if (hero.alive) {
            const healAmount = Math.min(100, hero.maxHP - hero.currentHP);
            hero.currentHP += healAmount;
          }
        });

        UpdateAllHealthBars();

        // Update health texts
        dragonHealthTxt.innerText = `${dragonObject.currentHP} / ${dragonObject.maxHP} HP`;
        healerHealthTxt.innerText = `${heroesArray[0].currentHP} / ${heroesArray[0].maxHP} HP`;
        archerHealthTxt.innerText = `${heroesArray[1].currentHP} / ${heroesArray[1].maxHP} HP`;
        warriorHealthTxt.innerText = `${heroesArray[2].currentHP} / ${heroesArray[2].maxHP} HP`;

        // Check game status
        // Function to check and display game status
        function checkGameStatus() {
          const resultDiv = document.createElement("div");
          const heading = document.createElement("h1");

          if (!dragonObject.alive) {
            heading.innerText = "Congratulations! You defeated the dragon!";
            resultDiv.className = "game-won";
          } else if (!heroesArray.some((hero) => hero.alive)) {
            heading.innerText = "Game Over! All heroes are defeated.";
            resultDiv.className = "game-lost";
          } else {
            // Game is still ongoing
            return;
          }

          // Append the result to the main container
          document.querySelector(".main-container").appendChild(resultDiv);
          resultDiv.appendChild(heading);
        }
      }
    });
  });

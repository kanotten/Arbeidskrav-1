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

// Get the healer image element
const healerImg = document.querySelector(".img-container.healer img");
const archerImg = document.querySelector(".img-container.archer img");
const warriorImg = document.querySelector(".img-container.warrior img");

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

function attackDragon(hero) {
  if (hero.alive && dragonObject.alive) {
    // Deal damage to the dragon
    dragonObject.currentHP -= hero.damage;
    if (dragonObject.currentHP < 0) {
      dragonObject.currentHP = 0;
    }

    // Display alert message
    alert(`${hero.name} har gjort skade på ${dragonObject.name}`);

    // Update health bars and texts
    UpdateAllHealthBars();
    dragonHealthTxt.innerText = `${dragonObject.currentHP} / ${dragonObject.maxHP} HP`;
    healerHealthTxt.innerText = `${heroesArray[0].currentHP} / ${heroesArray[0].maxHP} HP`;
    archerHealthTxt.innerText = `${heroesArray[1].currentHP} / ${heroesArray[1].maxHP} HP`;
    warriorHealthTxt.innerText = `${heroesArray[2].currentHP} / ${heroesArray[2].maxHP} HP`;
  }
}

// Add click event listeners for each hero // may not be the best way to add counter attack for dragon
healerImg.addEventListener("click", function () {
  attackDragon(heroesArray[0]);
  performDragonCounterAttack();
});

archerImg.addEventListener("click", function () {
  attackDragon(heroesArray[1]);
  performDragonCounterAttack();
});

warriorImg.addEventListener("click", function () {
  attackDragon(heroesArray[2]);
  performDragonCounterAttack();
});

function updateHeroHealth(hero, healthBar, healthText) {
  var life = hero.currentHP / hero.maxHP;
  var pixels = life * 300;
  healthBar.style.width = `${pixels}px`;
  healthText.innerText = `${hero.currentHP} / ${hero.maxHP} HP`;
}

// Funksjon for å hente helsestolpen til en helt basert på ID
function getHeroHealthBar(heroId) {
  switch (heroId) {
    case 0:
      return healerHealthBar;
    case 1:
      return archerHealthBar;
    case 2:
      return warriorHealthBar;
    default:
      // Hvis ID ikke samsvarer med noen helt, returner null eller håndter på annen måte
      return null;
  }
}

// Funksjon for å hente helse-teksten til en helt basert på ID
function getHeroHealthText(heroId) {
  switch (heroId) {
    case 0:
      return healerHealthTxt;
    case 1:
      return archerHealthTxt;
    case 2:
      return warriorHealthTxt;
    default:
      // Hvis ID ikke samsvarer med noen helt, returner null eller håndter på annen måte
      return null;
  }
}

// Funksjon for å håndtere dragens motangrep
function performDragonCounterAttack() {
  console.log("Dragon counter attack!");
  if (dragonObject.alive) {
    if (Math.random() < 1 / 3) {
      const randomHeroIndex = Math.floor(Math.random() * heroesArray.length);
      const randomHero = heroesArray[randomHeroIndex];
      console.log("Random Hero Index:", randomHeroIndex);
      console.log("Random Hero:", randomHero);

      if (randomHero.alive) {
        // Reduser heltenes liv basert på dragens skade
        randomHero.currentHP -= dragonObject.damage;

        // Sjekk om helten er død
        if (randomHero.currentHP <= 0) {
          randomHero.currentHP = 0;
          randomHero.alive = false;
        }

        updateHeroHealth(
          randomHero,
          getHeroHealthBar(randomHero.id),
          getHeroHealthText(randomHero.id)
        );
      }
    }
  }
}

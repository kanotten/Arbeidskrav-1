//Stats for heroes
let heroesArray = [
  {
    id: 0,
    name: "Henriette Healer",
    maxHP: 100,
    currentHP: 100,
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

// Get elements for health bars and texts
const dragonHealthBar = document.querySelector(".dragon-health");
const healerHealthBar = document.querySelector(".healer-health");
const archerHealthBar = document.querySelector(".archer-health");
const warriorHealthBar = document.querySelector(".warrior-health");

function UpdateAllHealthBars() {
  // Update health bars and texts
  dragonHealthBar.style.width = `${
    (dragonObject.currentHP / dragonObject.maxHP) * 100
  }%`;

  function SetHealthBar(hero, bar) {
    var life = hero.currentHP / hero.maxHP;
    var pixels = life * 100;
    bar.style.width = `${pixels}%`;
  }

  SetHealthBar(heroesArray[0], healerHealthBar);
  SetHealthBar(heroesArray[1], archerHealthBar);
  SetHealthBar(heroesArray[2], warriorHealthBar);
}

function updateHealthText() {
  const dragonHealthTxt = document.querySelector(".dragon-health-txt");
  const healerHealthTxt = document.getElementById("healer-health-txt");
  const archerHealthTxt = document.getElementById("archer-health-txt");
  const warriorHealthTxt = document.getElementById("warrior-health-txt");

  dragonHealthTxt.innerText = `${dragonObject.currentHP} / ${dragonObject.maxHP} HP`;
  healerHealthTxt.innerText = `${heroesArray[0].currentHP} / ${heroesArray[0].maxHP} HP`;
  archerHealthTxt.innerText = `${heroesArray[1].currentHP} / ${heroesArray[1].maxHP} HP`;
  warriorHealthTxt.innerText = `${heroesArray[2].currentHP} / ${heroesArray[2].maxHP} HP`;
}

function updateDragonHealth(damageMultiplier) {
  dragonObject.currentHP -= damageMultiplier;
  if (dragonObject.currentHP < 0) {
    dragonObject.currentHP = 0;
    dragonObject.alive = false;
    alert("you win");
  }
}

// heroes attack dragon
function performHeroAttack(hero) {
  if (!hero.alive) {
    console.log("hero is dead");
    return;
  }
  if (!dragonObject.alive) {
    console.log("dragon is dead");
    return;
  }

  updateDragonHealth(hero.damage);

  // alert(`${hero.name} har gjort skade på ${dragonObject.name}`);

  UpdateAllHealthBars();
  updateHealthText();
}

function HealHeroes() {
  for (let i = 0; i < heroesArray.length; i++) {

    if (!heroesArray[i].alive) {
      console.log("loop hero dead");
      console.log("life: " + heroesArray[i].currentHP);
      continue;
    }

    life = heroesArray[i].currentHP;
    console.log(life);
    if (life <= 0) {
      console.log("hero is dead");
      console.log("life: " + heroesArray[i].currentHP);
      return;
    }

    heroesArray[i].currentHP += 100;

    if (heroesArray[i].currentHP > heroesArray[i].maxHP) {
      // pay the taxes
      heroesArray[i].currentHP = heroesArray[i].maxHP;
    }
  }
}

function updateHeroHealth(hero, healthBar, healthText) {
  var life = hero.currentHP / hero.maxHP;
  var pixels = life * 300;
  healthBar.style.width = `${pixels}px`;
  healthText.innerText = `${hero.currentHP} / ${hero.maxHP} HP`;
}

// Funksjon for å håndtere dragens motangrep
function performDragonCounterAttack() {
  if (!dragonObject.alive) {
    console.log("Dragon is dead. ");
    return
  }
  console.log("Dragon counter attack!");

  const randomHeroIndex = Math.floor(Math.random() * heroesArray.length);

  if (heroesArray[randomHeroIndex].alive) {
    // Reduser heltenes liv basert på dragens skade
    heroesArray[randomHeroIndex].currentHP -= dragonObject.damage;

    // Sjekk om helten er død
    if (heroesArray[randomHeroIndex].currentHP <= 0) {
      heroesArray[randomHeroIndex].currentHP = 0;
      heroesArray[randomHeroIndex].alive = false;
    }

    UpdateAllHealthBars();
  }
}

function ButtonAttack(hero) {
  if (!hero.alive) {
    return;
  }
  HealHeroes();
  performHeroAttack(hero);
  performDragonCounterAttack();
  UpdateAllHealthBars();
  updateHealthText();
}

function addEventListeners() {
  const healerImg = document.querySelector(".img-container.healer img");
  const archerImg = document.querySelector(".img-container.archer img");
  const warriorImg = document.querySelector(".img-container.warrior img");

  healerImg.addEventListener("click", function () {
    ButtonAttack(heroesArray[0]);
  });
  archerImg.addEventListener("click", function () {
    ButtonAttack(heroesArray[1]);
  });
  warriorImg.addEventListener("click", function () {
    ButtonAttack(heroesArray[2]);
  });
}

function initialize() {
  addEventListeners();
  UpdateAllHealthBars();
  updateHealthText();
}

initialize();

// The Milky Way
// Imani Fodje
// 2/9/21
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// global variables
//   Constants
const MILKYWAYLENGTH = 100000;
//  not constants
let money = 1600;
let rationSize = "large";
let partyMemberCount;
let pace = "slow";
let distanceTravelledToday;
let totalDistanceTravelled;
let currentDisplay = 0;
let namesSet = false;
let promptsDone = false;

// images
let titleScreenImg;
let namingScreenImg;
let shopScreenImg;

// Buttons
// eslint-disable-next-line no-undef
let startButton = new Clickable();

// objects
//    SpaceShip

let spaceShip = {
  condition: "fine",
};
//   Resources
let food = {
  amount: 0,
  price: 5,
};
let spareSpaceSuits = {
  amount: 0,
  price: 20,
};
let spareParts = {
  amount: 0,
  price: 100,
};
let medicine = {
  amount: 0,
  price: 20,
};
//  Party Members
let memberOne = {
  health: 100,
  name: "you",
  isAlive: true,
  isSick: false,
  ailment: "none",
};
let memberTwo = {
  health: 100,
  name: "cheesetoast",
  isAlive: true,
  isSick: false,
  ailment: "none",
};
let memberThree = {
  health: 100,
  name: "bob",
  isAlive: true,
  isSick: false,
  ailment: "none",
};
let memberFour = {
  health: 100,
  name: "sally",
  isAlive: true,
  isSick: false,
  ailment: "none",
};
let memberFive = {
  health: 100,
  name: "little timmy",
  isAlive: true,
  isSick: false,
  ailment: "none",
};

// arrays
//  your party
let party = [memberOne, memberTwo, memberThree, memberFour, memberFive];
let alivePartyMembers = [];
// resources
let notMoneyResourceArray = [food, spareSpaceSuits, spareParts, medicine];
// conditions
let ailments = ["space snakebite", "dysentry", "space fever", "broken arm", "broken leg", "an infected cut", "deadly space disease"];
let displayArray = ["title screen", "naming screen", "store", "management screen", "journey screen", "EndGame"];

// preloading assets
function preload() {
  titleScreenImg = loadImage("assets/Title Screen.png");
  namingScreenImg = loadImage("assets/Naming Screen.png");
  shopScreenImg = loadImage("assets/Alien Icon.png");
}

// setup + draw
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  // setPartyMemberNames();
}

function draw() {
  displayScreen(displayArray[currentDisplay]);
}


// other functions
function displayScreen(kind) {
  switch (kind){
  case "title screen":
    displayTitleScreen();
    break;
  case "naming screen":
    displayNamingScreen();
    if (namesSet === false) {
      namingTime();
    }
    break;
  case "EndGame":
    fill("blue");
    rect(100, 100, 100, 100);
    break;
  case "management Screen":
    fill("red");
    break;
  case "journey screen":
  default:
    fill("green");
    break;
  case "store":
    displayShopScreen();
    if (promptsDone === false) {
      setTimeout(() => {
        initialPurchases();
      }, 1000);
      promptsDone = true;
    }
    break;
  }
}

function setPartyMemberName(member, num) {
  member.name = window.prompt("What's the name of party member #" + num + "?");
}

function isJourneyDone() {
  if (totalDistanceTravelled >= MILKYWAYLENGTH) {
    journeyComplete();
  }
  else {
    newRound();
  }
}

function decideDistanceTravelledEachRound() {
  let totalRoundDistance = 0;
  for (let i = 0; i<14; i++) {
    decideDistanceTravelledToday(pace);
    totalRoundDistance += distanceTravelledToday;
  }
  totalDistanceTravelled += totalRoundDistance;
}


function decideDistanceTravelledToday(speed) {

  switch (speed) {
  case "slow":
    distanceTravelledToday = random(200, 449);
    break;
  case "medium":
    distanceTravelledToday = random(450, 674);
    break;
  case "fast":
    distanceTravelledToday = random(675, 820);
    break;
  }
}

function newRound() {

}

function endRound() {
  checkForStarvation();
  for (let member of alivePartyMembers) {
    checkForillnessOrInjury(member, member.ailment);
    isPartyMemberDead(member);
  }
  countAlivePartyMembers();
  if (isPartyAlive()) {
    console.log("party alive");
    decideDistanceTravelledEachRound();
    if(!isJourneyDone()) {
      newRound();
    }
  }
}

function countAlivePartyMembers() {
  partyMemberCount = 0;
  alivePartyMembers = [];
  for (let member of party) {
    if (member.isAlive) {
      alivePartyMembers.push(member);
      partyMemberCount++;
    }
  }
}

function journeyComplete() {
  console.log("yay you won");
}

function isPartyAlive() {
  if (partyMemberCount !== 0) {
    return true;
  }
  else {
    return false;
  }
}

function spendMoney(resource, amount) {
  let totalPrice = resource.price*amount;
  if (money >= totalPrice) {
    money -= totalPrice;
    purchaseResources(resource, amount);
  }
  else {
    console.log("not enough money");
  }
}

function purchaseResources(resource, quantity) { 
  // have to use a synonym for amount since resource.amount is already a thing. don't wanna confuse myself
  resource.amount += quantity;
}

function foodEatenDaily(amount) {
  for (let member of party) {
    if (member.isAlive === true) {
      switch (amount) {
      case "small":
        food.amount -= 2;
        break;
      case "medium":
        food.amount -= 3;
        break;
      case "large":
        food.amount -= 4;
        break;
      }
    }
  }
}

function isPartyMemberDead(member) {
  if (member.health <= 0) {
    member.isAlive = false;
  }
}

function checkForillnessOrInjury(member, condition) {
  if (member.isSick === true) {
    switch (condition) {
    case "space snakebite":
    case "infected":
      member.health -= 5;
      break;
    case "space fever":
      member.health -= 3;
      break;
    case "broken arm":
    case "broken leg":
      member.health -= 7;
      break;
    case "dysentry":
      member.health -= 10;
      break;
    case "deadly space disease":
      member.health -= 15;
      break;
    }
  }
}

function checkForStarvation() {
  if (food.amount <= 0) {
    for (let member of alivePartyMembers) {
      member.health -= random(5, 13);
    }
  }
}

function giveIllnessorInjury(member, condition) {
  member.isSick = true;
  member.ailment = condition;
}

function randomUnfortunateEvent() {
  let possibleEvents = ["ailment", "dumb mistake", "collision", "accident"];
  let event = random(possibleEvents);
  let collisionType = ["another spaceship", "an asteroid"];
  let injuryArray = ["broken arm", "broken leg", "infected cut"];

  switch (event) {
  case "ailment":
    giveIllnessorInjury(random(party), random(ailments));
    break;
  case "dumb mistake":
    makeADumbMistake();
    break;
  case "collision":
    spaceShipCollisionHappens(random(collisionType));
    break;
  case "accident":
    anAccidentHappens(random(alivePartyMembers), random(injuryArray));
    break;
  }
}

function makeADumbMistake() {
  let possibleMistakes = ["left door open", "brings radioactive rock on spaceship"];
  let mistake = random(possibleMistakes);

  countAlivePartyMembers();
  // no declaring things in cases apparently :/
  let tempResourceArray = [money, food, spareSpaceSuits, spareParts, medicine]; 
  let tempResource;
  let tempResourceAmountLost;
  // let numOfLightYearsLost;
  let thatMember = random(alivePartyMembers);
  switch (mistake) {
  case "left door open":
    tempResource = random(tempResourceArray);
    if (tempResource === money) {
      tempResourceAmountLost -= random(1, 100);
      money -= tempResourceAmountLost;
    }
    else {
      tempResourceAmountLost -= random(1, 100);
      tempResource.amount -= tempResourceAmountLost;
    }
    console.log("Uh oh, " + thatMember.name + " left the door open! You've lost " + tempResourceAmountLost + tempResource + ".");
    break;
  // case "read map upside down":
  //   numOfLightYearsLost = random(1, 200);
  //   totalDistanceTravelled -= numOfLightYearsLost;
  //   console.log("Uh oh, " + thatMember.name + " read the map upside down! You've backtracked " + numOfLightYearsLost + "light years.");
  //   break;
  case "brings radioactive rock on spaceship":
    for (let member of alivePartyMembers) {
      member.health -= random(1, 5);
    }
    console.log("Uh oh, " + thatMember.name + "brought a radioactive rock on the spaceship! You've all lost a little bit of health.");
    break;
  }
}

function spaceShipCollisionHappens(typeOfCollision) {
  let num;
  let numResourceLost;
  let resourceLost;
  let injuryArray = ["broken arm", "broken leg", "infected cut"];
  let injury;
  let affectedMember;

  switch (typeOfCollision) {
  case "another spaceship":
    num = random(1, 100);
    if (num < 50) {
      spaceShip.condition = "needs repairing";
    }
    num = random(1, 100);
    if (num < 25) {
      resourceLost = random(notMoneyResourceArray);
      numResourceLost = random(1, resourceLost.amount);
      resourceLost.amount -= numResourceLost;
    }
    num = random(1, 100);
    if (num < 10) {
      injury = random(injuryArray);
      affectedMember = random(alivePartyMembers);
      giveIllnessorInjury(affectedMember, injury);
    }
    num = random(1, 100);
    if (num < 3) {
      affectedMember = random(alivePartyMembers);
      affectedMember.health = 0;
      isPartyMemberDead(affectedMember);
    }
    console.log("Uh oh, you crashed into another spaceship! This is what happened:" + spaceShip.condition + resourceLost + numResourceLost + affectedMember + injury + affectedMember + affectedMember.isAlive);
    break;
  case "asteroid":
    num = random(1, 100);
    if (num < 95) {
      spaceShip.condition = "needs repairing";
    }
    num = random(1, 100);
    if (num < 75) {
      resourceLost = random(notMoneyResourceArray);
      numResourceLost = random(1, resourceLost.amount);
      resourceLost.amount -= numResourceLost;
    }
    num = random(1, 100);
    if (num < 50) {
      injury = random(injuryArray);
      affectedMember = random(alivePartyMembers);
      giveIllnessorInjury(affectedMember, injury);
    }
    num = random(1, 100);
    if (num < 15) {
      affectedMember = random(alivePartyMembers);
      affectedMember.health = 0;
      isPartyMemberDead(affectedMember);
    }
    console.log("Uh oh, you crashed into an asteroid! This is what happened:" + spaceShip.condition + resourceLost + numResourceLost + affectedMember + injury + affectedMember + affectedMember.isAlive);
    break;
  }
}

function anAccidentHappens(member, injury) {
  giveIllnessorInjury(member, injury);
  console.log("Uh oh, there was an accident! Now" + member + "has" + injury + ".");
}

function doesSpaceShipNeedRepairing() {
  return spaceShip.condition === "needs repairing";
}

function repairSpaceShip() {
  if (spaceShip.condition === "needs repairing" && spareParts > 0) {
    spareParts--;
    spaceShip.condition = "fine";
  }
}

// displays
function displayTitleScreen() {
  image(titleScreenImg, 0, 0, windowWidth, windowHeight);
  fill("white");
  startButton.draw();
  startButton.locate(250, 524);
  startButton.resize(250, 50);
  startButton.text = "START";
  startButton.onOutside = function() {
    startButton.color = "#FFFFFF";
    startButton.textColor = "#000000";
  };
  startButton.onHover = function() {
    startButton.color = "#FF0000";
    startButton.textColor = "#FFFFFF";
  };
  startButton.onPress = function() {
    currentDisplay = 1;
    displayScreen(displayArray[1]);
  };
}

function displayNamingScreen() {
  image(namingScreenImg, 0, 0, windowWidth, windowHeight);
  sleep(1000);
  fill("white");
  textSize(28);
  text("You're getting ready to set out for your long journey across the galaxy!", windowWidth/8, windowHeight/6* 3.5);
  text("Now, who's a part of your team?", windowWidth/8, windowHeight/6 * 4);
}

function displayShopScreen() {
  image(shopScreenImg, 0, 0, windowWidth, windowHeight);
}

function namingTime() {
  setPartyMemberName(memberOne, 1);
  setPartyMemberName(memberTwo, 2);
  setPartyMemberName(memberThree, 3);
  setPartyMemberName(memberFour, 4);
  setPartyMemberName(memberFive, 5);
  window.alert("Your party is: " + memberOne.name + ", " + memberTwo.name + ", " + memberThree.name + ", " + memberFour.name + ", and " + memberFive.name + ".");
  namesSet = true;
  currentDisplay = 2;
  displayScreen(currentDisplay);
}

function initialPurchases() {
  let quantity = window.prompt("You have " + money + "$. How much food do you want to buy? A pound costs 5$. (Recommended: at least 1800 pounds)");
  if (quantity === null || quantity < 0) {
    quantity = 0;
  }
  purchaseResources(food, quantity);
  let quantity2 = window.prompt("You have " + money + "$.How many extra space suits do you want to buy? 20$ for 1. (Recommended: at least 5)");
  if (quantity2 === null || quantity2 < 0) {
    quantity2 = 0;
  }
  purchaseResources(spareSpaceSuits, quantity2);
  let quantity3 = window.prompt("You have " + money + "$.How many spare parts do you want to buy for your spaceship? 100$ for 1. (Recommended: at least 2)");
  if (quantity3 === null || quantity3 < 0) {
    quantity3 = 0;
  }
  purchaseResources(food, quantity3);
  let quantity4 = window.prompt("You have " + money + "$. How much medicine do you want to buy? 20$ for 1. (HIGHLY RECOMMENDED: at the very minimum 5)");
  if (quantity4 === null || quantity4 < 0) {
    quantity4 = 0;
  }
  purchaseResources(medicine, quantity4);
  promptsDone = true;
  currentDisplay = 0;
  displayScreen(displayArray[currentDisplay]);
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
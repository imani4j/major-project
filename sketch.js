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
let money = 0;
let rationSize = "medium";
let partyMemberCount;
let pace = "medium";
let distanceTravelledToday;
let totalDistanceTravelled;

// objects
//   Resources
let food = {
  amount: 0,
  price: 50,
};
let spareSpaceSuits = {
  amount: 0,
  price: 100,
};
let spareParts = {
  amount: 0,
  price: 500,
};
let medicine = {
  amount: 0,
  price: 0,
};
//  Party Members
let memberOne = {
  health: 100,
  name: "you",
  isAlive: true,
  isSick: false,
};
let memberTwo = {
  health: 100,
  name: "cheesetoast",
  isAlive: true,
  isSick: false,
};
let memberThree = {
  health: 100,
  name: "bob",
  isAlive: true,
  isSick: false,
};
let memberFour = {
  health: 100,
  name: "sally",
  isALive: true,
  isSick: false,
};
let memberFive = {
  health: 100,
  name: "little jimmy",
  isAlive: true,
  isSick: false,
};

// arrays
//  your party
let party = [memberOne, memberTwo, memberThree, memberFour, memberFive];

// setup + draw
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  countAlivePartyMembers();
}

// other functions

function isJourneyDone() {
  if (totalDistanceTravelled >= MILKYWAYLENGTH) {
    journeyComplete();
  }
  else {
    newRound();
  }
}

function decideDistanceTravelledEachRound() {
  decideDistanceTravelledToday(pace);
}


function decideDistanceTravelledToday(speed) {

  switch (speed) {
  case "slow":
    distanceTravelledToday = random(200, 449);
    break;
  case "medium":
  default:
    distanceTravelledToday = random(450, 674);
    break;
  case "fast":
    distanceTravelledToday = random(675, 820);
    break;
  }
}

function newRound() {

}

function countAlivePartyMembers() {
  partyMemberCount = 0;
  for (let member of party) {
    if (member.isAlive) {
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
    console.log("not enough");
  }
}

function purchaseResources(resource, amount) {

}
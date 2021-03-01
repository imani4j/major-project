// The Milky Way but its only the hunting minigame
// Imani Fodje
// Cow and Alien Sprites by Kayla Fodje
// BG MUSIC BY Fupi
// sound affects by MedicineStorm at http://superpowers-html5.com/ 
// Moo sounds made with Eleanor Forte Lite (Synthesizer V Studio Basic)
// 2/9/21
//
// Extra for Experts:
// does all the time i spent on my original idea count
// i made the cows moo

// global variables
//   Constants
const HALFSIZE = 20;
// eslint-disable-next-line no-undef
let startButton = new Clickable();

//  not constants
let cow1Img;
let cow2Img;
let alien1Img;
let alien2Img;
let alien3Img;
let alien4Img;
let titleScreenImg;
let currentDisplay = 0;
let waitTime = 2000;
let lastSpawnTime = 0;
let bgMusic;
let sound1;
let moo1;
let moo2;
let moo3;
let score=0;

// Arrays
let theBullets = [];
let theSpaceCows = [];
let displayArray = ["title screen", "game"];
let mooMooCowArray = [1, 2];

// Objects
let player = {
  x:0,
  y:0,
  speed:1,
  direction: "up",
  wid: 30,
  hei: 30,
};

// preload + setup + draw
function preload() {
  titleScreenImg = loadImage("assets/Title Screen.png");
  alien1Img = loadImage("assets/alienspriteback.png");
  alien2Img = loadImage("assets/alienspritefront.png");
  alien3Img = loadImage("assets/alienspriteleft.png");
  alien4Img = loadImage("assets/alienspriteright.png");
  cow1Img = loadImage("assets/cowsprite.png");
  cow2Img = loadImage("assets/cowsprite2.png");
  bgMusic = loadSound("assets/wackyworkings.wav");
  sound1 = loadSound("assets/3.wav");
  moo1 = loadSound("assets/moomoocow1.wav");
  moo2 = loadSound("assets/moomoocow2.wav");
  moo3 = loadSound("assets/moomoocow3.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  player.x = width/2;
  player.y = height/2;
  bgMusic.loop();

}

function draw() {
  background("green");
  rectMode(CENTER);
  titleOrGame(displayArray[currentDisplay]);
}

// functions
function movePlayer() {
  if (keyIsDown(87) || keyIsDown(38)) { // key "w" & ^
    player.y -= player.speed;
    player.direction = "up";
  }
  if (keyIsDown(65) || keyIsDown(37)) {// key "a" & <
    player.x -= player.speed;
    player.direction = "left";
  }
  if (keyIsDown(83) || keyIsDown(40)) { // key "s" & v
    player.y += player.speed;
    player.direction = "down";
  }
  if (keyIsDown(68) || keyIsDown(39)) { // key "d" & >
    player.x += player.speed;
    player.direction = "right";
  }
}

function ifPlayerHitWall() {
  if (player.x + player.wid/2 > width) {
    player.x = width - player.wid/2;
  }
  if (player.x - player.wid/2 < 0) {
    player.x = 0 + player.wid/2;
  }
  if (player.y + player.hei/2 > height) {
    player.y = height - player.hei/2;
  }
  if (player.y - player.hei/2 < 0) {
    player.y = 0 + player.hei/2;
  }
}

function ifBulletHitWall() {
  for (let bullet of theBullets) {
    if (bullet.x + bullet.size/2 > width) {
      bullet.x = width - bullet.size/2;
      theBullets.splice(bullet, 1);
    }
    if (bullet.x - bullet.size/2 < 0) {
      bullet.x = 0 + bullet.size/2;
      theBullets.splice(bullet, 1);
    }
    if (bullet.y + bullet.size/2 > height) {
      bullet.y = height - bullet.size/2;
      theBullets.splice(bullet, 1);
    }
    if (bullet.y - bullet.size/2 < 0) {
      bullet.y = 0 + bullet.size/2;
      theBullets.splice(bullet, 1);
    }
  }
}

function keyPressed() {
  if (keyCode === 32) {
    makeBullet();

  }
}

function makeBullet() {
  let bullet = {
    x: player.x,
    y: player.y,
    dx: 5,
    dy: 5,
    speed: 10,
    direction: player.direction,
    size: 5,
    isAlive: true,
  };
  theBullets.push(bullet);
  sound1.play();
}

function moveBullet() {
  for (let bullet of theBullets) {
    switch (bullet.direction) {
    default:
    case "up":
      bullet.dx = 0;
      bullet.dy = -10;
      break;
    case "left":
      bullet.dx = -10;
      bullet.dy = 0;
      break;
    case "down":
      bullet.dx = 0;
      bullet.dy = 10;
      break;
    case "right":
      bullet.dx = 10;
      bullet.dy = 0;
      break;
    }
    bullet.x += bullet.dx;
    bullet.y += bullet.dy;
  }
}

function displayBullet() {
  for (let bullet of theBullets) {
    noStroke();
    fill("black");
    rect(bullet.x, bullet.y, bullet.size, bullet.size);
  }
}

function spawnSpaceCow() {
  if (millis() - lastSpawnTime > waitTime) {
    let spaceCow = {
      x: random(HALFSIZE, width-HALFSIZE),
      y: random(HALFSIZE, height-HALFSIZE),
      dx: random(-5, 5),
      dy: random(-5, 5),
      size: HALFSIZE*2,
      isAlive: true,
    };
    theSpaceCows.push(spaceCow);
    lastSpawnTime = millis();
    let theMoo = random(mooMooCowArray);
    if (theMoo === 1) {
      moo1.play();
    }
    else {
      moo2.play();
    }
  }
}

function displaySpaceCow() {
  if (theSpaceCows.length > 0) {
    for (let i=0; i<theSpaceCows.length; i++) {
      if (theSpaceCows[i].isAlive) {
        imageMode(CENTER);
        if (theSpaceCows[i].dx > 0) {
          image(cow1Img, theSpaceCows[i].x, theSpaceCows[i].y, theSpaceCows[i].size*2, theSpaceCows[i].size*2);
        }
        else {
          image(cow2Img, theSpaceCows[i].x, theSpaceCows[i].y, theSpaceCows[i].size*2, theSpaceCows[i].size*2);
        }
      }
    }
  }
}

function ifCowHitWall() {
  for (let spaceCow of theSpaceCows) {
    if (spaceCow.x + HALFSIZE > width + HALFSIZE) {
      spaceCow.x = width - HALFSIZE;
      theSpaceCows.splice(spaceCow, 1);
    }
    if (spaceCow.x - HALFSIZE < 0 - HALFSIZE) {
      spaceCow.x = 0 + HALFSIZE;
      theSpaceCows.splice(spaceCow, 1);
    }
    if (spaceCow.y + HALFSIZE > height + HALFSIZE) {
      spaceCow.y = height - HALFSIZE;
      theSpaceCows.splice(spaceCow, 1);
    }
    if (spaceCow.y - HALFSIZE < 0 - HALFSIZE) {
      spaceCow.y = 0 + HALFSIZE;
      theSpaceCows.splice(spaceCow, 1);
    }
  }
}


function moveSpaceCow() {
  for (let spaceCow of theSpaceCows) {
    spaceCow.x += spaceCow.dx;
    spaceCow.y += spaceCow.dy;
  }
}

function spaceCowShot() {
  for (let i=theSpaceCows.length-1; i>=0; i--) {
    for (let j=theBullets.length-1; j>=0; j--) {
      if (theBullets[j].x < theSpaceCows[i].x + HALFSIZE &&
          theBullets[j].x > theSpaceCows[i].x - HALFSIZE &&
          theBullets[j].y < theSpaceCows[i].y + HALFSIZE &&
          theBullets[j].y > theSpaceCows[i].y - HALFSIZE) {
        theSpaceCows[i].isAlive = false;
        theBullets[j].isAlive = false;
        theSpaceCows.splice(i, 1);
        theBullets.splice(j, 1);
        score++;
        moo3.play();
        break;
      }
    }
  }
}

function displayGame() {
  rectMode(CENTER);
  movePlayer();
  ifPlayerHitWall();
  moveBullet();
  ifBulletHitWall();
  spaceCowShot();
  moveSpaceCow();
  ifCowHitWall();
  spawnSpaceCow();
  displayPlayer(player.direction);
  displayBullet();
  displaySpaceCow();
  displayScore();
}

function displayPlayer(direction) {
  imageMode(CENTER);
  switch (direction) {
  case "up":
    image(alien1Img, player.x, player.y, player.wid*4, player.hei*4);
    break;
  case "down":
  default:
    image(alien2Img, player.x, player.y, player.wid*4, player.hei*4);
    break;
  case "left":
    image(alien3Img, player.x, player.y, player.wid*4, player.hei*4);
    break;
  case "right":
    image(alien4Img, player.x, player.y, player.wid*4, player.hei*4);
    break;
  }
}

function titleOrGame(what) {
  switch (what) {
  case "title screen":
    displayTitleScreen();
    break;
  case "game":
    displayGame();
    break;
  }
}

function displayTitleScreen() {
  rectMode(CORNER);
  image(titleScreenImg, 0, 0, windowWidth, windowHeight);
  fill("white");
  startButton.draw();
  startButton.locate(windowWidth/8, windowHeight/8*6);
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
    titleOrGame(displayArray[currentDisplay]);
  };
}

function displayScore() {
  fill("white");
  textSize(25);
  text("Score:" + score, 20, 20);
}
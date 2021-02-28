// The Milky Way but its only the hunting minigame
// Imani Fodje
// 2/9/21
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// global variables
//   Constants

//  not constants

// Arrays
let theBullets = [];
let theSpaceCows = [];

// Objects
let player = {
  x:0,
  y:0,
  speed:1,
  direction: "up",
  wid: 50,
  hei: 50,
};
// let bullet = {
//   x: 0,
//   y: 0,
//   speed:10,
//   direction: player.direction, 
// };

// preload + setup + draw

function setup() {
  createCanvas(windowWidth, windowHeight);
  player.x = width/2;
  player.y = height/2;

}

function draw() {
  background(225);
  rectMode(CENTER);
  rect(player.x, player.y, player.wid, player.hei);
  movePlayer();
  ifPlayerHitWall();
  displayBullet();
  moveBullet();
  ifBulletHitWall();
  displaySpaceCow();
  moveSpaceCow();
  spaceCowChangeDirection();
  spaceCowShot();
}

// Classes
// class Bullet {
//   constructor(x, y, radius, direction) {
//     this.x = x;
//     this.y = y;
//     this.radius = radius;
//     this.direction = direction;
//     this.someColor = "black";
//     this.dx = 5;
//     this.dy = 5;
//     // this.direction = "up";
//     this.isAlive = true;
//   }

//   display() {
//     ellipse(this.x, this.y, this.radius*2, this.radius*2);
//     fill(this.someColor);
//   }

//   move(direction) {
//     switch (direction) {
//     default:
//     case "up":
//       this.dx = 0;
//       this.dy = -5;
//       break;
//     case "left":
//       this.dx = -5;
//       this.dy = 0;
//       break;
//     case "down":
//       this.dx = 0;
//       this.dy = 5;
//       break;
//     case "right":
//       this.dx = 5;
//       this.dy = 0;
//       break;
//     }
//     this.x += this.dx;
//     this.y += this.dy;
//   }

//   // didShotLand() {

//   // }
// }

class SpaceCow {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.dx = 5;
    this.dy = 5;
  }

  display() {
    noStroke();
    fill("white");
    rect(this.x, this.y, this.w, this.h);
  }

  didItGetHit() {

  }
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
      theBullets.splice(bullet);
    }
    if (bullet.x - bullet.size/2 < 0) {
      bullet.x = 0 + bullet.size/2;
      theBullets.splice(bullet);
    }
    if (bullet.y + bullet.size/2 > height) {
      bullet.y = height - bullet.size/2;
      theBullets.splice(bullet);
    }
    if (bullet.y - bullet.size/2 < 0) {
      bullet.y = 0 + bullet.size/2;
      theBullets.splice(bullet);
    }
  }
}

function keyPressed() {
  if (keyCode === 32) {
    makeBullet();
    spawnSpaceCow();
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
  };
  theBullets.push(bullet);
}

function moveBullet() {
  for (let bullet of theBullets) {
    switch (bullet.direction) {
    default:
    case "up":
      bullet.dx = 0;
      bullet.dy = -5;
      break;
    case "left":
      bullet.dx = -5;
      bullet.dy = 0;
      break;
    case "down":
      bullet.dx = 0;
      bullet.dy = 5;
      break;
    case "right":
      bullet.dx = 5;
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
  let mooMooCow = {
    x: 100,
    y: 100,
    dx: 0,
    dy: 0,
    size: 100,
    isAlive: true,
  };
  theSpaceCows.push(mooMooCow);
}

function displaySpaceCow() {
  for (let moomoo of theSpaceCows) {
    noStroke();
    fill("red");
    rect(moomoo.x, moomoo.y, moomoo.size, moomoo.size);
  }
}

function moveSpaceCow() {
  for (let spaceCow of theSpaceCows) {
    spaceCow.x += spaceCow.dx;
    spaceCow.y += spaceCow.dy;
  }
}

function spaceCowChangeDirection() {
  let waitTime = 5000;
  let lastSwitchTime = 0;
  if (millis() - lastSwitchTime > waitTime) {
    for (let spaceCow of theSpaceCows) {
      if (spaceCow.isAlive) {
        spaceCow.dx = 5;
        spaceCow.dy = 5;
      }
      else {
        spaceCow.dx = 0;
        spaceCow.dy = 0;
      }
    }
    lastSwitchTime = millis();
  }
}

function spaceCowShot() {
  for (let moo of theSpaceCows) {
    for (let bullet of theBullets) {
      if ((bullet.x-bullet.wid < moo.x + moo.size || bullet.x+bullet.wid > moo.x - moo.size) && (bullet.y-bullet.hei < moo.y + moo.size || bullet.y+bullet.hei > moo.y - moo.size)) {
        moo.isALice = false;
        theSpaceCows.splice(moo);
        theBullets.splice(bullet);
      }
      if (bullet.y-bullet.hei < moo.y + moo.size || bullet.y+bullet.hei > moo.y - moo.size) {
        moo.isALice = false;
        theSpaceCows.splice(moo);
        theBullets.splice(bullet);
      }
    }
  }
}
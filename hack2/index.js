const backgroundMusic = document.getElementById('background-music');

document.addEventListener('keydown', function (event) {
  if (event.key === 'm') {
    backgroundMusic.play();
    backgroundMusic.volume = 0.1;
  } else if (event.key === 'p') {
    backgroundMusic.pause();
  }
});
let jump = true;
let doubleJump = false;
let currentLevel;
const speeds = {
  pause: 500,
  slow: 120,
  normal: 90,
  fast: 40,
  superFast: 10,
};

let textLines = [];
//Code d'index.js

//  ****** LEVELS ******** //

let imgPlatform = document.createElement('img');
imgPlatform.src = './platform.png';
imgPlatform.style.width = '501px';
imgPlatform.style.height = '50px';

let imgPoisonPlatform = document.createElement('img');
imgPoisonPlatform.src = './poison-city-plat.png';
imgPoisonPlatform.style.width = '500px';
imgPoisonPlatform.style.height = '50px';

let img_width = parseInt(imgPlatform.style.width);

let imgBackground = document.createElement('img');
imgBackground.src = './poison-city-bg.png';
let imgBackgroundLvl2 = document.createElement('img');
imgBackgroundLvl2.src = './spider-world-bg.png';
let imgBackgroundLvl3 = document.createElement('img');
imgBackgroundLvl3.src = './cimetiere.png';
let imgBackgroundLvl4 = document.createElement('img');
imgBackgroundLvl4.src = './Candy-world.png';
let imgBackgroundLvl5 = document.createElement('img');
imgBackgroundLvl5.src = './dark-forest-bg.png';

let imgHill = document.createElement('img');
imgHill.src = './hills.png';

let platformCemetery = document.createElement('img');
platformCemetery.src = './cimetiere-plat.png';
let smallPlatformCemetery = document.createElement('img');
smallPlatformCemetery.src = './cimetiere-plat-medium.png';
smallPlatformCemetery.style.width = '301px';
let extraSmallPlatformCemetery = document.createElement('img');
extraSmallPlatformCemetery.src = './cimetiere-plat-little.png';
extraSmallPlatformCemetery.style.width = '150px';

let platformDarkForest = document.createElement('img');
platformDarkForest.src = './forest-plat.png';
let smallPlatformDarkForest = document.createElement('img');
smallPlatformDarkForest.src = './forest-plat-medium.png';
smallPlatformDarkForest.style.width = '301px';
let extraSmallPlatformDarkForest = document.createElement('img');
extraSmallPlatformDarkForest.src = './forest-plat-little.png';
extraSmallPlatformDarkForest.style.width = '150px';

let platformCandy = document.createElement('img');
platformCandy.src = './candy-plat.png';
let smallPlatformCandy = document.createElement('img');
smallPlatformCandy.src = './candy-plat-medium.png';
smallPlatformCandy.style.width = '301px';
let extraSmallPlatformCandy = document.createElement('img');
extraSmallPlatformCandy.src = './candy-plat-little.png';
extraSmallPlatformCandy.style.width = '150px';

//  **********PLAYERS ********************
let spriteRunLeft = document.createElement('img');
spriteRunLeft.src = './spriteRunLeft.png';

let spriteRunRight = document.createElement('img');
spriteRunRight.src = './spriteRunRight.png';

let spriteStandRight = document.createElement('img');
spriteStandRight.src = './minautor-Idle.png';

let spriteStandLeft = document.createElement('img');
spriteStandLeft.src = './spriteStandLeft.png';

let minautorRunRight = document.createElement('img');
minautorRunRight.src = './minautorRunRight.png';

let minautorRunLeft = document.createElement('img');
minautorRunLeft.src = './minautorRunleft.png';

let orcRunRight = document.createElement('img');
orcRunRight.src = './Orc-run-right.png';

let orcRunLeft = document.createElement('img');
orcRunLeft.src = './Orc-run-left.png';

let orcIdle = document.createElement('img');
orcIdle.src = './Orc-sur-place.png';

let iceGolemRunLeft = document.createElement('img');
iceGolemRunLeft.src = './golem-glace-run-left.png';

let iceGolemRunRight = document.createElement('img');
iceGolemRunRight.src = './golem-glace-run-right.png';

let iceGolemIdle = document.createElement('img');
iceGolemIdle.src = './golem-glace-idle.png';

let reaperRunLeft = document.createElement('img');
reaperRunLeft.src = './reaper-run-left.png';

let reaperRunRight = document.createElement('img');
reaperRunRight.src = './reaper-run-right.png';

let reaperIdle = document.createElement('img');
reaperIdle.src = './reaper-idle.png';

const canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

let gravity = 1.5;

class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 127.875;
    this.height = 300;

    this.image = spriteStandRight;
    this.frames = 0;
    this.sprites = {
      stand: {
        right: spriteStandRight,
        left: spriteStandRight,
        cropWidth: 150,
        width: 127.875,
        height: 300,
      },

      run: {
        right: minautorRunRight,
        left: minautorRunLeft,
        cropWidth: 150,
        width: 127.875,
        height: 300,
      },
    };
    this.currentSprite = this.sprites.stand.right;
    this.currentCropWidth = 150;
  }
  draw() {
    c.drawImage(
      this.currentSprite,
      this.currentCropWidth * this.frames,
      -295,
      this.currentCropWidth,
      400,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.frames++;
    if (this.frames > 10 && this.currentSprite === this.sprites.stand.right)
      this.frames = 0;
    else if (
      (this.frames > 10 && this.currentSprite === this.sprites.run.right) ||
      (this.frames > 10 && this.currentSprite === this.sprites.run.left)
    ) {
      this.frames = 0;
    }
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
  }
}

class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = image.width;
    this.height = parseInt(image.style.height);
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = img_width;
    this.height = parseInt(image.style.height);
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

let player = new Player();
let keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};
let platforms = [];

let GenericObjects = [];

let scrollOffset = 0;

function init() {
  currentLevel = 1;
  player = new Player();
  textLines = [
    [
      { speed: speeds.slow, string: 'Soul - ' },
      { speed: speeds.slow, string: 'Oh, hello!' },
      { speed: speeds.pause, string: '', pause: true },
      { speed: speeds.normal, string: 'Have you seen my pet' },
      { speed: speeds.fast, string: 'frog', classes: ['green'] },
      { speed: speeds.normal, string: 'around?' },
    ],
    [
      { speed: speeds.slow, string: 'Oh, hi!' },
      { speed: speeds.pause, string: '', pause: true },
      { speed: speeds.normal, string: 'Have you seen my pet' },
      { speed: speeds.fast, string: 'snake', classes: ['green'] },
      { speed: speeds.normal, string: 'around?' },
    ],
    [
      { speed: speeds.slow, string: 'Oh, hey!' },
      { speed: speeds.pause, string: '', pause: true },
      { speed: speeds.normal, string: 'Have you seen my pet' },
      { speed: speeds.fast, string: 'dog', classes: ['green'] },
      { speed: speeds.normal, string: 'around?' },
    ],
  ];
  keys = {
    right: {
      pressed: false,
    },
    left: {
      pressed: false,
    },
  };
  platforms = [
    new Platform({ x: -1, y: 533, image: imgPoisonPlatform }),

    new Platform({ x: img_width + 200, y: 533, image: imgPoisonPlatform }),
    new Platform({ x: img_width * 2 + 200, y: 533, image: imgPoisonPlatform }),
    new Platform({ x: img_width * 3 + 400, y: 530, image: imgPoisonPlatform }),
  ];

  GenericObjects = [
    new GenericObject({ x: -2040, y: 0, image: imgBackground }),

    new GenericObject({ x: 0 - 1, y: 0, image: imgBackground }),
    new GenericObject({ x: 2040 - 10, y: 0, image: imgBackground }),
  ];
  scrollOffset = 0;
}

function initLvl2() {
  currentLevel = 2;
  player = new Player();
  keys = {
    right: {
      pressed: false,
    },
    left: {
      pressed: false,
    },
  };
  platforms = [
    new Platform({ x: -1, y: 505, image: imgPlatform }),
    new Platform({ x: img_width + 4, y: 505, image: imgPlatform }),
    new Platform({ x: img_width * 2, y: 505, image: imgPlatform }),
    new Platform({ x: img_width * 3 + 200, y: 530, image: imgPlatform }),
    new Platform({ x: img_width * 4 + 200, y: 530, image: imgPlatform }),
  ];

  GenericObjects = [
    new GenericObject({ x: -2040, y: 0, image: imgBackgroundLvl2 }),

    new GenericObject({ x: 0, y: 0, image: imgBackgroundLvl2 }),
    new GenericObject({ x: 2040 - 1, y: 0, image: imgBackgroundLvl2 }),
  ];
  scrollOffset = 0;

  player.sprites.run = {
    right: orcRunRight,
    left: orcRunLeft,
    cropWidth: 150,
    width: 127.875,
    height: 300,
  };
  player.sprites.stand = {
    right: orcIdle,
    left: orcIdle,
    cropWidth: 150,
    width: 127.875,
    height: 300,
  };
}

function initLvl3() {
  currentLevel = 3;
  player = new Player();
  keys = {
    right: {
      pressed: false,
    },
    left: {
      pressed: false,
    },
  };
  platforms = [
    new Platform({ x: -1, y: 533, image: platformCemetery }),
    new Platform({ x: img_width + 7, y: 533, image: platformCemetery }),
    new Platform({
      x: img_width * 2,
      y: 533,
      image: smallPlatformCemetery,
    }),
    new Platform({
      x: img_width * 3,
      y: 430,
      image: platformCemetery,
    }),

    new Platform({ x: img_width * 4, y: 230, image: platformCemetery }),
  ];

  GenericObjects = [
    new GenericObject({ x: -2040, y: 0, image: imgBackgroundLvl3 }),

    new GenericObject({ x: 0, y: 0, image: imgBackgroundLvl3 }),
    new GenericObject({ x: 2040, y: 0, image: imgBackgroundLvl3 }),
  ];
  scrollOffset = 0;

  player.sprites.run = {
    right: iceGolemRunRight,
    left: iceGolemRunLeft,
    cropWidth: 150,
    width: 127.875,
    height: 300,
  };
  player.sprites.stand = {
    right: iceGolemIdle,
    left: iceGolemIdle,
    cropWidth: 150,
    width: 127.875,
    height: 300,
  };
}

function initLvl4() {
  currentLevel = 4;
  player = new Player();
  keys = {
    right: {
      pressed: false,
    },
    left: {
      pressed: false,
    },
  };
  platforms = [
    new Platform({ x: -1, y: 533, image: platformCandy }),
    new Platform({ x: img_width + 7, y: 533, image: platformCandy }),
    new Platform({
      x: img_width * 2 + 200,
      y: 533,
      image: smallPlatformCandy,
    }),
    new Platform({
      x: img_width * 3,
      y: 430,
      image: extraSmallPlatformCandy,
    }),

    new Platform({ x: img_width * 3 + 200, y: 230, image: platformCandy }),
  ];

  GenericObjects = [
    new GenericObject({ x: -2040, y: 0, image: imgBackgroundLvl4 }),

    new GenericObject({ x: 0, y: 0, image: imgBackgroundLvl4 }),
    new GenericObject({ x: 2040, y: 0, image: imgBackgroundLvl4 }),
  ];
  scrollOffset = 0;

  player.sprites.run = {
    right: reaperRunRight,
    left: reaperRunLeft,
    cropWidth: 150,
    width: 127.875,
    height: 300,
  };
  player.sprites.stand = {
    right: reaperIdle,
    left: reaperIdle,
    cropWidth: 150,
    width: 127.875,
    height: 300,
  };
}

function initLvl5() {
  currentLevel = 5;
  player = new Player();
  keys = {
    right: {
      pressed: false,
    },
    left: {
      pressed: false,
    },
  };
  platforms = [
    new Platform({ x: -1, y: 505, image: platformDarkForest }),
    new Platform({ x: img_width + 4, y: 505, image: platformDarkForest }),
    new Platform({ x: img_width * 2, y: 505, image: platformDarkForest }),
    new Platform({ x: img_width * 3 + 200, y: 530, image: platformDarkForest }),
    new Platform({ x: img_width * 4 + 200, y: 530, image: platformDarkForest }),
  ];

  GenericObjects = [
    new GenericObject({ x: -2040, y: 0, image: imgBackgroundLvl5 }),

    new GenericObject({ x: 0, y: 0, image: imgBackgroundLvl5 }),
    new GenericObject({ x: 2040 - 1, y: 0, image: imgBackgroundLvl5 }),
  ];
  scrollOffset = 0;

  player.sprites.run = {
    right: orcRunRight,
    left: orcRunLeft,
    cropWidth: 150,
    width: 127.875,
    height: 300,
  };
}

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = 'white';
  c.fillRect(0, 0, canvas.width, canvas.height);

  GenericObjects.forEach((genericObject) => {
    genericObject.draw();
  });

  platforms.forEach((platform) => {
    platform.draw();
  });
  player.update();

  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 8;
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -8;
  } else {
    player.velocity.x = 0;
    if (keys.right.pressed) {
      scrollOffset += 5;
      platforms.forEach((platform) => {
        platform.position.x -= 5;
      });
      GenericObjects.forEach((genericObject) => {
        genericObject.position.x -= 3;
      });
    }
    if (keys.left.pressed) {
      scrollOffset -= 5;

      platforms.forEach((platform) => {
        platform.position.x += 5;
      });
      GenericObjects.forEach((genericObject) => {
        genericObject.position.x += 3;
      });
    }
    if (scrollOffset > img_width * 3 + 400) {
      if (currentLevel === 1) initLvl2();
      else if (currentLevel === 2) initLvl3();
      else if (currentLevel === 3) initLvl4();
      else if (currentLevel === 4) initLvl5();
    }
  }

  if (player.position.y > canvas.height) {
    if (currentLevel === 1) init();
    else if (currentLevel === 2) {
      initLvl2();
    } else if (currentLevel === 3) initLvl3();
  }
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
      jump = true;
      doubleJump = false;
    }
  });
}
init();
animate();

addEventListener('keyup', ({ keyCode }) => {
  switch (keyCode) {
    case 81:
      keys.left.pressed = false;
      player.currentSprite = player.sprites.stand.left;
      player.currentCropWidth = player.sprites.stand.cropWidth;
      player.width = player.sprites.stand.width;

      player.velocity.x = 0;
      break;
    case 68:
      keys.right.pressed = false;
      player.currentSprite = player.sprites.stand.right;
      player.currentCropWidth = player.sprites.stand.cropWidth;
      player.width = player.sprites.stand.width;

      player.velocity.x = 0;
      break;
    case 90:
      player.velocity.y -= 0;
      break;
    case 83:
      break;
  }
});

addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) {
    case 81:
      keys.left.pressed = true;
      player.currentSprite = player.sprites.run.left;
      player.currentCropWidth = player.sprites.run.cropWidth;
      player.width = player.sprites.run.width;
      break;
    case 68:
      keys.right.pressed = true;
      player.currentSprite = player.sprites.run.right;
      player.currentCropWidth = player.sprites.run.cropWidth;
      player.width = player.sprites.run.width;
      break;

    case 90:
      if (jump) {
        player.velocity.y -= 20;
        jump = false;
        doubleJump = true;
      } else if (doubleJump) {
        player.velocity.y -= 20;
        doubleJump = false;
      }

      break;
    case 83:
      break;
  }
});

// Code du speech
const container = document.querySelector('.text');

let characters = [];
let currentTextIndex = 0;
let dialogueElement = document.querySelector('.dialogue');

function startText(lines) {
  const selectedLines = lines[currentTextIndex];

  selectedLines.forEach((line, index) => {
    if (index < selectedLines.length - 1) {
      line.string += ' ';
    }

    line.string.split('').forEach((character) => {
      const span = document.createElement('span');
      span.textContent = character;
      container.appendChild(span);
      characters.push({
        span: span,
        isSpace: character === ' ' && !line.pause,
        delayAfter: line.speed,
        classes: line.classes || [],
      });
    });
  });

  setTimeout(() => {
    revealOneCharacter(characters);
  }, 600);
}

function revealOneCharacter(list) {
  const next = list.splice(0, 1)[0];
  if (next) {
    next.span.classList.add('revealed');
    next.classes.forEach((c) => {
      next.span.classList.add(c);
    });
    const delay = next.isSpace && !next.pause ? 0 : next.delayAfter;

    if (list.length > 0) {
      setTimeout(function () {
        revealOneCharacter(list);
      }, delay);
    } else {
      switchButton.disabled = false;
      if (currentTextIndex === textLines.length - 1) {
        closeButton.style.visibility = 'visible';
        switchButton.style.visibility = 'hidden';
      }
    }
  }
}

function switchText() {
  container.innerHTML = '';
  characters = [];
  switchButton.disabled = true;
  currentTextIndex = (currentTextIndex + 1) % textLines.length;

  if (currentTextIndex === 0) {
    dialogueElement.style.display = 'block';
  }

  startText(textLines);
}

function closeText() {
  dialogueElement.style.display = 'none';
}

const switchButton = document.querySelector('.switch-button');
const closeButton = document.querySelector('.close-btn');
switchButton.addEventListener('click', switchText);
closeButton.addEventListener('click', closeText);

startText(textLines);

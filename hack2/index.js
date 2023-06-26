// Code de cimetary.js

let imgPlatform = document.createElement('img');
imgPlatform.src = './platform.png';
imgPlatform.style.width = '500px';
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

let imgHill = document.createElement('img');
imgHill.src = './hills.png';

let imgSmallPlatform = document.createElement('img');
imgSmallPlatform.src = './platformSmallTall.png';
imgSmallPlatform.style.width = '350px';

let img_small_width = parseInt(imgSmallPlatform.style.width);

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
      minautor: {
        run: {
          right: minautorRunRight,
          left: minautorRunLeft,
          cropWidth: 150,
          width: 127.875,
          height: 300,
        },
      },
    };
    this.currentSprite = this.sprites.stand.right;
    this.currentCropWidth = 177;
  }
  draw() {
    c.drawImage(
      this.currentSprite,
      this.currentCropWidth * this.frames,
      -250,
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
    if (this.frames > 11 && this.currentSprite === this.sprites.stand.right)
      this.frames = 0;
    else if (
      (this.frames > 11 &&
        this.currentSprite === this.sprites.minautor.run.right) ||
      (this.frames > 11 &&
        this.currentSprite === this.sprites.minautor.run.left)
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
    this.width = img_width;
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
    new Platform({ x: -1, y: 533, image: imgPoisonPlatform }),
    new Platform({ x: img_width - 2, y: 533, image: imgPoisonPlatform }),
    new Platform({ x: img_width * 2 + 200, y: 533, image: imgPoisonPlatform }),
    new Platform({ x: img_width * 3 + 400, y: 230, image: imgPoisonPlatform }),
  ];

  GenericObjects = [new GenericObject({ x: 0, y: 0, image: imgBackground })];
  scrollOffset = 0;
}

function initLvl2() {
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
    // new Platform({ x: img_width + 4, y: 505, image: imgPlatform }),
    new Platform({ x: img_width * 2 + 400, y: 505, image: imgPlatform }),
    new Platform({ x: img_width * 3 + 400, y: 230, image: imgPlatform }),
  ];

  GenericObjects = [
    new GenericObject({ x: 0, y: 0, image: imgBackgroundLvl2 }),
    // new GenericObject({ x: 0, y: 0, image: imgHill }),
    // new GenericObject({ x: 1300, y: 0, image: imgHill }),
  ];
  scrollOffset = 0;
  if (scrollOffset > img_width * 3 + 400) initLvl3();
}

function initLvl3() {
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
    new Platform({ x: -1, y: 533, image: imgPlatform }),
    new Platform({ x: img_width + 7, y: 533, image: imgPlatform }),
    new Platform({ x: img_width * 2 + 200, y: 533, image: imgPlatform }),
    new Platform({ x: img_width * 3 + 400, y: 230, image: imgSmallPlatform }),
  ];

  GenericObjects = [
    new GenericObject({ x: 0, y: 0, image: imgBackgroundLvl2 }),
    // new GenericObject({ x: 0, y: 0, image: imgHill }),
    // new GenericObject({ x: 1300, y: 0, image: imgHill }),
  ];
  scrollOffset = 0;
  if (scrollOffset > img_width * 3 + 400) initLvl3();
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
    if (scrollOffset > img_width * 3 + 400) initLvl2();
  }

  if (player.position.y > canvas.height) init();
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
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
      console.log('right');
      keys.right.pressed = false;
      player.currentSprite = player.sprites.stand.right;
      player.currentCropWidth = player.sprites.stand.cropWidth;
      player.width = player.sprites.stand.width;

      player.velocity.x = 0;
      break;
    case 90:
      console.log('up');
      player.velocity.y -= 0;
      break;
    case 83:
      console.log('down');
      break;
  }
});

addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) {
    case 81:
      keys.left.pressed = true;
      player.currentSprite = player.sprites.minautor.run.left;
      player.currentCropWidth = player.sprites.minautor.run.cropWidth;
      player.width = player.sprites.minautor.run.width;
      break;
    case 68:
      keys.right.pressed = true;
      player.currentSprite = player.sprites.minautor.run.right;
      player.currentCropWidth = player.sprites.minautor.run.cropWidth;
      player.width = player.sprites.minautor.run.width;
      break;

    case 90:
      player.velocity.y -= 20;
      if (player.)
      break;
    case 83:
      break;
  }
});

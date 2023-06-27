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

// Code du speech
const container = document.querySelector('.text');

let characters = [];
let currentTextIndex = 0;
let dialogueElement = document.querySelector('.dialogue');

function deleteSpans() {
  var spans = document.getElementsByTagName('span');

  var spansArray = Array.from(spans);

  spansArray.forEach((span) => {
    span.parentNode.removeChild(span);
  });
}

function startText(lines) {
  const selectedLines = lines[currentTextIndex];

  selectedLines?.forEach((line, index) => {
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
  deleteSpans();
  startText(textLines);
}

function closeText() {
  dialogueElement.style.display = 'none';
  deleteSpans();
}

function openText() {
  dialogueElement.style.display = 'block';
}

const switchButton = document.querySelector('.switch-button');
const closeButton = document.querySelector('.close-btn');
switchButton.addEventListener('click', switchText);
closeButton.addEventListener('click', closeText);

//  ****** LEVELS ******** //

let imgPlatform = document.createElement('img');
imgPlatform.src = './platform.png';
let smallPlatform = document.createElement('img');
smallPlatform.src = './spider-world-plat-medium.png';
let extraSmallPlatform = document.createElement('img');
extraSmallPlatform.src = './spider-world-plat-small.png';

let imgPoisonPlatform = document.createElement('img');
imgPoisonPlatform.src = './poison-city-plat.png';
let smallPoisonPlatform = document.createElement('img');
smallPoisonPlatform.src = './poison-city-plat-medium.png';
let extraSmallPoisonPlatform = document.createElement('img');
extraSmallPoisonPlatform.src = './poison-city-plat-little.png';

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

let platformCemetery = document.createElement('img');
platformCemetery.src = './cimetiere-plat.png';
let smallPlatformCemetery = document.createElement('img');
smallPlatformCemetery.src = './cimetiere-plat-medium.png';

let extraSmallPlatformCemetery = document.createElement('img');
extraSmallPlatformCemetery.src = './cimetiere-plat-little.png';

let platformDarkForest = document.createElement('img');
platformDarkForest.src = './forest-plat.png';
let smallPlatformDarkForest = document.createElement('img');
smallPlatformDarkForest.src = './forest-plat-medium.png';

let extraSmallPlatformDarkForest = document.createElement('img');
extraSmallPlatformDarkForest.src = './forest-plat-little.png';

let platformCandy = document.createElement('img');
platformCandy.src = './candy-plat.png';
let smallPlatformCandy = document.createElement('img');
smallPlatformCandy.src = './candy-plat-medium.png';

let extraSmallPlatformCandy = document.createElement('img');
extraSmallPlatformCandy.src = './candy-plat-little.png';

let platformPortal = document.createElement('img');
platformPortal.src = './portal.png';

//  **********PLAYERS ********************

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

let humanRunLeft = document.createElement('img');
humanRunLeft.src = './human-run-left.png';

let humanRunRight = document.createElement('img');
humanRunRight.src = './human-run-right.png';

let humanIdle = document.createElement('img');
humanIdle.src = './human-idle.png';

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
        right: reaperIdle,
        left: reaperIdle,
        cropWidth: 150,
        width: 127.875,
        height: 300,
      },

      run: {
        right: reaperRunRight,
        left: reaperRunLeft,
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
  constructor({ x, y, image, width, diffLeft, diffRight }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = width;
    this.height = parseInt(image.style.height);
    this.diffLeft = diffLeft;
    this.diffRight = diffRight;
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
      { speed: speeds.normal, string: 'Soul - ' },
      {
        speed: speeds.fast,
        string: 'Carlos n\u0027est pas venu ce soir\u2026',
      },
      { speed: speeds.pause, string: '', pause: true },
      {
        speed: speeds.fast,
        string: ' J\u0027esp\u00E8re qu\u0027il ne lui est rien arriv\u00E9 !',
      },
    ],
    [
      {
        speed: speeds.fast,
        string:
          'Tant pis, je rentre chez moi. J\u0027esp\u00E8re qu\u0027il sera l\u00E0 la prochaine fois.',
      },
    ],
    [
      {
        speed: speeds.fast,
        string: 'Hadraniel - Je suis l\u0027ange Hadraniel !',
      },
    ],
    [
      {
        speed: speeds.fast,
        string:
          'Hadraniel - Ton ami Carlos n\u0027a pas pu venir car il \u00E0 \u00E9t\u00E9 captur\u00E9 par un malandrin !',
      },
    ],
    [
      {
        speed: speeds.fast,
        string: 'Soul - Oh mon dieu ! ! !',
      },
    ],
    [
      {
        speed: speeds.fast,
        string:
          'Hadraniel - Rends toi vite sur la route bonbon pour le sauver !',
      },
    ],
  ];
  deleteSpans();
  startText(textLines);
  keys = {
    right: {
      pressed: false,
    },
    left: {
      pressed: false,
    },
  };
  platforms = [
    new Platform({
      x: 30,
      y: 250,
      image: platformPortal,
      width: 20,
      diffLeft: 20,
      diffRight: 0,
    }),
    new Platform({
      x: -1,
      y: 533,
      image: platformCemetery,
      width: 505,
      diffLeft: 40,
      diffRight: 0,
    }),

    // new Platform({
    //   x: 50,
    //   y: 433,
    //   image: smallPlatformCandy,
    //   width: 301,
    //   diffRight: -80,
    //   diffLeft: 20,
    // }),

    new Platform({
      x: platformCemetery.width + 200,
      y: 533,
      image: extraSmallPlatformCemetery,
      width: 150,
      diffRight: -45,
      diffLeft: 55,
    }),
    new Platform({
      x: platformCemetery.width * 2 - 100,
      y: 400,
      image: platformCemetery,
      width: 505,
      diffRight: 0,
      diffLeft: 40,
    }),
    new Platform({
      x: platformCemetery.width * 2 + 400,
      y: 100,
      image: extraSmallPlatformCemetery,
      width: 150,
      diffRight: -45,
      diffLeft: 55,
    }),
    new Platform({
      x: platformCemetery.width * 4 - 300,
      y: 505,
      image: extraSmallPlatformCemetery,
      width: 150,
      diffRight: -45,
      diffLeft: 55,
    }),
    new Platform({
      x: platformCemetery.width * 4 + 50,
      y: 505,
      image: smallPlatformCemetery,
      width: 301,
      diffRight: -80,
      diffLeft: 20,
    }),
  ];

  GenericObjects = [
    new GenericObject({ x: -2040, y: 0, image: imgBackgroundLvl3 }),

    new GenericObject({ x: 0 - 1, y: 0, image: imgBackgroundLvl3 }),
    new GenericObject({ x: 2040 - 10, y: 0, image: imgBackgroundLvl3 }),
    new GenericObject({ x: 2040 - 370, y: 250, image: platformPortal }),
  ];
  scrollOffset = 0;
}

function initLvl2() {
  textLines = [
    [
      { speed: speeds.normal, string: 'Soul - ' },
      { speed: speeds.fast, string: 'Mais !' },
      { speed: speeds.pause, string: '', pause: true },
    ],
    [
      { speed: speeds.normal, string: 'Soul -' },
      {
        speed: speeds.fast,
        string:
          'Qu\u0027est ce qu\u0027il m\u0027arrive ?! Pourquoi mon corps a chang\u00E9 ?',
      },
    ],
    [
      { speed: speeds.normal, string: 'Hadraniel - ' },
      { speed: speeds.fast, string: 'Tout est normal.' },
      { speed: speeds.pause, string: '', pause: true },
      {
        speed: speeds.fast,
        string: 'C\u0027est un effet secondaire lorsque tu changes de plan.',
      },
    ],
    [
      { speed: speeds.normal, string: 'Hadraniel - ' },
      { speed: speeds.pause, string: '', pause: true },
      {
        speed: speeds.fast,
        string: 'Continue ton chemin, tu es presque arriv\u00E9 !',
      },
    ],
  ];
  switchButton.style.visibility = 'visible';
  deleteSpans();
  characters = [];
  currentTextIndex = 0;
  openText();
  startText(textLines);
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
    new Platform({
      x: 30,
      y: 250,
      image: platformPortal,
      width: 20,
      diffLeft: 20,
      diffRight: 0,
    }),
    new Platform({
      x: -1,
      y: 505,
      image: smallPlatform,
      width: 301,
      diffRight: -60,
      diffLeft: 20,
    }),
    new Platform({
      x: platformCemetery.width - 100,
      y: 305,
      image: extraSmallPlatform,
      width: 150,
      diffRight: -45,
      diffLeft: 55,
    }),
    new Platform({
      x: platformCemetery.width + 200,
      y: 150,
      image: extraSmallPlatform,
      width: 150,
      diffRight: -45,
      diffLeft: 55,
    }),
    new Platform({
      x: platformCemetery.width + 500,
      y: 150,
      image: extraSmallPlatform,
      width: 150,
      diffRight: -45,
      diffLeft: 55,
    }),
    new Platform({
      x: imgPlatform.width + 900,
      y: 530,
      image: imgPlatform,
      width: 505,
      diffLeft: 40,
      diffRight: 0,
    }),
    new Platform({
      x: imgPlatform.width + 1600,
      y: 530,
      image: extraSmallPlatform,
      width: 150,
      diffRight: -45,
      diffLeft: 55,
    }),
    new Platform({
      x: imgPlatform.width + 1900,
      y: 400,
      image: extraSmallPlatform,
      width: 150,
      diffRight: -45,
      diffLeft: 55,
    }),
  ];

  GenericObjects = [
    new GenericObject({ x: -2040, y: 0, image: imgBackgroundLvl2 }),

    new GenericObject({ x: 0, y: 0, image: imgBackgroundLvl2 }),
    new GenericObject({ x: 2040 - 1, y: 0, image: imgBackgroundLvl2 }),
    new GenericObject({ x: 2040 - 370, y: 250, image: platformPortal }),
  ];
  scrollOffset = 0;

  player.sprites.run = {
    right: minautorRunRight,
    left: minautorRunLeft,
    cropWidth: 150,
    width: 127.875,
    height: 300,
  };
  player.sprites.stand = {
    right: spriteStandRight,
    left: spriteStandRight,
    cropWidth: 150,
    width: 127.875,
    height: 300,
  };
}

function initLvl3() {
  textLines = [
    [
      { speed: speeds.normal, string: 'Soul - ' },
      {
        speed: speeds.fast,
        string: 'Oh non ! Pas en Orc ! Je suis tout vert\u2026',
      },
    ],
    [
      { speed: speeds.fast, string: 'Hadraniel -' },
      { speed: speeds.fast, string: 'Bahaha ! ! !' },
    ],
    [
      { speed: speeds.normal, string: 'Hadraniel -' },
      {
        speed: speeds.fast,
        string:
          'D\u00E9sol\u00E9 Soul\u2026 Mais j\u0027adore cette petite couette !',
      },
    ],
    [
      { speed: speeds.normal, string: 'Soul - ' },
      {
        speed: speeds.fast,
        string: 'Tr\u00E8s dr\u00F4le.',
      },
      { speed: speeds.pause, string: '', pause: true },
      {
        speed: speeds.fast,
        string: 'Tu ne serais pas en train de me faire tourner en rond toi ?',
      },
    ],
    [
      { speed: speeds.normal, string: 'Hadraniel - ' },
      {
        speed: speeds.fast,
        string: 'Noooon\u2026 Du tout.',
      },
      { speed: speeds.pause, string: '', pause: true },
      {
        speed: speeds.fast,
        string: 'Je suis un ange Soul ! Je suis ici pour t\u0027aider !',
      },
    ],
    [
      { speed: speeds.normal, string: 'Soul - ' },
      {
        speed: speeds.fast,
        string: 'Oui c\u0027est vrai tu as raison. Je ne devrais pas douter.',
      },
    ],
    [
      { speed: speeds.normal, string: 'Hadraniel - ' },
      {
        speed: speeds.fast,
        string: 'Mais tu es vraiment na\u00EFf\u2026',
      },
    ],
  ];
  switchButton.style.visibility = 'visible';
  deleteSpans();
  characters = [];
  currentTextIndex = 0;
  openText();
  startText(textLines);
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
    new Platform({
      x: 30,
      y: 250,
      image: platformPortal,
      width: 20,
      diffLeft: 20,
      diffRight: 0,
    }),
    new Platform({
      x: -1,
      y: 533,
      image: imgPoisonPlatform,
      width: 505,
      diffLeft: 40,
      diffRight: 0,
    }),
    new Platform({
      x: platformCemetery.width + 200,
      y: 533,
      image: smallPoisonPlatform,
      width: 301,
      diffRight: -60,
      diffLeft: 20,
    }),
    new Platform({
      x: imgPoisonPlatform.width * 3 - 400,
      y: 430,
      image: imgPoisonPlatform,
      width: 505,
      diffLeft: 40,
      diffRight: 0,
    }),

    new Platform({
      x: imgPoisonPlatform.width * 4 - 300,
      y: 230,
      image: imgPoisonPlatform,
      width: 505,
      diffLeft: 40,
      diffRight: 0,
    }),
    new Platform({
      x: imgPoisonPlatform.width * 4 + 600,
      y: 430,
      image: smallPoisonPlatform,
      width: 301,
      diffRight: -60,
      diffLeft: 20,
    }),
  ];

  GenericObjects = [
    new GenericObject({ x: -2040, y: 0, image: imgBackground }),
    new GenericObject({ x: 0, y: 0, image: imgBackground }),
    new GenericObject({ x: 2040, y: 0, image: imgBackground }),
    new GenericObject({ x: 2040 - 370, y: 250, image: platformPortal }),
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

function initLvl5() {
  textLines = [
    [
      { speed: speeds.slow, string: 'Soul - ' },
      { speed: speeds.slow, string: 'Ah enfin ! ' },
    ],
    [
      { speed: speeds.slow, string: 'Hadraniel - ' },
      { speed: speeds.normal, string: 'T\u0027es vraiment un idiot Soul…' },
    ],
    [
      { speed: speeds.slow, string: 'Soul - ' },
      {
        speed: speeds.normal,
        string: 'Retourne d\u0027o\u00F9 tu viens toi ! ',
      },
    ],
    [
      { speed: speeds.slow, string: 'Hadraniel - ' },
      { speed: speeds.normal, string: 'Et bien va le chercher !' },
    ],
  ];
  switchButton.style.visibility = 'visible';
  deleteSpans();
  characters = [];
  currentTextIndex = 0;
  openText();
  startText(textLines);
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
    new Platform({
      x: 30,
      y: 250,
      image: platformPortal,
      width: 20,
      diffLeft: 20,
      diffRight: 0,
    }),
    new Platform({
      x: -1,
      y: 533,
      image: platformCandy,
      width: 505,
      diffLeft: 40,
      diffRight: 0,
    }),

    new Platform({
      x: platformCandy.width + 300,
      y: 533,
      image: smallPlatformCandy,
      width: 301,
      diffLeft: 55,
      diffRight: -50,
    }),

    new Platform({
      x: platformCandy.width,
      y: 430,
      image: extraSmallPlatformCandy,
      width: 150,
      diffRight: -60,
      diffLeft: 20,
    }),

    new Platform({
      x: platformCandy.width + extraSmallPlatformCandy.width,
      y: 330,
      image: extraSmallPlatformCandy,
      width: 150,
      diffRight: -60,
      diffLeft: 20,
    }),

    new Platform({
      x: smallPlatformCandy.width * 3,
      y: 430,
      image: extraSmallPlatformCandy,
      width: 150,
      diffRight: -60,
      diffLeft: 20,
    }),

    new Platform({
      x: smallPlatformCandy.width * 3 + 200,
      y: 230,
      image: smallPlatformCandy,
      width: 301,
      diffLeft: 55,
      diffRight: -50,
    }),

    new Platform({
      x: smallPlatformCandy.width * 5,
      y: 430,
      image: smallPlatformCandy,
      width: 301,
      diffLeft: 55,
      diffRight: -50,
    }),

    new Platform({
      x: smallPlatformCandy.width * 6.3,
      y: 330,
      image: extraSmallPlatformCandy,
      width: 150,
      diffRight: -60,
      diffLeft: 20,
    }),

    new Platform({
      x: smallPlatformCandy.width * 6.5 + extraSmallPlatformCandy.width - 50,
      y: 200,
      image: extraSmallPlatformCandy,
      width: 150,
      diffRight: -60,
      diffLeft: 20,
    }),

    new Platform({
      x: smallPlatformCandy.width * 6.5 + extraSmallPlatformCandy.width * 2,
      y: 533,
      image: platformCandy,
      width: 505,
      diffLeft: 40,
      diffRight: 0,
    }),
  ];

  GenericObjects = [
    new GenericObject({ x: -2040, y: 0, image: imgBackgroundLvl4 }),

    new GenericObject({ x: 0, y: 0, image: imgBackgroundLvl4 }),
    new GenericObject({ x: 2040, y: 0, image: imgBackgroundLvl4 }),
    new GenericObject({ x: 2040 - 370, y: 250, image: platformPortal }),
  ];
  scrollOffset = 0;

  player.sprites.run = {
    right: humanRunRight,
    left: humanRunLeft,
    cropWidth: 150,
    width: 127.875,
    height: 300,
  };
  player.sprites.stand = {
    right: humanIdle,
    left: humanIdle,
    cropWidth: 150,
    width: 127.875,
    height: 300,
  };
}

function initLvl4() {
  textLines = [
    [
      { speed: speeds.normal, string: 'Soul - ' },
      { speed: speeds.fast, string: 'Sérieusement ?' },
      { speed: speeds.pause, string: '', pause: true },
      { speed: speeds.fast, string: 'Un caillou maintenant ?' },
    ],
    [
      { speed: speeds.normal, string: 'Hadraniel - ' },
      { speed: speeds.pause, string: '', pause: true },
      { speed: speeds.fast, string: 'Ça doit \u00EAtre dur…' },
    ],
    [
      { speed: speeds.normal, string: 'Soul - ' },
      { speed: speeds.fast, string: 'Très drôle. Avoue-le !' },
      { speed: speeds.pause, string: '', pause: true },
      {
        speed: speeds.fast,
        string: 'C\u0027est toi qui m\u0027inflige \u00E7a !',
      },
    ],
    [
      { speed: speeds.normal, string: 'Hadraniel - ' },
      { speed: speeds.fast, string: 'Oh ! Tu as deviné ça tout seul ?' },
    ],
    [
      {
        speed: speeds.fast,
        string: 'Soul - Salaud !',
      },
    ],
    [
      { speed: speeds.normal, string: 'Hadraniel - ' },
      { speed: speeds.fast, string: '“Fuit en ricanant”' },
    ],
  ];
  switchButton.style.visibility = 'visible';
  deleteSpans();
  characters = [];
  currentTextIndex = 0;
  openText();
  startText(textLines);
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
    new Platform({
      x: 30,
      y: 250,
      image: platformPortal,
      width: 20,
      diffLeft: 20,
      diffRight: 0,
    }),
    new Platform({
      x: -1,
      y: 505,
      image: platformDarkForest,
      width: 505,
      diffLeft: 40,
      diffRight: 0,
    }),

    new Platform({
      x: platformDarkForest.width * 2 - 400,
      y: 305,
      image: smallPlatformDarkForest,
      width: 301,
      diffRight: -80,
      diffLeft: 20,
    }),

    new Platform({
      x: platformDarkForest.width * 2 - 100,
      y: 105,
      image: smallPlatformDarkForest,
      width: 301,
      diffRight: -80,
      diffLeft: 20,
    }),
    new Platform({
      x: platformDarkForest.width * 3 - 100,
      y: 405,
      image: extraSmallPlatformDarkForest,
      width: 150,
      diffRight: -90,
      diffLeft: 20,
    }),

    new Platform({
      x: platformDarkForest.width * 3 + 180,
      y: 105,
      image: platformDarkForest,
      width: 505,
      diffLeft: 40,
      diffRight: 0,
    }),
    new Platform({
      x: platformDarkForest.width * 4 + 380,
      y: 505,
      image: extraSmallPlatformDarkForest,
      width: 150,
      diffRight: -90,
      diffLeft: 20,
    }),
  ];

  GenericObjects = [
    new GenericObject({ x: -2040, y: 0, image: imgBackgroundLvl5 }),

    new GenericObject({ x: 0, y: 0, image: imgBackgroundLvl5 }),
    new GenericObject({ x: 2040 - 1, y: 0, image: imgBackgroundLvl5 }),
    new GenericObject({ x: 2040 - 370, y: 250, image: platformPortal }),
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

function initLvl6() {
  const end = document.querySelector('.end');
  end.style.display = 'block';
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
    console.log(scrollOffset);
    if (scrollOffset > 2100) {
      if (currentLevel === 1) initLvl2();
      else if (currentLevel === 2) initLvl3();
      else if (currentLevel === 3) initLvl4();
      else if (currentLevel === 4) initLvl5();
      else if (currentLevel === 5) console.log('Bravo pélo');
    }
  }

  if (player.position.y > canvas.height) {
    if (currentLevel === 1) init();
    else if (currentLevel === 2) {
      initLvl2();
    } else if (currentLevel === 3) initLvl3();
    else if (currentLevel === 4) initLvl4();
    else if (currentLevel === 5) initLvl5();
  }
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >=
        platform.position.x + platform.diffLeft &&
      player.position.x <=
        platform.position.x + platform.width + platform.diffRight
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
        player.velocity.y -= 25;
        jump = false;
        doubleJump = true;
      } else if (doubleJump) {
        player.velocity.y -= 25;
        doubleJump = false;
      }

      break;
    case 83:
      break;
  }
});

// Code de speech.js

var container = document.querySelector('.text');

var speeds = {
  pause: 500,
  slow: 120,
  normal: 90,
  fast: 40,
  superFast: 10,
};

var textLines = [
  { speed: speeds.slow, string: 'Oh, hello!' },
  { speed: speeds.pause, string: '', pause: true },
  { speed: speeds.normal, string: 'Have you seen my pet' },
  { speed: speeds.fast, string: 'frog', classes: ['green'] },
  { speed: speeds.normal, string: 'around?' },
];

var textLines2 = [
  { speed: speeds.slow, string: 'Oh, hi!' },
  { speed: speeds.pause, string: '', pause: true },
  { speed: speeds.normal, string: 'Have you seen my pet' },
  { speed: speeds.fast, string: 'snake', classes: ['green'] },
  { speed: speeds.normal, string: 'around?' },
];

var characters = [];

function startText(lines) {
  lines.forEach((line, index) => {
    if (index < lines.length - 1) {
      line.string += ' ';
    }

    line.string.split('').forEach((character) => {
      var span = document.createElement('span');
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
  var next = list.splice(0, 1)[0];
  next.span.classList.add('revealed');
  next.classes.forEach((c) => {
    next.span.classList.add(c);
  });
  var delay = next.isSpace && !next.pause ? 0 : next.delayAfter;

  if (list.length > 0) {
    setTimeout(function () {
      revealOneCharacter(list);
    }, delay);
  }
}

function switchText() {
  container.innerHTML = '';
  characters = [];
  startText(textLines2);
}

var switchButton = document.querySelector('.switch-button');
switchButton.addEventListener('click', switchText);

startText(textLines);

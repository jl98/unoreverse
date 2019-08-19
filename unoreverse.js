let isSpinning = true;

const offWhite = '#ffd';
const reverseRed = 'red';
const black = 'black';

const strokeWidth = 4;
const rotateY = 0.2;
const rotateX = 0.06;

// Arrow Shape
const baseWidth = 3;
const baseLength = 15;
const pointWidth = 5;
const pointLength = 8;
const cornerStart = 5;
const arrowDistance = 1;


// set canvas size
let canvas = document.getElementsByClassName('zdog-canvas');
let ctx = canvas[0].getContext('2d');
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// get text
let unoText = document.getElementById('uno');
let reverseText = document.getElementById('reverse');
unoText.style.order = 1;
reverseText.style.order = 2;

// create illo
let illo = new Zdog.Illustration({
  // set canvas with selector
  element: '.zdog-canvas',
  dragRotate: true,
  zoom: 4,
  onDragStart: function() {
    isSpinning = false;
  },
});


let cardGroup = new Zdog.Group({
  addTo: illo,
});

let cardBorder = new Zdog.RoundedRect({
  addTo: cardGroup,
  width: 80,
  height: 120,
  stroke: strokeWidth,
  color: offWhite,
  cornerRadius: 8,
  fill: true,
});

let cardInside = new Zdog.RoundedRect({
  addTo: cardGroup,
  width: 70,
  height: 110,
  stroke: strokeWidth,
  color: reverseRed,
  fill: true,
});

let cardRing = new Zdog.Ellipse({
  addTo: cardGroup,
  width: 50,
  height: 110,
  color: offWhite,
  stroke: strokeWidth,
  rotate: { z: Zdog.TAU/10 },
});

let reverseGroup = new Zdog.Group({
  addTo: cardGroup,
  rotate: {z: Zdog.TAU / 8}
})

// Down shadow
let Arrow = new Zdog.Shape({
  addTo: reverseGroup,
  color: black,
  stroke: strokeWidth+1,
  fill: true,
  path: [
    {x: -baseWidth, y: 0},
    {x: -baseWidth, y: baseLength},
    {x: -(baseWidth + pointWidth), y: baseLength},
    {x: 0, y: baseLength + pointLength},
    {x: baseWidth + pointWidth, y: baseLength},
    {x: baseWidth, y: baseLength},
    {x: baseWidth, y: cornerStart},
    { arc: [
      {x: baseWidth, y: 0},
      {x: 0, y: 0}, // end point
    ]},
  ],
  translate: {
    x: baseWidth + strokeWidth / 4,
    y: -cornerStart + arrowDistance + 1
  }
});

// Up shadow
Arrow.copy({
  rotate: {z: Zdog.TAU / 2},
  translate: {
    x: -(0.75 + baseWidth + strokeWidth / 4),
    y: cornerStart
  },
  stroke: strokeWidth+1,
  color: black,
})

// Down Arrow
Arrow.copy({
  translate: {
    x: 0.75 + baseWidth + strokeWidth / 4,
    y: -cornerStart + arrowDistance
  },
  color: offWhite,
  stroke: strokeWidth/2,
})

// Up Arrow
Arrow.copy({
  rotate: {z: Zdog.TAU / 2},
  translate: {
    x: -(0.75 + baseWidth + strokeWidth / 4),
    y: cornerStart - arrowDistance
  },
  color: offWhite,
  stroke: strokeWidth/2,
})

// Bottom Right Reverse
reverseGroup.copyGraph({
  translate: {x: 25, y: 40},
  scale: 0.6,
})

// Top Left Reverse
reverseGroup.copyGraph({
  translate: {x: -25, y: -40},
  scale: 0.6,
})


function animate() {
  // rotate illo each frame
  if ( isSpinning ) {
    illo.rotate.y += rotateY;
    illo.rotate.x += rotateX;
  }
  illo.updateRenderGraph();
  // animate next frame
  requestAnimationFrame( animate );
}

animate();

let ticker = setInterval(() => {
  [reverseText.style.order, unoText.style.order] = [unoText.style.order, reverseText.style.order];
}, 500)
// start animation

// send em back
setTimeout(() => {window.history.back()}, 3000);
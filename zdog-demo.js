// zdog-demo.js

const TAU = Zdog.TAU;
const offWhite = '#FED';
const gold = '#EA0';
const garnet = '#C25';
const eggplant = '#636';

let isSpinning = true;
let hipX = 3;
let armSize = 6;

// create illo
let illo = new Zdog.Illustration({
  // set canvas with selector
  element: '.zdog-canvas',
  zoom: 20,
  dragRotate: true,
  onDragStart: function() {
    isSpinning = false;
  },
});

let hips = new Zdog.Shape({
  addTo: illo,
  path: [ { x: -hipX }, { x: hipX } ],
  stroke: 4,
  color: eggplant,
});

let spine = new Zdog.Anchor({
  addTo: hips,
  rotate: { x: TAU/8 },
});

let chest = new Zdog.Shape({
  addTo: spine,
  path: [ { x: -1.5 }, { x: 1.5 } ],
  // position right above hips
  // ( hips.stroke + chest.stroke ) / 2
  translate: { y: -6.5 },
  stroke: 9,
  color: garnet,
});

let head = new Zdog.Shape({
  addTo: chest,
  stroke: 12,
  color: gold,
  translate: { y: -9 },
});

let eye = new Zdog.Ellipse({
  addTo: head,
  diameter: 2,
  quarters: 2, // semi-circle
  translate: { x: -2, y: 1, z: 4.5 },
  // // rotate semi-circle to point up
  rotate: { z: -TAU/4 },
  color: eggplant,
  stroke: 0.5,
  // // hide when front-side is facing back
  backface: false,
});

eye.copy({
  translate: { x: 2, y: 1, z: 4.5 },
});

// smile
new Zdog.Ellipse({
  addTo: head,
  diameter: 3,
  quarters: 2,
  translate: { y: 2.5, z: 4.5 },
  rotate: { z: TAU/4 },
  closed: true,
  color: offWhite,
  stroke: 0.5,
  fill: true,
  backface: false,
});


let leg = new Zdog.Shape({
  addTo: hips,
  path: [ { y: 0 }, { y: 6 } ],
  translate: { x: -hipX },
  color: eggplant,
  stroke: 4,
  rotate: { x: TAU/4 },
});

let shin = new Zdog.Shape({
  addTo: leg,
  path: [ { y: 0 }, { y: 6 } ],
  translate: { y: 6},
  color: gold,
  stroke: 4,
  rotate: { x: -TAU/16 },

})


// foot
let foot = new Zdog.RoundedRect({
  addTo: shin,
  width: 2,
  height: 4,
  cornerRadius: 1,
  // y: past leg end, z: scootch toward front
  translate: { y: 8, z: 2 },
  color: garnet,
  fill: true,
  stroke: 4,
  rotate: { x: Zdog.TAU/4 }
});

// leg on right
let standLeg = leg.copy({
  translate: { x: hipX },
  rotate: { x: -TAU/16 },
});

let standShin = shin.copy({
  addTo: standLeg,
  translate: {y: 6},
  rotate: { x: -TAU/16 },
})
// stand foot
foot.copy({
  addTo: standShin,
  rotate: { x: -TAU/8 },
});

// left arm
let upperArm = new Zdog.Shape({
  addTo: chest,
  path: [ { y: 0 }, { y: armSize } ],
  translate: { x: -5, y: -2 },
  rotate: { x: -TAU/4 },
  color: eggplant,
  stroke: 4,
});

let forearm = new Zdog.Shape({
  addTo: upperArm,
  path: [ { y: 0 }, { y: armSize } ],
  translate: {y: armSize},
  rotate: { x: TAU/8 },
  color: gold,
  stroke: 4,
});

new Zdog.Shape({
  addTo: forearm,
  // connect to end of forearm
  // scootch toward front a bit
  translate: { y: armSize, z: 1 },
  stroke: 6,
  color: gold,
});

upperArm.copyGraph({
  translate: {x: 5, y: -2},
  rotate: { x: TAU/4 },
});

// update & render
illo.updateRenderGraph();

function animate() {
  // rotate illo each frame
  if ( isSpinning ) {
    illo.rotate.y += 0.03;
  }
  illo.updateRenderGraph();
  // animate next frame
  requestAnimationFrame(animate);
}
// start animation
animate();
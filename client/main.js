let canvas;
let ctx;
let socket; 
let hash;
let animationFrame;

let circles = {}; //list of users
let pickups = {}; //list of pickups
let scores = {};  //list of users who scored a point

//handle for key down events
//code taken from the inclass physics example
const keyDownHandler = (e) => {
  var keyPressed = e.which;
  const circle = circles[hash];

  // W OR UP
  if(keyPressed === 87 || keyPressed === 38) {
    circle.moveUp = true;
  }
  // A OR LEFT
  else if(keyPressed === 65 || keyPressed === 37) {
    circle.moveLeft = true;
  }
  // S OR DOWN
  else if(keyPressed === 83 || keyPressed === 40) {
    circle.moveDown = true;
  }
  // D OR RIGHT
  else if(keyPressed === 68 || keyPressed === 39) {
    circle.moveRight = true;
  }
};

//handler for key up events
//code taken from the inclass physics example
const keyUpHandler = (e) => {
  var keyPressed = e.which;
  const circle = circles[hash];

  // W OR UP
  if(keyPressed === 87 || keyPressed === 38) {
    circle.moveUp = false;
  }
  // A OR LEFT
  else if(keyPressed === 65 || keyPressed === 37) {
    circle.moveLeft = false;
  }
  // S OR DOWN
  else if(keyPressed === 83 || keyPressed === 40) {
    circle.moveDown = false;
  }
  // D OR RIGHT
  else if(keyPressed === 68 || keyPressed === 39) {
    circle.moveRight = false;
  }
};

const init = () => {
  canvas = document.querySelector('#canvas');
  ctx = canvas.getContext('2d');

  socket = io.connect();

  socket.on('joined', setUser);
  socket.on('updatedMovement', update);
  socket.on('left', removeUser);
    socket.on('pickUpRefill', (data) =>{
        pickups = data;
    });
    socket.on('pointScored', (data) => {
        //change to an update scoreboard method in update
        circles[data.hash].score = data.score;
        circles[data.hash].radius = data.radius;
        scores[data.hash] = data;
        console.log("user " + data.hash + " got a point");
    });

  document.body.addEventListener('keydown', keyDownHandler);
  document.body.addEventListener('keyup', keyUpHandler);
};

window.onload = init;
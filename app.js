const canvas = document.getElementById("gameCanvas"); // Get the canvas element by ID
const ctx = canvas.getContext("2d"); // Get the 2D rendering context

let obj=JSON.parse(localStorage.getItem("userDetails"));
let name=obj.name;
let nickName=obj.nickName;


// Define initial parameters for paddles, ball, scores, and game settings
let paddleWidth = 11;
let paddleHeight = 100;
let paddleSpeed = 20;
let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;

let ballSize = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;

var backgroundImage = new Image(); 
backgroundImage.src = 'space-backgroundhigh-quality8k-upscaled (1).png';
ctx.drawImage(backgroundImage, 0, 0); 

let playerScore = 0;
let computerScore = 0;
let maxScore = 5;

// Function to draw the paddles
function drawPaddle(x, y) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

// Function to draw the ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}

// Function to draw the center divider
function drawDivider() {
  ctx.beginPath();
  ctx.setLineDash([5, 15]);
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.strokeStyle = "#fff";
  ctx.stroke();
  ctx.closePath();
}

// Function to handle ball movement and collisions
function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Check collision with top and bottom edges
  if (ballY - ballSize < 0 || ballY + ballSize > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // Check collision with left and right paddles
  if (
    (ballX - ballSize < paddleWidth &&
      ballY + ballSize >= leftPaddleY &&
      ballY - ballSize <= leftPaddleY + paddleHeight &&
      ballX - ballSize > 0) ||
    (ballX + ballSize > canvas.width - paddleWidth &&
      ballY + ballSize >= rightPaddleY &&
      ballY - ballSize <= rightPaddleY + paddleHeight &&
      ballX + ballSize < canvas.width)
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Scoring logic
  if (ballX - ballSize <= 0) {
    playerScore++;
    reset();
  } else if (ballX + ballSize >= canvas.width) {
    computerScore++;
    reset();
  }
}

// Function to draw the scores on the canvas
function drawScores() {
  ctx.fillStyle = "#fff";
  ctx.font = "30px Death Star";
  ctx.fillText(`Computer: ${computerScore}`, 50, 30);
  ctx.fillText(`${nickName}: ${playerScore}`, canvas.width - 170, 30);
  console.log(playerScore)
  localStorage.setItem("compScore",computerScore);
  localStorage.setItem("playerScore",playerScore);
}

// Function to reset the ball position
function reset() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
}

// Function to draw the game elements on the canvas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawDivider();
  drawPaddle(0, leftPaddleY);
  drawPaddle(canvas.width - paddleWidth, rightPaddleY);
  drawBall();
  moveBall();
  drawScores();
  moveAIPaddle();

  // Check for game end condition
  if (playerScore === maxScore || computerScore === maxScore) {
    // Redirect to gameover.html
    window.location.href = "gameover.html";
    return; // Stop the game loop
  }

  requestAnimationFrame(draw);
}

// Function to move the AI-controlled paddle
function moveAIPaddle() {
  const paddleCenter = leftPaddleY + paddleHeight / 2;
  const errorChance = Math.random(); // introduce randomness for occasional errors

  if (errorChance < 0.2) {
    if (paddleCenter < ballY - 35) {
      leftPaddleY += paddleSpeed;
    } else if (paddleCenter > ballY + 35) {
      leftPaddleY -= paddleSpeed;
    }
  }
}

// Event listener for controlling the right paddle using arrow keys
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && rightPaddleY > 0) {
    rightPaddleY -= paddleSpeed;
  }
  if (event.key === "ArrowDown" && rightPaddleY < canvas.height - paddleHeight) {
    rightPaddleY += paddleSpeed;
  }
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
draw();

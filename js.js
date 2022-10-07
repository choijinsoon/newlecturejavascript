var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

var ballX = 50;
var ballY = 50;
var ballWidth = 50;
var ballHeight = 50;
var paddleWidth = 200;
var paddleHeight = 20;
var paddleX = canvas.width/2-paddleWidth/2;
var paddleY = canvas.height-paddleHeight;
var dx = 5;
var dy = 2;

function setupKeyboardListener(){
    document.addEventListener("keydown", keyDownHandler);
}



function drawPaddle(){
    ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight );
}

function drawBall(){
    ctx.fillRect(ballX, ballY, ballWidth, ballHeight);
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    keyDownHandler();
    ballX += dx;
    ballY += dy;

    if(ballX > canvas.width-ballWidth)
    dx = -dx;

    if(ballX < 0)
    dx = -dx;

    if(ballY > canvas.height-ballHeight)
    dy = -dy;

    if(ballY < 0)
    dy = -dy;

    if(e.keyCode = 37)
    paddleX -= dx;

    if(e.keyCode = 39)
    paddleX += dx;
}

setInterval(draw, 10);
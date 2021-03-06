var canvas;
var canvasContext;
var ballx = 50;
var SpeedX = 10;
var bally = 50;
var SpeedY = 4;
var player1score = 0;
var player2score = 0;
const WINNING_SCORE = 3;
var showingWinScreen = false;
var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;
function calculateMousePos(evt)
{
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return{
    x:mouseX,
    y:mouseY
  };
}
function handleMouseClick(evt)
{
  if(showingWinScreen)
  {
    player1score = 0;
    player2score = 0;
    showingWinScreen = false;
  }
}
window.onload = function()
{
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  var FramesPerSeconds = 30;
  setInterval (function()
  {
      moveEverything();
      drawEverything();
  }, 1000/FramesPerSeconds);
  canvas.addEventListener('mousedown', handleMouseClick);
  canvas.addEventListener('mousemove',
    function(evt){
        var mousePos = calculateMousePos(evt);
        paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
    });
}
function ballReset()
{
  if(player1score >= WINNING_SCORE || player2score >= WINNING_SCORE)
  {
    showingWinScreen = true;
  }
  SpeedX = -SpeedX;
  ballx = canvas.width/2;
  bally = canvas.height/2;
}
function computerMovement()
{
  var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
  if(paddle2YCenter < bally - 35)
  {
    paddle2Y +=  6;
  }
  else if (paddle2YCenter > bally + 35)
  {
    paddle2Y -= 6;
  }
}
function moveEverything()
{
  if(showingWinScreen)
  {
      return;
  }
  computerMovement();
  ballx +=  SpeedX;
  bally +=  SpeedY;
  if (bally < 0)
  {
    SpeedY = -SpeedY;
  }
  if (bally > canvas.height)
  {
    SpeedY = -SpeedY;
  }
  if (ballx < 0)
  {
    if(bally > paddle1Y && bally < paddle1Y + PADDLE_HEIGHT)
    {
      SpeedX = -SpeedX;
      var deltaY = bally - (paddle1Y + PADDLE_HEIGHT/2);
      SpeedY = deltaY * 0.35;
    }
    else
    {
      player2score++; //Must be before the ball reset
      ballReset();
    }
  }
  if (ballx > canvas.width)
 {
    if(bally > paddle2Y && bally < paddle2Y + PADDLE_HEIGHT)
    {
      SpeedX = -SpeedX;
      var deltaY = bally - (paddle2Y + PADDLE_HEIGHT/2);
      SpeedY = deltaY * 0.35;
    }
    else
    {
      player1score++; //Must be before the ball reset
      ballReset();
    }
  }
}
function drawNet()
{
  for( var i = 0; i < canvas.height; i+=40)
  {
    ColorRect(canvas.width/2-1,i,2,20, 'white');
  }
}
function drawEverything()
{
  //Drawing the background
  ColorRect(0,0,canvas.width,canvas.height, 'black');
  if(showingWinScreen)
  {
    canvasContext.fillStyle = 'white';
    if(player1score>= WINNING_SCORE)
    {
      canvasContext.fillText("Left Player Won!" ,350,200);
    }
    else if(player2score >= WINNING_SCORE)
    {
       canvasContext.fillText("Right Player Won!" ,350,200);
    }
      
      canvasContext.fillText("Click to Continue" ,350,500);
      return;
  }
drawNet();
  //Drawing the player paddle
  ColorRect(0,paddle1Y,PADDLE_THICKNESS,100, 'white');
    //Drawing the computer paddle
  ColorRect(canvas.width - PADDLE_THICKNESS ,paddle2Y,PADDLE_THICKNESS,100, 'white');
  //Drawing the ball
  colorCircle(ballx, bally, 10,'white');
  canvasContext.fillText(player1score,100,100);
  canvasContext.fillText(player2score, canvas.width -100,100);
}
function colorCircle(centerX, centerY, radius, drawColor)
{
  canvasContext.fillStyle = 'drawColor';
  canvasContext.beginPath();
  canvasContext.arc(centerX,centerY,radius,0,Math.PI*2, true);
  canvasContext.fill();
}
function ColorRect(leftX,topY,width,height,drawColor)
{
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX,topY,width,height);
}
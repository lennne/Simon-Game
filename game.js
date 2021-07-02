var buttonColours=["red","blue","green","yellow"]
var gamePattern=[];
userClickedPattern = [];
var started = false;
var level = 0;
var currentLevel;
var indexOfLastAnswer;
var randomChosenColour;

$(document).keydown(function(){
  if (!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});



function nextSequence(){
  userClickedPattern = [];
 level++;

var randomNumber = Math.floor(Math.random()*4) ;
randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);

$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);


 playSound(randomChosenColour);

 $("#level-title").text("Level "+ level);

}

$(".btn").click( function(event) {
var userChosenColour = event.target.id;
userClickedPattern.push(userChosenColour);
indexOfLastAnswer = userClickedPattern.length-1;
playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(indexOfLastAnswer);
});

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3" );
   audio.play();

}

function checkAnswer(currentLevel) {
  console.log(gamePattern[currentLevel]);
  console.log(userClickedPattern[currentLevel]);
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");
    if (gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else {
    console.log("Wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
}
}

function startOver(){
  started = false;
  gamePattern = [];
  level=0;
}

function animatePress(currentColour){

    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
      $("#" + currentColour).removeClass("pressed");
    }, 100);
}

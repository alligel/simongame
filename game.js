
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//Disable button before getting started
$(".btn").click(function(event){
  if (level < 1) {
  event.stopImmediatePropagation();
  }
});

//started
$("#start-btn").click(function() {
  if ( !started ) {
    $("#level-title").text("Level " + level);
    $("#start-btn").text("Now Playing");
    nextSequence();
    started = true;
  }
});

//button click
$(".btn").click(function(){
var userChosenColour = $(this).attr("id");
userClickedPattern.push(userChosenColour);

playSound(userChosenColour);
animatePress(userChosenColour);

checkAnswer(userClickedPattern.length-1);

});

//Set keydown buttons
$(document).ready(function(){
  $(this).keydown(function(event){
    if(event.keyCode === 87 || event.keyCode === 38){
      event.preventDefault();
      $("#green").click();
    }
    if(event.keyCode === 65 || event.keyCode === 37) {
      event.preventDefault();
      $("#red").click();
    }
    if(event.keyCode === 68 || event.keyCode === 39) {
      event.preventDefault();
      $("#yellow").click();
    }
    if(event.keyCode === 83 || event.keyCode === 40) {
      $("#blue").click();
    }
  });
});

//Check Answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over");
    $("#start-btn").text("Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();

  }
}

//next sequence
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//play Sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//animate press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Restart
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

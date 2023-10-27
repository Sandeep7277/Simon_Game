var buttonColors =["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level =0;

function nextSequence(){

    var randomNo = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomNo];
    gamePattern.push(randomChosenColour);
    sound(randomChosenColour);
    pressed(randomChosenColour);
    level++;
    $("#level-title").html("Level "+level)
    userClickedPattern=[];
    // console.log("Game "+gamePattern);
}

$(document).ready(function(){
    $(".btn").click(function(){
        var color= $(this).attr("id"); 
        pressed(color);
        sound(color);       
        if(level===0){
            sound("wrong");
            gameOver();
        }else{
            userClickedPattern.push(color);
            // console.log("user "+userClickedPattern);
            // console.log("gv "+gamePattern[userClickedPattern.length-1]);
            // console.log("uv "+userClickedPattern[userClickedPattern.length-1]);

            if(gamePattern[userClickedPattern.length-1] != userClickedPattern[userClickedPattern.length-1]){  
                sound("wrong");
                gameOver();
                level=0;
                $("#level-title").html("Game over, Press a key to restart game");
                gamePattern=[];
                userClickedPattern=[];
            }else{
                var matched=true;
                for(var i=0; i<gamePattern.length; i++){
                    if(gamePattern[i] != userClickedPattern[i]){ 
                    matched=false;
                    }
                }
            }
            if(matched){
                nextSequence();
            }
        }
    
    })

$(document).keypress(function(){
    if(level===0){
    nextSequence();
    }
})  
})

function pressed(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");

    },100);
}

function sound(color){
    switch(color){
        case "red":
            var audio = new Audio("sounds//red.mp3");
            audio.play();
            break;
        case "blue":
            var audio = new Audio("sounds//blue.mp3");
            audio.play();
            break;
        case "green":
            var audio = new Audio("sounds//green.mp3");
            audio.play();
            break;
        case "yellow":
            var audio = new Audio("sounds//yellow.mp3");
            audio.play();
            break;
        case "wrong":
            var audio = new Audio("sounds//wrong.mp3");
            audio.play();
            break;
    }
}
function gameOver(){
    $("body").attr("class","game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },100);
}
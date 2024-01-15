var lvl=0;
var start=false;
var gamePattern=[];
var userClickedPattern=[];
var buttCol=["red","blue","green","yellow"];

$(document).keypress(function(){
    if(!start){
        nextSequence();
        $("h1").text("Level "+lvl);
        start=true;
    }
});


$(".btn").on("click",function(){
    var col=$(this).attr("id");
    animatePress(col);
    makeSound(col);
    userClickedPattern.push(col);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(lastCol)
{
    if(gamePattern[lastCol]===userClickedPattern[lastCol])
    {
        if(gamePattern.length===userClickedPattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        $("body").addClass("game-over");
        $("h1").text("Game Over! Press any Key to Start");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);


        startOver();
    }
}

function animatePress(currCol){
    $("#"+currCol).addClass("pressed");

    setTimeout(function(){
        $("#"+currCol).removeClass("pressed");  
    }, 100);
}; 


function nextSequence(){
    userClickedPattern=[];
    lvl++;
    $("h1").text("Level "+lvl);

    var rand=Math.floor(Math.random()*3);
    var randCol=buttCol[rand];

    $("#"+randCol).fadeOut(100).fadeIn(100);
    makeSound(randCol);
    gamePattern.push(randCol);

};

function makeSound(col)
{
    switch(col){
        case "red":
            var r=new Audio('./sounds/red.mp3');
            r.play();
            break;
        case "blue":
            var b=new Audio("./sounds/blue.mp3");
            b.play();
            break;    
        case "yellow":
            var y=new Audio("./sounds/yellow.mp3");
            y.play();
            break;
        case "green":
            var g=new Audio("./sounds/green.mp3");
            g.play();
            break;
        default:
            var w=new Audio("./sounds/wrong.mp3");
            w.play();
            break;            
    }
};

function startOver()
{
    lvl=0;
    start=false;
    gamePattern=[];
}
let character1 = document.getElementById("character1");

//speed in each direction for P1
var rSpeedP1 = 3;
var lSpeedP1 = 3;
var uSpeedP1 = 3;
var dSpeedP1 = 3;

var interval;

function moveLeft(){
    let left = 
    parseInt(window .getComputedStyle(character1).getPropertyValue("left"));
    character1.style.left = left - lSpeedP1 + "px";
}

document.addEventListener('keydown', function(e){

    switch(e.keyCode){
        case 37: //vänster pil knapp
            interval = setInterval(moveLeft, 1);
    }
});

document.addEventListener('keyup', function(e){

    switch(e.keyCode){
        case 37: //vänster pil knapp
            interval = clearInterval()
    }
});
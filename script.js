`use strict`
import Character from "./character.js";

const speed = 3;
const characterWidth = 20;
const characterHeight = 30;

var paused = true;

const character1 = new Character(
    document.getElementById("character1"),
    0,
    0,
    characterWidth,
    characterHeight,
    speed,
    "ArrowRight",
    "ArrowLeft",
    "ArrowDown",
    "ArrowUp",
    "."
);
const character2 = new Character(
    document.getElementById("character2"),
    0,
    0,
    characterWidth,
    characterHeight,
    speed,
    "d",
    "a",
    "s",
    "w",
    "g"
);
const characters = [character1, character2];

document.getElementById("character1").style.width = `${characterWidth}px`;
document.getElementById("character1").style.height = `${characterHeight}px`;
document.getElementById("character2").style.width = `${characterWidth}px`;
document.getElementById("character2").style.height = `${characterHeight}px`;


const map = document.getElementById("map");

const mapWidth = 600;
const mapHeight = 450;
map.style.width = `${mapWidth}px`;
map.style.height = `${mapHeight}px`;
const mapRightEdge = mapWidth - characterWidth;
const mapBottomEdge = mapHeight - characterHeight;

console.log(map.style.height);




startMenu();

function start(){
    document.getElementById("HP" + character1.playerNumber).innerHTML = "Player" + character1.playerNumber + ": " + character1.hp;
    document.getElementById("HP" + character2.playerNumber).innerHTML = "Player" + character2.playerNumber + ": " + character2.hp;
    on();
    gameLoop();
    character1.registerMovementActivity();
    character2.registerMovementActivity();
    character1.registerHitPress(characters);
    character2.registerHitPress(characters);
}

function gameLoop() {
    character1.computeMovement(mapRightEdge, mapBottomEdge);
    character2.computeMovement(mapRightEdge, mapBottomEdge);
    character1.moveCharacter();
    character2.moveCharacter();
    window.requestAnimationFrame(() => {
        gameLoop();
    })   
}



function startMenu(){
    document.getElementById ("playerVsPlayer").addEventListener ("click", pvpButtonhandler, false);
    document.getElementById ("playerVsAI").addEventListener ("click", pvaiButtonhandler, false);
    document.getElementById ("AIVsAI").addEventListener ("click", avaiButtonhandler, false);
    document.getElementById ("startButton").addEventListener ("click",start, false);
    setCommandKeys();

}

function setCommandKeys(){
    document.onkeydown = function(evt) {
        if (evt.key == "Escape") {
            if (paused){
                on();
            }
            else{
                off();
            }
        }
    }

}

function pvpButtonhandler(){
    document.getElementById("menubuttons").style.display = "none";
    document.getElementById("startButton").style.display = "block";
}

function pvaiButtonhandler(){
    document.getElementById("menubuttons").style.display = "none";
    document.getElementById("chooseAi").style.display = "block";
    document.getElementById("startButton").style.display = "block";

    // troligen borde det göras om så att AIn håller koll på karaktären och inte tvärt om som det är nu (t.ex AI1.control(character1);)
    // men sätter det såhär temprärt eftersom vi inte har en AI klass ännu
    if(document.getElementById("character1 ai1").checked){
        character1.applyAi1();
    }
    else if(document.getElementById("character1 ai2").checked){
        character1.applyAi2();
    }

    else if(document.getElementById("character2 ai1").checked){
        character2.applyAi1();
    }
    else if (document.getElementById("character2 ai2").checked){
        character2.applyAi2();
    }

}

function avaiButtonhandler(){
    document.getElementById("menubuttons").style.display = "none";
    document.getElementById("chooseAi").style.display = "block";
    document.getElementById("startButton").style.display = "block";

    if(document.getElementById("character1 ai1").checked()){
        character1.applyAi1();
    }
    else{
        character1.applyAi2();
    }

    if(document.getElementById("character2 ai1").checked()){
        character2.applyAi1();
    }
    else{
        character2.applyAi2();
    }
}

function on() {
    document.getElementById("mainMenu").style.display = "none";
    document.getElementById("startButton").style.display = "none";
    document.getElementById("menubuttons").style.display = "block";
    paused=false;
}

function off() {
    document.getElementById("mainMenu").style.display = "block";
    document.getElementById("chooseAi").style.display = "none";
    paused=true;
}




`use strict`
import Character from "./character.js";

const speed = 3;
const characterWidth = 20;
const characterHeight = 30;

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
gameLoop();
character1.registerMovementActivity();
character2.registerMovementActivity();
character1.registerHitPress(characters);
character2.registerHitPress(characters);

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
    document.getElementById ("playerVsAI").addEventListener ("click", pvaButtonhandler, false);
    document.getElementById ("AIVsAI").addEventListener ("click", avaButtonhandler, false);
    setCommandKeys();

    
}

function setCommandKeys(e){
    document.onkeydown = function(evt) {
        if (evt.key == "Escape") {
            on();
        }
    }

}

function pvpButtonhandler(){
    off();
}

function pvaButtonhandler(){
    off();
}
function avaButtonhandler(){
    off();
}

function on() {
    document.getElementById("mainMenu").style.display = "block";
    //Paused=true;
}

function off() {
    document.getElementById("mainMenu").style.display = "none";
    //Paused=false;
}



`use strict`
import Character from "./character.js";

const speed = 5;

const character1 = new Character(
    document.getElementById("character1"),
    100,
    100,
    speed,
    "ArrowRight",
    "ArrowLeft",
    "ArrowDown",
    "ArrowUp"
);
const character2 = new Character(
    document.getElementById("character2"),
    100,
    100,
    speed,
    "d",
    "a",
    "s",
    "w"
);

const characterWidth = 20;
const characterHeight = 30;

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


function gameLoop() {
    character1.computeMovement(mapRightEdge, mapBottomEdge);
    character2.computeMovement(mapRightEdge, mapBottomEdge);
    character1.moveCharacter();
    character2.moveCharacter();
    window.requestAnimationFrame(() => {
        gameLoop();
    })
}

gameLoop(character1, character2);
character1.registerKeyActivity();
character2.registerKeyActivity();

import Player from "./Player.js";
`use strict`

const speed = 3;
const characterWidth = 20;
const characterHeight = 30;
let isPaused = true;
const gameModes = {
    pvp: "pvp",
    playerVsAi: "player-vs-ai",
    aiVsAi: "ai-vs-ai"
}
let gameMode = gameModes.pvp;
let char1;
let char2;
let chars = [];
const map = document.getElementById("map");

startProgram();


//#region Set character dimensions
document.getElementById("character1").style.width = `${characterWidth}px`;
document.getElementById("character1").style.height = `${characterHeight}px`;
document.getElementById("character2").style.width = `${characterWidth}px`;
document.getElementById("character2").style.height = `${characterHeight}px`;
//#endregion

//#region Set map dimensions.
const mapWidth = 600;
const mapHeight = 450;
map.style.width = `${mapWidth}px`;
map.style.height = `${mapHeight}px`;
const mapRightEdge = mapWidth - characterWidth;
const mapBottomEdge = mapHeight - characterHeight;
//#endregion

function startProgram() {
    addMenuEventListeners();
    addPauseKeyPressEventListener();
}

//#region Add event listener functions
function addMenuEventListeners() {
    document.getElementById("pvp-choice-btn").addEventListener("click", pvpChoiceBtnHandler);
    document.getElementById("player-vs-ai-choice-btn").addEventListener("click", playerVsAiChoiceBtnHandler)
    document.getElementById("ai-vs-ai-choice-btn").addEventListener("click", aiVsAiChoiceBtnHandler)
    document.getElementById("start-btn").addEventListener("click", beginGame)

}

function addPauseKeyPressEventListener() {
    document.addEventListener("keydown", (e) => {
        console.log(e);
        if (e.key === "Escape") {
            if (isPaused) {
                hideMenuAndResume();
            } else {
                showMenuAndPause();
            }
        }
    })
}
//#endregion

//#region Button handlers
function pvpChoiceBtnHandler() {
    gameMode = gameModes.pvp;
    hideGameModeChoiceBtns();
    showStartBtn();
}

function playerVsAiChoiceBtnHandler() {
    gameMode = gameModes.playerVsAi;
    changeRadioBtnsGrouping();
    hideGameModeChoiceBtns();
    showAiSelectionMenu();
    showStartBtn();
}

function aiVsAiChoiceBtnHandler() {
    gameMode = gameModes.aiVsAi;
    changeRadioBtnsGrouping();
    hideGameModeChoiceBtns();
    showAiSelectionMenu();
    showStartBtn();
}

function beginGame() {
    if (gameMode === gameModes.playerVsAi || gameMode === gameModes.aiVsAi) {
        console.log(isValidRadioBtnChoices());
        if (isValidRadioBtnChoices()) {
            if (gameMode === gameModes.playerVsAi) {
                initiatePlayerVsAiCharacters();
            } else {
                initiateAiVsAiCharacters();
            }
            document.getElementById("HP" + char1.characterNumber).innerHTML = "Player" + char1.characterNumber + ": " + char1.hp;
            document.getElementById("HP" + char2.characterNumber).innerHTML = "Player" + char2.characterNumber + ": " + char2.hp;
            hideMainMenu();
            chars.unshift(char1);
            chars.unshift(char2);
            gameLoop();
        }
    } else {
        initiatePvpCharacters();
        document.getElementById("HP" + char1.characterNumber).innerHTML = "Player" + char1.characterNumber + ": " + char1.hp;
        document.getElementById("HP" + char2.characterNumber).innerHTML = "Player" + char2.characterNumber + ": " + char2.hp;
        chars.unshift(char1);
        chars.unshift(char2);
        hideMainMenu();
        char1.registerMovementActivity();
        char2.registerMovementActivity();
        char1.registerHit(chars);
        char2.registerHit(chars);
        gameLoop();
    }
}
//#endregion


function gameLoop() {
    char1.computeMovement(mapRightEdge, mapBottomEdge);
    char2.computeMovement(mapRightEdge, mapBottomEdge);
    char1.updatePosition();
    char2.updatePosition();
    window.requestAnimationFrame(() => {
        gameLoop();
    })
}

function hideMenuAndResume() {
    hideMainMenu();
    hideStartBtn();
    showGameModeChoiceBtns();
    isPaused = false;
}

function showMenuAndPause() {
    showMainMenu();
    hideAiSelectionMenu();
    isPaused = true;
}

function isValidRadioBtnChoices() {
    if (gameMode === gameModes.playerVsAi) {
        let radioBtnsGroup = document.getElementsByName("ai-selection");
        for (let i = 0; i < radioBtnsGroup.length; i++) {
            if (radioBtnsGroup[i].checked) {
                return true;
            }
        }
        return false;
    } else if (gameMode === gameModes.aiVsAi) {
        let radioBtnsGroup1 = document.getElementsByName("ai-selection1");
        let radioBtnsGroup2 = document.getElementsByName("ai-selection2");
        let validRadioBtnsGroup1 = false;
        let validRadioBtnsGroup2 = false;
        for (let i = 0; i < radioBtnsGroup1.length; i++) {
            if (radioBtnsGroup1[i].checked) {
                validRadioBtnsGroup1 = true;
            }
        }
        for (let i = 0; i < radioBtnsGroup2.length; i++) {
            if (radioBtnsGroup2[i].checked) {
                validRadioBtnsGroup2 = true;
            }
        }
        return validRadioBtnsGroup1 && validRadioBtnsGroup2;
    }
}

function changeRadioBtnsGrouping() {
    if (gameMode === gameModes.playerVsAi) {
        document.getElementById("radio-btn-char1-ai1").setAttribute("name", "ai-selection");
        document.getElementById("radio-btn-char1-ai2").setAttribute("name", "ai-selection");
        document.getElementById("radio-btn-char2-ai1").setAttribute("name", "ai-selection");
        document.getElementById("radio-btn-char2-ai2").setAttribute("name", "ai-selection");
    } else if (gameMode === gameModes.aiVsAi) {
        document.getElementById("radio-btn-char1-ai1").setAttribute("name", "ai-selection1");
        document.getElementById("radio-btn-char1-ai2").setAttribute("name", "ai-selection1");
        document.getElementById("radio-btn-char2-ai1").setAttribute("name", "ai-selection2");
        document.getElementById("radio-btn-char2-ai2").setAttribute("name", "ai-selection2");
    }
}

//#region Initiate characters functions,
function initiatePlayerVsAiCharacters() {
    if (document.getElementById("radio-btn-char1-ai1").checked) {
        // char1 = new Ai1();
        // char2 = new Player();
    }
    else if (document.getElementById("radio-btn-char1-ai2").checked) {
        // char1 = new Ai2();
        // char2 = new Player();
    }

    else if (document.getElementById("radio-btn-char2-ai1").checked) {
        // char1 = new Player();
        // char2 = new Ai1();
    }
    else if (document.getElementById("radio-btn-char2-ai1").checked) {
        // char1 = new Player();
        // char2 = new Ai2();
    }
}

function initiateAiVsAiCharacters() {
    if (document.getElementById("radio-btn-char1-ai1").checked) {
        // char1 = new Ai1();
        // char2 = new Ai2();
    }
    else if (document.getElementById("radio-btn-char1-ai2").checked) {
        // char1 = new Ai2();
        // char2 = new Ai1();
    }

    if (document.getElementById("radio-btn-char2-ai1").checked) {
        // char1 = new Ai2();
        // char2 = new Ai1();
    }
    else if (document.getElementById("radio-btn-char2-ai2").checked) {
        // char1 = new Ai1();
        // char2 = new Ai2();
    }
}

function initiatePvpCharacters() {
    char1 = new Player(
        document.getElementById("character1"),
        4,
        0,
        0,
        characterWidth,
        characterHeight,
        speed,
        1,
        "ArrowRight",
        "ArrowLeft",
        "ArrowDown",
        "ArrowUp",
        "."
    );
    char2 = new Player(
        document.getElementById("character2"),
        4,
        0,
        0,
        characterWidth,
        characterHeight,
        speed,
        2,
        "d",
        "a",
        "s",
        "w",
        "g"
    );
}
//#endregion

// function createPlayer(playerReference) {

// }

//#region Hide and show functions.
function hideMainMenu() {
    document.getElementById("main-menu").style.display = "none";
}

function showMainMenu() {
    document.getElementById("main-menu").style.display = "initial";
}

function hideGameModeChoiceBtns() {
    document.getElementById("game-mode-choice-btns").style.display = "none";
}

function showGameModeChoiceBtns() {
    document.getElementById("game-mode-choice-btns").style.display = "initial";
}

function hideAiSelectionMenu() {
    document.getElementById("ai-selection-menu").style.display = "none";
}

function showAiSelectionMenu() {
    document.getElementById("ai-selection-menu").style.display = "initial";
}

function hideStartBtn() {
    document.getElementById("start-btn").style.display = "none";
}

function showStartBtn() {
    document.getElementById("start-btn").style.display = "initial";
}
//#endregion


import Player from "./Player.js";
import DanteAi from "./DanteAi.js";
import FaysalAi from "./FaysalAi.js";

`use strict`

const SPEED = 3;
const CHARACTER_WIDTH = 20;
const CHARACTER_HEIGHT = 30;
let isPaused = true;
const gameModes = {
    pvp: "pvp",
    playerVsAi: "player-vs-ai",
    aiVsAi: "ai-vs-ai"
}
let gameMode = gameModes.pvp;
let character1;
let character2;
const characters = [];
const MAP_WIDTH = 600;
const MAP_HEIGHT = 450;
const MAP_RIGHT_EDGE = MAP_WIDTH - CHARACTER_WIDTH;
const MAP_BOTTOM_EDGE = MAP_HEIGHT - CHARACTER_HEIGHT;

startProgram();

function startProgram() {
    setCharacterDimensions();
    setMapDimensions();
    addMenuEventListeners();
    addPauseKeyPressEventListener();
}

function setCharacterDimensions() {
    document.getElementById("character1").style.width = `${CHARACTER_WIDTH}px`;
    document.getElementById("character1").style.height = `${CHARACTER_HEIGHT}px`;
    document.getElementById("character2").style.width = `${CHARACTER_WIDTH}px`;
    document.getElementById("character2").style.height = `${CHARACTER_HEIGHT}px`;
}

function setMapDimensions() {
    const map = document.getElementById("map");
    map.style.width = `${MAP_WIDTH}px`;
    map.style.height = `${MAP_HEIGHT}px`;
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
        // console.log(e);
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
        if (isValidRadioBtnChoices()) {
            if (gameMode === gameModes.playerVsAi) {
                initiatePlayerVsAiCharacters();
            } else {
                initiateAiVsAiCharacters();
            }
            characters.unshift(character1);
            characters.unshift(character2);
            character1.activate(characters);
            character2.activate(characters);
            hideMainMenu();
            document.getElementById("hp" + character1.characterNumber).innerHTML = "Player" + character1.characterNumber + ": " + character1.hp;
            document.getElementById("hp" + character2.characterNumber).innerHTML = "Player" + character2.characterNumber + ": " + character2.hp;
            gameLoop();
        }
    } else {
        initiatePvpCharacters();
        characters.unshift(character1);
        characters.unshift(character2);
        character1.activate(characters);
        character2.activate(characters);
        hideMainMenu();
        document.getElementById("hp" + character1.characterNumber).innerHTML = "Player" + character1.characterNumber + ": " + character1.hp;
        document.getElementById("hp" + character2.characterNumber).innerHTML = "Player" + character2.characterNumber + ": " + character2.hp;
        gameLoop();
    }
}
//#endregion

function gameLoop() {
    character1.computeActions(MAP_RIGHT_EDGE, MAP_BOTTOM_EDGE);
    character2.computeActions(MAP_RIGHT_EDGE, MAP_BOTTOM_EDGE);
    character1.updatePosition();
    character2.updatePosition();
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
        document.getElementById("radio-btn-character1-ai1").setAttribute("name", "ai-selection");
        document.getElementById("radio-btn-character1-ai2").setAttribute("name", "ai-selection");
        document.getElementById("radio-btn-character2-ai1").setAttribute("name", "ai-selection");
        document.getElementById("radio-btn-character2-ai2").setAttribute("name", "ai-selection");
    } else if (gameMode === gameModes.aiVsAi) {
        document.getElementById("radio-btn-character1-ai1").setAttribute("name", "ai-selection1");
        document.getElementById("radio-btn-character1-ai2").setAttribute("name", "ai-selection1");
        document.getElementById("radio-btn-character2-ai1").setAttribute("name", "ai-selection2");
        document.getElementById("radio-btn-character2-ai2").setAttribute("name", "ai-selection2");
    }
}

//#region Initiate characters functions,
function initiatePlayerVsAiCharacters() {
    if (document.getElementById("radio-btn-character1-ai1").checked) {
        //#region character1 - DanteAi constructor
        character1 = new DanteAi(
            document.getElementById("character1"),
            4,
            600,
            450,
            CHARACTER_WIDTH,
            CHARACTER_HEIGHT,
            SPEED,
            1,
            characters
        );
        //#endregion

        //#region character2 - Player constructor
        character2 = new Player(
            document.getElementById("character2"),
            4,
            0,
            0,
            CHARACTER_WIDTH,
            CHARACTER_HEIGHT,
            SPEED,
            2,
            "d",
            "a",
            "s",
            "w",
            "g"
        );
        //#endregion
    }
    else if (document.getElementById("radio-btn-character1-ai2").checked) {
        //#region character1 - FaysalAi constructor
        character1 = new FaysalAi(
            document.getElementById("character1"),
            4,
            600,
            450,
            CHARACTER_WIDTH,
            CHARACTER_HEIGHT,
            SPEED,
            1,
            characters
        );
        //#endregion

        //#region character2 - Player constructor
        character2 = new Player(
            document.getElementById("character2"),
            4,
            0,
            0,
            CHARACTER_WIDTH,
            CHARACTER_HEIGHT,
            SPEED,
            2,
            "d",
            "a",
            "s",
            "w",
            "g"
        );
        //#endregion
    }

    else if (document.getElementById("radio-btn-character2-ai1").checked) {
        //#region character1 - Player constructor
        character1 = new Player(
            document.getElementById("character1"),
            4,
            600,
            450,
            CHARACTER_WIDTH,
            CHARACTER_HEIGHT,
            SPEED,
            1,
            "ArrowRight",
            "ArrowLeft",
            "ArrowDown",
            "ArrowUp",
            "."
        );
        //#endregion

        //#region character2 - DanteAi constructor
        character2 = new DanteAi(
            document.getElementById("character2"),
            4,
            0,
            0,
            CHARACTER_WIDTH,
            CHARACTER_HEIGHT,
            SPEED,
            2,
            characters
        );
        //#endregion
    }
    else if (document.getElementById("radio-btn-character2-ai2").checked) {
        //#region character1 - Player constructor
        character1 = new Player(
            document.getElementById("character1"),
            4,
            600,
            450,
            CHARACTER_WIDTH,
            CHARACTER_HEIGHT,
            SPEED,
            1,
            "ArrowRight",
            "ArrowLeft",
            "ArrowDown",
            "ArrowUp",
            "."
        );
        //#endregion

        //#region character2 - FaysalAi constructor
        character2 = new FaysalAi(
            document.getElementById("character2"),
            4,
            0,
            0,
            CHARACTER_WIDTH,
            CHARACTER_HEIGHT,
            SPEED,
            2,
            characters
        );
        //#endregion
    }
}

function initiateAiVsAiCharacters() {
    if (document.getElementById("radio-btn-character1-ai1").checked) {
        //#region character1 - DanteAi constructor
        character1 = new DanteAi(
            document.getElementById("character1"),
            4,
            600,
            450,
            CHARACTER_WIDTH,
            CHARACTER_HEIGHT,
            SPEED,
            1,
            characters
        );
        //#endregion
    }
    else if (document.getElementById("radio-btn-character1-ai2").checked) {
        //#region character1 - FaysalAi constructor
        character1 = new FaysalAi(
            document.getElementById("character1"),
            4,
            600,
            450,
            CHARACTER_WIDTH,
            CHARACTER_HEIGHT,
            SPEED,
            1,
            characters
        );
        //#endregion
    }

    if (document.getElementById("radio-btn-character2-ai1").checked) {
        //#region character2 - DanteAi constructor
        character2 = new DanteAi(
            document.getElementById("character2"),
            4,
            0,
            0,
            CHARACTER_WIDTH,
            CHARACTER_HEIGHT,
            SPEED,
            2,
            characters
        );
        //#endregion
    }
    else if (document.getElementById("radio-btn-character2-ai2").checked) {
        //#region character2 - FaysalAi
        character2 = new FaysalAi(
            document.getElementById("character2"),
            4,
            0,
            0,
            CHARACTER_WIDTH,
            CHARACTER_HEIGHT,
            SPEED,
            2,
            characters
        );
        //#endregion
    }
}

function initiatePvpCharacters() {
    //#region character1 - Player constructor
    character1 = new Player(
        document.getElementById("character1"),
        4,
        600,
        450,
        CHARACTER_WIDTH,
        CHARACTER_HEIGHT,
        SPEED,
        1,
        "ArrowRight",
        "ArrowLeft",
        "ArrowDown",
        "ArrowUp",
        "."
    );
    //#endregion

    //#region character2 - Player constructor
    character2 = new Player(
        document.getElementById("character2"),
        4,
        0,
        0,
        CHARACTER_WIDTH,
        CHARACTER_HEIGHT,
        SPEED,
        2,
        "d",
        "a",
        "s",
        "w",
        "g"
    );
    //#endregion
}
//#endregion

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

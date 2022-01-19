import Character from "./Character.js";

export default class Player extends Character {
    constructor(DOMElement, hp, x, y, width, height, speed, characterNumber, rightKey, leftKey, downKey, upKey, hitKey) {
        super(DOMElement, hp, x, y, width, height, speed, characterNumber);
        this.heldDirections = [];
        this.directionKeys = {
            [rightKey]: this.directions.right,
            [leftKey]: this.directions.left,
            [downKey]: this.directions.down,
            [upKey]: this.directions.up
        }
        this.hitKey = hitKey;
    }

    computeMovement(mapRightEdge, mapBottomEdge) {
        const rightIndex = this.heldDirections.indexOf(this.directions.right);
        const leftIndex = this.heldDirections.indexOf(this.directions.left);
        const downIndex = this.heldDirections.indexOf(this.directions.down);
        const upIndex = this.heldDirections.indexOf(this.directions.up);
        if (this.heldDirections && this.heldDirections.at(-1) != undefined) {
            this.facing = this.heldDirections.at(-1);
            if (rightIndex > leftIndex) {
                this.x += this.speed;
            }
            if (leftIndex > rightIndex) {
                this.x -= this.speed;
            }
            if (downIndex > upIndex) {
                this.y += this.speed;
            }
            if (upIndex > downIndex) {
                this.y -= this.speed;
            }
        }

        if (this.x < 0) {
            this.x = 0;
        }
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.x > mapRightEdge) {
            this.x = mapRightEdge;
        }
        if (this.y > mapBottomEdge) {
            this.y = mapBottomEdge;
        }
    }

    registerKeyPress(func) {
        document.addEventListener("keydown", (e) => {
            func(e);
        })
    }

    registerKeyRelease(func) {
        document.addEventListener("keyup", (e) => {
            func(e);
        });
    }

    registerMovementPress() {
        this.registerKeyPress((e) => {
            const direction = this.directionKeys[e.key];
            if (this.heldDirections.indexOf(direction) === -1) {
                this.heldDirections.push(direction);
            }
        })
    }

    registerMovementRelease() {
        this.registerKeyRelease((e) => {
            const direction = this.directionKeys[e.key];
            const index = this.heldDirections.indexOf(direction);
            if (index > -1) {
                this.heldDirections.splice(index, 1);
            }
        })
    }

    registerMovementActivity() {
        this.registerMovementPress();
        this.registerMovementRelease();
    }

    registerHit(characters) {
        this.registerKeyPress((e) => {
            if (e.key === this.hitKey) {
                this.hit(characters);
            }
        })
    }
}
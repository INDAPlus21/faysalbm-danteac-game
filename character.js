export default class Character {
    constructor(DOMElement, x, y, width, height, speed, rightKey, leftKey, downKey, upKey, hitKey) {
        this.DOMElement = DOMElement;
        this.hp = 4;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.heldDirections = [];
        this.directions = {
            right: "right",
            left: "left",
            up: "up",
            down: "down"
        }
        this.directionKeys = {
            [rightKey]: this.directions.right,
            [leftKey]: this.directions.left,
            [downKey]: this.directions.down,
            [upKey]: this.directions.up
        }
        this.hitKey = hitKey;
        this.facing = this.directions.up;
        this.playerNumber = `${this.DOMElement.getAttribute("id")}`.substr(9); //hämtar 1 från "character1"(Mycket fult men det funkar)
    }

    loseHp(damage) {
        console.log(this.playerNumber);
        if (damage >= this.hp) {
            this.hp = 0;
        }
        else {
            this.hp -= damage;
        }
        const id = this.DOMElement.getAttribute("id");
        console.log(`${id}: ${this.hp}`);
        document.getElementById("HP" + this.playerNumber).innerHTML = "Player" + this.playerNumber + ": " + this.hp;
    }

    computeMovement(mapRightEdge, mapBottomEdge) {
        const heldDirections = this.heldDirections;
        const rightIndex = heldDirections.indexOf(this.directions.right);
        const leftIndex = heldDirections.indexOf(this.directions.left);
        const downIndex = heldDirections.indexOf(this.directions.down);
        const upIndex = heldDirections.indexOf(this.directions.up);
        if (heldDirections && heldDirections.at(-1) != undefined) {
            this.facing = heldDirections.at(-1);
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

    moveCharacter() {
        this.DOMElement.style.left = `${this.x}px`;
        this.DOMElement.style.top = `${this.y}px`;
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

    registerHitPress(characters) {
        this.registerKeyPress((e) => {

            if (e.key === this.hitKey) {
                const forwardRange = 60;
                const sideRange = 40;
                let xMin;
                let xMax;
                let yMin;
                let yMax;

                if (this.facing === this.directions.up) {
                    yMax = this.y;
                    yMin = this.y - forwardRange;
                    xMax = this.x + sideRange;
                    xMin = this.x - sideRange;
                }
                else if (this.facing === this.directions.right) {
                    yMax = this.y + sideRange;
                    yMin = this.y - sideRange;
                    xMax = this.x + forwardRange;
                    xMin = this.x;
                }
                else if (this.facing === this.directions.down) {
                    yMax = this.y + forwardRange;
                    yMin = this.y;
                    xMax = this.x + sideRange;
                    xMin = this.x - sideRange;
                }
                else if (this.facing === this.directions.left) {
                    yMax = this.y + sideRange;
                    yMin = this.y - sideRange;
                    xMax = this.x;
                    xMin = this.x - forwardRange;
                }

                characters.forEach(character => {
                    if (character != this
                        && Character.inRange(character.x, xMin, xMax)
                        && Character.inRange(character.y, yMin, yMax)) {
                        character.loseHp(1);
                    }
                });




                console.log(this.facing);

            }
        })
    }

    static inRange(value, min, max) {
        return (value > min && value < max);
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

    applyAi1() {

    }

    applyAi2() {

    }

    getDOMElement() {
        return this.DOMElement;
    }
}

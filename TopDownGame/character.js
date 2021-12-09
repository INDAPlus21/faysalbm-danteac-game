export default class Character {
    constructor(DOMElement, x, y, width, height, speed, rightKey, leftKey, downKey, upKey) {
        this.hp = 4;
        this.width = width;
        this.heigh = height;
        this.DOMElement = DOMElement;
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
        this.keyDirections = {
            [rightKey]: this.directions.right,
            [leftKey]: this.directions.left,
            [downKey]: this.directions.down,
            [upKey]: this.directions.up
        }
    }

    loseHp(damage){
        this.hp -= damage;
    }

    computeMovement(mapRightEdge, mapBottomEdge) {
        const heldDirections = this.heldDirections;
        const rightIndex = heldDirections.indexOf(this.directions.right);
        const leftIndex = heldDirections.indexOf(this.directions.left);
        const downIndex = heldDirections.indexOf(this.directions.down);
        const upIndex = heldDirections.indexOf(this.directions.up);
        if (heldDirections) {
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

    registerKeyPress() {
        document.addEventListener("keydown", (e) => {
            const direction = this.keyDirections[e.key];
            if (this.heldDirections.indexOf(direction) === -1) {
                this.heldDirections.push(direction);
            }
        })
    }

    registerKeyRelease() {
        document.addEventListener("keyup", (e) => {
            this
            const direction = this.keyDirections[e.key];
            const index = this.heldDirections.indexOf(direction);
            if (index > -1) {
                this.heldDirections.splice(index, 1);
            }
        })
    }

    registerKeyActivity() {
        this.registerKeyPress();
        this.registerKeyRelease();
    }

    getDOMElement() {
        return this.DOMElement;
    }
}

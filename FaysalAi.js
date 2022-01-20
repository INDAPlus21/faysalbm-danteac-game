import Character from "./Character.js";

export default class FaysalAi extends Character {
    constructor(DOMElement, hp, x, y, width, height, speed, characterNumber, characters) {
        super(DOMElement, hp, x, y, width, height, speed, characterNumber);
        this.targetPoint = { x: 450, y: 300 };
        this.characters = characters
    }

    computeActions() {
        this.computeMovement();
    }

    computeMovement() {
        if (this.x != this.targetPoint.x || this.y != this.targetPoint.y) {
            if (this.x < this.targetPoint.x) {
                this.x += this.speed;
            } else {
                this.x -= this.speed;
            }
            if (this.y < this.targetPoint.y) {
                this.y += this.speed;
            } else {
                this.y -= this.speed;
            }
        }
    }
}
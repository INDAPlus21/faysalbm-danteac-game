import Character from "./Character.js";

export default class SimpleAi2 extends Character {
    constructor(DOMElement, hp, x, y, width, height, speed, characterNumber, chars) {
        super(DOMElement, hp, x, y, width, height, speed, characterNumber);
        this.targetPoint = { x: 450, y: 300 };
        this.chars = chars
    }

    computeActions() {
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

    registerMovementActivity(){

    }

    registerHit(characters){

    }



}
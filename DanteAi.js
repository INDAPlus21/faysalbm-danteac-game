import Character from "./Character.js";

export default class DanteAi extends Character {
    constructor(DOMElement, hp, x, y, width, height, speed, characterNumber, characters) {
        super(DOMElement, hp, x, y, width, height, speed, characterNumber);
        this.opponent;
    }

    computeActions() {
        this.computeMovement();
    }

    computeMovement() {

    }

    activate(characters) {
        characters.forEach(character => {
            console.log(character);
            if (character != this) {
                this.opponent = character;
            }
        });
    }
}

/* old functions

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

    fetchOpponentObj(characters) {
        characters.forEach(character => {
            console.log(character);
            if (character != this) {
                console.log(character);
                return character;
            }
            return -1;
        });
    }

*/
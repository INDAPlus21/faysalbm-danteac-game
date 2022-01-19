export default class Character {
    constructor(DOMElement, hp, x, y, width, height, speed, characterNumber) {
        this.DOMElement = DOMElement;
        this.hp = hp;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.directions = {
            right: "right",
            left: "left",
            up: "up",
            down: "down"
        }
        this.facing = this.directions.up;
        this.characterNumber = characterNumber;
    }

    loseHp(damage) {
        if (damage >= this.hp) {
            this.hp = 0;
        }
        else {
            this.hp -= damage;
        }
        document.getElementById("HP" + this.characterNumber).innerHTML = "Player" + this.characterNumber + ": " + this.hp;
    }

    updatePosition() {
        this.DOMElement.style.left = `${this.x}px`;
        this.DOMElement.style.top = `${this.y}px`;
    }

    hit(characters) {
        const FORWARD_RANGE = 60;
        const SIDE_RANGE = 40;
        let xMin;
        let xMax;
        let yMin;
        let yMax;

        if (this.facing === this.directions.up) {
            yMax = this.y;
            yMin = this.y - FORWARD_RANGE;
            xMax = this.x + SIDE_RANGE;
            xMin = this.x - SIDE_RANGE;
        }
        else if (this.facing === this.directions.right) {
            yMax = this.y + SIDE_RANGE;
            yMin = this.y - SIDE_RANGE;
            xMax = this.x + FORWARD_RANGE;
            xMin = this.x;
        }
        else if (this.facing === this.directions.down) {
            yMax = this.y + FORWARD_RANGE;
            yMin = this.y;
            xMax = this.x + SIDE_RANGE;
            xMin = this.x - SIDE_RANGE;
        }
        else if (this.facing === this.directions.left) {
            yMax = this.y + SIDE_RANGE;
            yMin = this.y - SIDE_RANGE;
            xMax = this.x;
            xMin = this.x - FORWARD_RANGE;
        }

        characters.forEach(character => {
            if (character != this
                && Character.inRange(character.x, xMin, xMax)
                && Character.inRange(character.y, yMin, yMax)) {
                character.loseHp(1);
            }
        });
    }

    static inRange(value, min, max) {
        return (value > min && value < max);
    }

    initDimensions() {
        this.DOMElement.style.width = `${characterWidth}px`;
        this.DOMElement.style.height = `${characterHeight}px`;
    }
}
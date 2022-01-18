export default class SimpleAi {
    constructor(DOMElement) {
        this.DOMElement = DOMElement
        this.hp = 4;
        this.width = 20;
        this.height = 30;
        this.x = 0;
        this.y = 0;
        this.speed = 1;
        this.directions = {
            right: "right",
            left: "left",
            up: "up",
            down: "down"
        }
        this.facing = this.directions.up;
        this.targetPoint = { x: 300, y: 300 };
        this.aiNumber = 1;
    }

    movementPattern() {
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

    moveAI() {
        this.DOMElement.style.left = `${this.x}px`;
        this.DOMElement.style.top = `${this.y}px`;
    }

}
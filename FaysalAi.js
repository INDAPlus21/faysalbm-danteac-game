import Character from "./Character.js";

export default class FaysalAi extends Character {
    constructor(DOMElement, hp, x, y, width, height, speed, characterNumber, characters) {
        super(DOMElement, hp, x, y, width, height, speed, characterNumber);
        this.targetPoint = { x: 225 - width/2, y: 300 - height/2 };
        this.characters = characters
        this.targetCharacter = null;
        this.distanceToTarget;
        this.vision = 200;
        this.chaseTarget = true;
        this.meleeAttackCooldown = false;
    }

    activate(characters) {
        characters.forEach(character => {
            console.log(character);
            if (character != this) {
                this.opponent = character;
            }
        });
    }


    computeActions() {
        this.processInformation();
        this.computeAttack();
        this.computeMovement();
    }

    processInformation(){
        this.lookForTarget();
        this.setTargetPoint();

    }

    lookForTarget(){
        for(let character of this.characters){
            let distanceToCharacter = Math.sqrt((character.x - this.x)**2 + (character.y - this.y)**2)
            // console.log("looking");
            if(character !== this){
                if(distanceToCharacter < this.vision){
                    console.log(distanceToCharacter);
                    if(this.targetCharacter === null || (distanceToCharacter < this.distanceToTarget && this.targetCharacter !== character)){
                        this.targetCharacter = character;
                        console.log(this.targetCharacter + "!!!!! !!!");
                    } 
                    else if(character === this.targetCharacter && distanceToCharacter < 100 && this.meleeAttackCooldown){
                        this.chaseTarget = false;
                        // this.targetCharacter = false;
                    }
                }
                else if(character === this.targetCharacter){
                    this.targetCharacter = null;
                }
            }
        }
    }

    setTargetPoint(){
        if(this.targetCharacter !== null){
            this.targetPoint = { x: this.targetCharacter.x, y: this.targetCharacter.y}
            console.log("new TargetLocation" + this.targetCharacter.x + " " + this.targetCharacter.y);
        }
        else{
            this.targetPoint = { x: 225 - this.width/2, y: 300 - this.height/2 };
        }
    }

    computeAttack(){
        if(this.targetCharacter !== null && this.checkMeleeRange()){
            this.makeMeleeAttack();
        }
    }

    makeMeleeAttack(){
        this.facing = this.targetRelativeDirection();
        if(!this.meleeAttackCooldown){
            this.hit(this.characters);
            // this.meleeAttackCooldown = true;
            // setTimeout(function(){
            //     console.log("hello" + this.chaseTarget);
            //     this.meleeAttackCooldown = false;
            //     this.chaseTarget = true;
            //     console.log("hello!!" + this.chaseTarget);
            // },2500);
        }

    }

    checkMeleeRange(){ // ok kolla jag vet att jag upprepar kod men asså jag orkar inte just nu jag vill bara få pass
        const FORWARD_RANGE = 60;
        const SIDE_RANGE = 40;
        let xMin;
        let xMax;
        let yMin;
        let yMax;

        yMax = this.y;
        yMin = this.y - FORWARD_RANGE;
        xMax = this.x + SIDE_RANGE;
        xMin = this.x - SIDE_RANGE;

        if (Character.inRange(this.targetCharacter.x, xMin, xMax)
            && Character.inRange(this.targetCharacter.y, yMin, yMax)) { 
                return true
            }
        
        yMax = this.y + SIDE_RANGE;
        yMin = this.y - SIDE_RANGE;
        xMax = this.x + FORWARD_RANGE;            
        xMin = this.x;

        if (Character.inRange(this.targetCharacter.x, xMin, xMax)
            && Character.inRange(this.targetCharacter.y, yMin, yMax)) { 
                return true
            }

        yMax = this.y + FORWARD_RANGE;
        yMin = this.y;
        xMax = this.x + SIDE_RANGE;
        xMin = this.x - SIDE_RANGE;

        if ( Character.inRange(this.targetCharacter.x, xMin, xMax)
            && Character.inRange(this.targetCharacter.y, yMin, yMax)) { 
                return true
            }

        yMax = this.y + SIDE_RANGE;
        yMin = this.y - SIDE_RANGE;
        xMax = this.x;
        xMin = this.x - FORWARD_RANGE;
        
        if (Character.inRange(this.targetCharacter.x, xMin, xMax)
            && Character.inRange(this.targetCharacter.y, yMin, yMax)) { 
                return true
            }
        return false;
    }


    targetRelativeDirection(){ // Jag kopierar kod igen snälla slå mig inte jag har ont om tid, energi och livskraft
        const FORWARD_RANGE = 60;
        const SIDE_RANGE = 40;
        let xMin;
        let xMax;
        let yMin;
        let yMax;

        yMax = this.y;
        yMin = this.y - FORWARD_RANGE;
        xMax = this.x + SIDE_RANGE;
        xMin = this.x - SIDE_RANGE;

        if (Character.inRange(this.targetCharacter.x, xMin, xMax)
            && Character.inRange(this.targetCharacter.y, yMin, yMax)) { 
                return this.directions.up
            }
        
        yMax = this.y + SIDE_RANGE;
        yMin = this.y - SIDE_RANGE;
        xMax = this.x + FORWARD_RANGE;            
        xMin = this.x;

        if (Character.inRange(this.targetCharacter.x, xMin, xMax)
            && Character.inRange(this.targetCharacter.y, yMin, yMax)) { 
                return this.directions.right;
            }

        yMax = this.y + FORWARD_RANGE;
        yMin = this.y;
        xMax = this.x + SIDE_RANGE;
        xMin = this.x - SIDE_RANGE;

        if ( Character.inRange(this.targetCharacter.x, xMin, xMax)
            && Character.inRange(this.targetCharacter.y, yMin, yMax)) { 
                return this.directions.down
            }

        yMax = this.y + SIDE_RANGE;
        yMin = this.y - SIDE_RANGE;
        xMax = this.x;
        xMin = this.x - FORWARD_RANGE;
        
        if (Character.inRange(this.targetCharacter.x, xMin, xMax)
            && Character.inRange(this.targetCharacter.y, yMin, yMax)) { 
                return this.directions.left
            }
        return this.directions.up; // oj vilken ful kod, en return som aldrig ska kunna nås, ajajaj, vad du än gör, VISA INTE FÖR RIC
    }

    computeMovement(){
        if(this.hp != 0){
            console.log(this.chaseTarget);
            if(this.chaseTarget === true) {
                this.computeMovementToTarget();
            }
            else{
                this.executeMovementPattern();
            }
        }

    }

    computeMovementToTarget() {
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

    executeMovementPattern(){
        // this.x = 100;
        // this.y = 300;
    }
}
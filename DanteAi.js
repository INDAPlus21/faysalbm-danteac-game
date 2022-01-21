import Character from "./Character.js";

export default class DanteAi extends Character {
    constructor(DOMElement, hp, x, y, width, height, speed, characterNumber, characters) {
        super(DOMElement, hp, x, y, width, height, speed, characterNumber);
        this.characters = characters;
        this.opponent;
        this.oppDirection;
        this.oppDirections = {
            left: "left",
            leftUp: "leftUp",
            up: "up",
            rightUp: "rightUp",
            right: "right",
            rightDown: "rightDown",
            down: "down",
            leftDown: "leftDown",
            inside: "inside"
        }
        this.isAbleToHit = true;
    }

    activate(characters) {
        characters.forEach(character => {
            if (character != this) {
                this.opponent = character;
            }
        });
    }

    computeActions(mapRightEdge, mapBottomEdge) {
        this.computeOppDirection();
        this.computeMovement(mapRightEdge, mapBottomEdge);
    }

    computeMovement(mapRightEdge, mapBottomEdge) {
        if (this.isOppDangerous() || !this.isAbleToHit) {
            this.evadeOpponent(mapRightEdge, mapBottomEdge);
        } else {
            this.enterAttackRange();
            this.faceOpp();
            this.hitWithTimeout(this.characters);
        }
    }

    computeOppDirection() {
        const SIDE_RANGE = 40;
        if (this.opponent.x < this.x - SIDE_RANGE) {
            if (this.opponent.y < this.y - SIDE_RANGE) {
                this.oppDirection = this.oppDirections.leftUp;
            } else if (this.y - SIDE_RANGE <= this.opponent.y && this.opponent.y <= this.y + SIDE_RANGE) {
                this.oppDirection = this.oppDirections.left;
            } else {
                this.oppDirection = this.oppDirections.leftDown;
            }
        } else if (this.x - SIDE_RANGE <= this.opponent.x && this.opponent.x <= this.x + SIDE_RANGE) {
            if (this.opponent.y < this.y - SIDE_RANGE) {
                this.oppDirection = this.oppDirections.up;
            } else if (this.y - SIDE_RANGE <= this.opponent.y && this.opponent.y <= this.y + SIDE_RANGE) {
                this.oppDirection = this.oppDirections.inside;
            } else {
                this.oppDirection = this.oppDirections.down;
            }
        } else {
            if (this.opponent.y < this.y - SIDE_RANGE) {
                this.oppDirection = this.oppDirections.rightUp;
            } else if (this.y - SIDE_RANGE <= this.opponent.y && this.opponent.y <= this.y + SIDE_RANGE) {
                this.oppDirection = this.oppDirections.right;
            } else {
                this.oppDirection = this.oppDirections.rightDown;
            }
        }
    }

    isOppInRange() {
        const FORWARD_RANGE = 60;
        if (this.oppDirection == this.oppDirections.inside) {
            return true;
        } else if (this.oppDirection == this.oppDirections.left) {
            if (this.opponent.x < this.x - FORWARD_RANGE) {
                return false;
            } else {
                return true;
            }
        } else if (this.oppDirection == this.oppDirections.up) {
            if (this.opponent.y < this.y - FORWARD_RANGE) {
                return false;
            } else {
                return true;
            }
        } else if (this.oppDirection == this.oppDirections.right) {
            if (this.x + FORWARD_RANGE < this.opponent.x) {
                return false;
            } else {
                return true;
            }
        } else if (this.oppDirection == this.oppDirections.down) {
            if (this.y + FORWARD_RANGE < this.opponent.y) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    }

    isOppDangerous() {
        if (this.oppDirection === this.oppDirections.inside
            || (this.doesOppFacingOpposeOppDirection() && this.isOppInRange())) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Tests if the opponent faces the opposite direction of where it is located
     * 
     * @returns 
     */
    doesOppFacingOpposeOppDirection() {
        if (this.opponent.facing === this.directions.left) {
            if (this.oppDirection === this.oppDirections.right) {
                return true;
            } else {
                return false;
            }
        } else if (this.opponent.facing === this.directions.up) {
            if (this.oppDirection === this.oppDirections.down) {
                return true;
            } else {
                return false;
            }
        } else if (this.opponent.facing === this.directions.right) {
            if (this.oppDirection === this.oppDirections.left) {
                return true;
            } else {
                return false;
            }
        } else {
            if (this.oppDirection === this.oppDirections.up) {
                return true;
            } else {
                return false;
            }
        }
    }

    evadeOpponent(mapRightEdge, mapBottomEdge) {
        const SIDE_RANGE = 40;
        if (this.oppDirection === this.oppDirections.right || this.oppDirection === this.oppDirections.left) {
            if (this.facing === this.directions.up) {
                if (this.y - SIDE_RANGE <= 0) {
                    this.facing = this.directions.down;
                    this.y += this.speed;
                } else {
                    this.facing = this.directions.up;
                    this.y -= this.speed;
                }
            } else {
                if (mapBottomEdge <= this.y + SIDE_RANGE) {
                    this.facing = this.directions.up;
                    this.y -= this.speed;
                } else {
                    this.facing = this.directions.down;
                    this.y += this.speed;
                }
            }
        } else if (this.oppDirection === this.oppDirections.up || this.oppDirection === this.oppDirections.down) {
            if (this.facing === this.directions.left) {
                if (this.x - SIDE_RANGE <= 0) {
                    this.facing = this.directions.right;
                    this.x += this.speed;
                } else {
                    this.facing = this.directions.left;
                    this.x -= this.speed;
                }
            } else {
                if (mapBottomEdge <= this.x + SIDE_RANGE) {
                    this.facing = this.directions.left;
                    this.x -= this.speed;
                } else {
                    this.facing = this.directions.right;
                    this.x += this.speed;
                }
            }
        } else if (this.oppDirection === this.oppDirections.inside) {
            if (this.opponent.facing == this.facing) {
                if (this.opponent.facing === this.directions.right || this.opponent.facing === this.directions.left) {
                    this.facing = this.directions.up;
                    this.y -= this.speed;
                } else {
                    this.facing = this.directions.right;
                    this.x += this.speed;

                }
            }
            if (this.facing === this.directions.up) {
                if (this.y - SIDE_RANGE <= 0) {
                    this.facing = this.directions.down;
                    this.y += this.speed;
                } else {
                    this.facing = this.directions.up;
                    this.y -= this.speed;
                }
            } else if (this.facing === this.directions.down) {
                if (mapBottomEdge <= this.y + SIDE_RANGE) {
                    this.facing = this.directions.up;
                    this.y -= this.speed;
                } else {
                    this.facing = this.directions.down;
                    this.y += this.speed;
                }
            } else if (this.facing === this.directions.left) {
                if (this.x - SIDE_RANGE <= 0) {
                    this.facing = this.directions.right;
                    this.x += this.speed;
                } else {
                    this.facing = this.directions.left;
                    this.x -= this.speed;
                }
            } else {
                if (mapBottomEdge <= this.x + SIDE_RANGE) {
                    this.facing = this.directions.left;
                    this.x -= this.speed;
                } else {
                    this.facing = this.directions.right;
                    this.x += this.speed;
                }
            }
        }

        this.impedeOutOfBound();
    }

    impedeOutOfBound(mapRightEdge, mapBottomEdge) {
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

    enterAttackRange() {
        const oppIsInRange = this.isOppInRange();
        if (!oppIsInRange) {
            this.goToOppPoint();
        }
    }

    faceOpp() {
        if (this.oppDirection === this.oppDirections.left) {
            this.facing = this.directions.left;
        } else if (this.oppDirection === this.oppDirections.up) {
            this.facing = this.directions.up;
        } else if (this.oppDirection === this.oppDirections.right) {
            this.facing = this.directions.right;
        } else if (this.oppDirection === this.oppDirections.down) {
            this.facing = this.directions.down;
        }
    }

    goToOppPoint() {
        if (this.x != this.opponent.x || this.y != this.opponent.y) {
            if (this.x < this.opponent.x) {
                this.x += this.speed;
            } else {
                this.x -= this.speed;
            }
            if (this.y < this.opponent.y) {
                this.y += this.speed;
            } else {
                this.y -= this.speed;
            }
        }
    }

    hitWithTimeout(characters) {
        if (this.isAbleToHit && this.isOppInRange()) {
            this.hit(characters);
            this.isAbleToHit = false;
            setTimeout(() => {
                this.isAbleToHit = true;
            }, 2000);
        }
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

        // if (this.oppDirection === this.oppDirections.right) {
        //     if (this.y - SIDE_RANGE < 0) {
        //         this.y += this.speed;
        //         this.facing === this.directions.down;
        //     } else if (this.y + SIDE_RANGE > mapBottomEdge) {
        //         this.y -= this.speed;
        //         this.facing === this.directions.up;
        //     } else {
        //         if (this.facing === this.directions.down) {
        //             this.y += this.speed;
        //         } else {
        //             this.y -= this.speed;
        //         }
        //     }
        // }
*/
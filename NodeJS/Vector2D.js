export default class Vector2D {
    constructor(x, y, sourceX=0, sourceY=0) {
        this.x = x;
        this.y = y;
        this.sourceX = sourceX;
        this.sourceY = sourceY;
    }
    //Vector functions

    getLength() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
    //returns a new vector thats half the length of the vector (preserves direction)
    getHalf() {
        return new Vector(this.x * 0.5, this.y * 0.5);
    }
    Normalize() {
        return new Vector2D(this.x / this.getLength(), this.y / this.getLength());
    }
    //Subtract 2 vectors
    sub(vector2) {
        return new Vector2D(this.x - vector2.x, this.y - vector2.y);
    }
    //Add 2 vectors
    add(vector2) {
        return new Vector2D(this.x + vector2.x, this.y + vector2.y);
    }
    //Multiply 2 vectors
    mul(vector2) {
        return new Vector2D(this.x * vector2.x, this.y * vector2.y);
    }
    //Divide 2 vectors
    div(vector2) {
        return new Vector2D(this.x / vector2.x, this.y / vector2.y);
    }
    dotProduct(vector2) {
        return (this.x * vector2.x) + (this.y * vector2.y);
    }
    //Rotate the vector around rotationPoint by angle. 
    //rotationPoint is a vector2D
    //angle is in radians
    rotate(rotationPoint, angle) {
        let rotationPointX = this.x - rotationPoint.x;
        let rotationPointY = this.y - rotationPoint.y;
        //Apply rotation matrix
        let rotatedPointX = (rotationPointX * Math.cos(angle)) - (rotationPointY * Math.sin(angle));
        let rotatedPointY = (rotationPointX * Math.sin(angle)) + (rotationPointY * Math.cos(angle));

        this.x = rotatedPointX + rotationPoint.x;
        this.y = rotatedPointY + rotationPoint.y;
    }
    //remove the negative signs of the vector properties
    abs() {
        return new Vector2D(Math.abs(this.x), Math.abs(this.y));
    }

    //Constants
    
    //Unit Vectors
    //x-axis
    static RIGHT() { return new Vector2D(1, 0); }  
    static LEFT() { return new Vector2D(-1, 0); } 
    //y-axis
    static UP() { return new Vector2D(0, -1); } 
    static DOWN() { return new Vector2D(0, 1); } 
    //diagonals
    static UP_RIGHT() { return new Vector2D(1, -1); } 
    static UP_LEFT() { return new Vector2D(-1, -1); } 
    static DOWN_RIGHT() { return new Vector2D(1, 1); } 
    static DOWN_LEFT() { return new Vector2D(-1, 1); } 
    static NumberOfDirections() { return 8; } 
}

module.exports = Vector2D;

/*
    NOTE:
    In many of the functions its possible to use the Array.map() method.
    However after extensive performance testing it turned out 
    that iterative for loops performs about 2 to 10 times faster
*/

class Vector {
    constructor(elements) {
        //Data type validation
        for (let i = 0; i < elements.length; i++) 
        {
            if (typeof elements[i] === "number" && elements[i] !== NaN) 
            {
                this.elements = elements;
                this.size = elements.length;
            }
            else {
                throw new Error(`Vector element at index ${i} with value ${elements[i]} is not a number. Only numbers allowed.`);
            }
        }
    }
    //Vector functions
    //returns a new vector thats half the length of the vector (preserves direction)
    getHalf() {
        //return new Vector(this.elements.map( (element) => element * 0.5));
        const result = Array(this.elements.length).fill(0.0);
        for (let i = 0; i < this.elements.length; i++) 
        {
            result[i] = this.elements[i] * 0.5; //*0.5 is faster than / 2
        }
        return new Vector(result);
    }
    //Subtract 2 vectors (returns a new vector as the result)
    sub(vector2) {
        //Only vectors with same amount of items can be subtracted
        if (Vector.isSameVectorSize(this, vector2) === true) 
        {
            const result = Array(this.elements.length).fill(0.0);
            for (let i = 0; i < this.elements.length; i++) 
            {
                result[i] = this.elements[i] - vector2.elements[i];
            }
            return new Vector(result);
        }
        return new Error("Vectors are not the same size");
    }
    //Add 2 vectors (returns a new vector as the result)
    add(vector2) {
        //Only vectors with same amount of items can be added
        if (Vector.isSameVectorSize(this, vector2) === true) 
        {
            //return new Vector(this.elements.map( (element, index) => element + vector2.elements[index]));
            const result = Array(this.elements.length).fill(0.0);
            for (let i = 0; i < this.elements.length; i++) 
            {
                result[i] = this.elements[i] + vector2.elements[i];
            }

            return new Vector(result);
        }
        return new Error("Vectors are not the same size");
    }
    //Multiiply 2 vectors (returns a new vector as the result)
    mul(vector2) {
        //Only vectors with same amount of items can be multiplied
        if (Vector.isSameVectorSize(this, vector2) === true) 
        {
            const result = Array(this.elements.length).fill(0.0);
            for (let i = 0; i < this.elements.length; i++) 
            {
                result[i] = this.elements[i] * vector2.elements[i];
            }
            return new Vector(result);
        }
        return new Error("Vectors are not the same size");
    }
    //Divide 2 vectors (returns a new vector as the result)
    div(vector2) {
        //Only vectors with same amount of items can be divided
        if (Vector.isSameVectorSize(this, vector2) === true) 
        {
            const result = Array(this.elements.length).fill(0.0);
            for (let i = 0; i < this.elements.length; i++) 
            {
                result[i] = this.elements[i] / vector2.elements[i];
            }
            return new Vector(result);
        }
        return new Error("Vectors are not the same size");
    }
    //Multiply every vector element by itself x^2
    square() {
        const result = Array(this.elements.length).fill(0.0);
        for (let i = 0; i < this.elements.length; i++) 
        {
            result[i] = this.elements[i] * this.elements[i];
        }
        return new Vector(result);
    }
    //Return every element to the power of y x^y
    pow(y) {
        const result = Array(this.elements.length).fill(0.0);
        for (let i = 0; i < this.elements.length; i++) 
        {
            result[i] = Math.pow(this.elements[i], y);
        }
        return new Vector(result);    
    }
    //Return square root of every element
    sqrt() {
        const result = Array(this.elements.length).fill(0.0);
        for (let i = 0; i < this.elements.length; i++) 
        {
            result[i] = Math.sqrt(this.elements[i]);
        }
        return new Vector(result); 
    }
    //remove the negative signs of the vector properties
    abs() {
        //return new Vector( this.elements.map( (element) => Math.abs(element) ));
        const result = Array(this.elements.length).fill(0.0);
        for (let i = 0; i < this.elements.length; i++) 
        {
            result[i] = Math.abs(this.elements[i]);
        }
        return new Vector(result);
        
    }
    //Returns a new vector where every element is the difference between Xn and Xn+1 of the vector 
    //You can use min and max to provide a range. By default the entire range is used.
    //Note that the last element of the returned vector is always 0 because Xn - Xn+1 for the last element is null.
    //      //Note that the size of the returned vector is 1 element less than the original vector
    getDifferences(min = 0, max = this.elements.length) {
        //Take the range from the original array
        const vecRange = new Vector(this.elements.slice(min, max));
        //First create a copy of the vector
        const copyVec = new Vector([...vecRange.elements]);
        //Remove the first element of the array so that
        //Xn+1 aligns with Xn of the original array
        copyVec.elements.shift();
        //Add the last element to the vector to get the same vector size
        copyVec.elements.push(vecRange.elements[vecRange.elements.length - 1]);
        //Calculate the differences
        return this.sub(copyVec).abs();
    }

    //Returns the average of all the elements
    //Returns a single float
    getAverage() {
        let sum = 0;
        for (let i = 0; i < this.elements.length; i++) 
        {
            sum += this.elements[i];
        }
        return sum / this.elements.length;
    }

    //Returns the average distance between every element in the vector
    //returns a single float 
    //You can use min and max to take the average of a range
    getAverageDistance(min = 0, max = this.elements.length) {
        const diff = this.getDifferences(min, max);
        //Remove the last element from the difference array because the 0 at the end influences the average
        diff.elements.pop(diff[diff.length - 1]); 
        return diff.getAverage();
    }
    //Fills a vector with size elements where each element is a number between min and max
    //if the isInt flag is true only integers will be returned
    //if isInt is false only floating numbers will be returned
    static random(min, max, size, isInt = true) {
        const result = Array(size).fill(0.0);
        for (let i = 0; i < size; i++) 
        {
            if (isInt === true) {
                result[i] = Math.floor(Math.random() * (max - min + 1)) + min;
            }
            else {
                result[i] = (Math.random() * (max - min + 1)) + min;
            }
        }
        return new Vector(result);
    }
    //Returns true if 2 vectors have the same number of items, else false
    static isSameVectorSize(vector1, vector2) {
        if (vector1.elements.length === vector2.elements.length) {
            return true;
        }
        return false;
    }
}

myVec = Vector.random(0, 1000, 10);
console.log(myVec.getDifferences().elements);
console.log(myVec.elements);
console.log(myVec.getAverage());
console.log(myVec.getAverageDistance());

module.exports = Vector;

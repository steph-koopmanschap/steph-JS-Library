
//A data structure where the lowest value is always the 'on top'.
//A parent is always smaller than it's children
class MinHeap {
    constructor() {
        //We always keep the first element of the heap array as 'null'.
        //This way the first element of the heap is always at index 1
        //and the last element of the heap is always this.size instead of this.size - 1
        this.heap = [null];
        this.size = 0;
    }

    //Add a new value to the heap
    add(value) {
        this.heap.push(value);
        this.size += 1;
        this.bubbleUp();
    }

    //Preserve the heap structure after a new value is added
    //Algorithm:
    //1.
    bubbleUp() {

    }

    swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    }

    exists(index) {
        return index <= this.size;
    }

    static getParent(current) { 
        return Math.floor((current * 0.5));
    }
    static getLeft(current) { 
        return current * 2;
    } 
    static getRight(current) { 
        return current * 2 + 1;
    }
}

module.exports = MinHeap;

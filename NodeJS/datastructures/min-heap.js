
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

    //Pop the minimum value from the heap
    //and return that value
    popMin() {
        //If heap is empty
        if (this.size === 0) {
            return null;
        }
        //Swap the last and first elements of the heap
        //The minimum value is always at index 1
        this.swap(1, this.size);
        const min = this.heap.pop();
        this.size -= 1;
        //Restore the balance of the heap
        this.heapify();
        return min;
    }


    //Preserve the heap structure after a new value is added
    //Algorithm: 
    //1. Check if child is smaller than parent.
    //2. If yes. Swap parent and child.
    //3. Repeat step 1. for the swapped parent
    bubbleUp() {
        let child = this.heap[this.size];
        while (child > 1 && 
               this.heap[child] > this.heap[MinHeap.getParent(child)]) 
        {
            //Swap the child and parent. (parent is now child, and child is now parent)
            this.swap(child, MinHeap.getParent(child));
            //Bubble up. for the next iteration
            child = MinHeap.getParent(child); 
        }
    }

    //Bubble down
    heapify() {
        let current = 1;
        let leftChild = MinHeap.getLeft(current);
        let rightChild = MinHeap.getRight(current);
        
        while (this.canSwap(current, leftChild, rightChild))
        {
            while (this.canSwap(current, leftChild, rightChild)) 
            {
                if (this.exists(leftChild) && this.exists(rightChild)) 
                {
                    //Left child is smaller than right child
                    if (this.heap[leftChild] < this.heap[rightChild]) 
                    {
                        this.swap(current, leftChild);
                        current = leftChild;
                    }
                    //Right child is smaller than left child
                    else 
                    {
                        this.swap(current, rightChild);
                        current = rightChild;
                    }
                }
                //If only the left child exists
                else 
                {
                    this.swap(current, leftChild);
                    current = leftChild;
                }
            }
            leftChild = MinHeap.getLeft(current);
            rightChild = MinHeap.getRight(current);
        }
    }


    swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    }

    //Check if a value at index exists
    exists(index) {
        return index <= this.size;
    }

    //Check if left child exists
    //Check if parent has greater value then left child
    //Check if right child exists
    //Check if parent has greater value then left child
    canSwap(current, leftChild, rightChild) {
        //Check that one of the possible swap conditions exists
        return (this.exists(leftChild) && 
                this.heap[current] > this.heap[leftChild] || 
                this.exists(rightChild) && 
                this.heap[current] > this.heap[rightChild]);
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

const { SingleLinkedList } = require("./singly-linked-list.js");

class BoundedQueue {
    constructor(maxSize) {
        this.queue = new SingleLinkedList();
        this.size = 0;
        this.maxSize = maxSize;
    }

    //Add item the Queue
    enqueue(data) {
        if (this.hasRoom()) 
        {
            this.queue.addTailNode(data);
            this.size += 1;
            console.log(`Added ${data}! Queue size is now ${this.size}.`);
        }
        else {
            throw new Error("Overflow error. Queue is full");
        }
    }

    //Remove item from the Queue
    dequeue() {
        if (this.isEmpty()) {
            throw new Error("Underflow error. Queue is empty");
        }
        const data = this.queue.headNode.data;
        this.queue.removeHeadNode();
        this.size -= 1;
        console.log(`Removed ${data}! Queue size is now ${this.size}.`);
        return data;
    }

    //check if queue is empty
    isEmpty() {
        //return this.size === 0;
        if (this.size === 0) {
            return true;
        }
        return false;
    }

    //Check if more items can still be added to the queue
    hasRoom() {
        //return this.size < this.maxSize;
        if (this.size < this.maxSize) {
            return true;
        }
        return false;
    }

    //Look at the front of the queue
    peek() {
        if (this.size > 0) {
            return this.queue.headNode.data;
        }
        return null;
    }
}

module.exports = BoundedQueue;

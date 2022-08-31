const { SingleLinkedList } = require("./singly-linked-list.js");

class Queue {
    constructor() {
        this.queue = new SingleLinkedList();
        this.size = 0;
    }

    //Add item the Queue
    enqueue(data) {
        this.queue.addTailNode(data);
        this.size += 1;
        console.log(`Added ${data}! Queue size is now ${this.size}.`);
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

    //Look at the front of the queue
    peek() {
        if (this.size > 0) {
            return this.queue.headNode.data;
        }
        return null;
    }
}

module.exports = Queue;

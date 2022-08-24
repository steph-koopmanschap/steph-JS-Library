const { SingleLinkedList } = require("./singly-linked-list.js");

class BoundedStack {
    constructor(maxSize) {
        this.stack = new SingleLinkedList();
        this.size = 0;
        this.maxSize = maxSize;
    }

    //Add item to the stack
    push(data) {
        if(this.hasRoom()) {
            this.stack.addHeadNode(data);
            this.size += 1;
        }
        else {
            throw new Error("Stack overflow error. Stack is full.")
        }
    }

    //Remove item from the stack
    pop() {
        if (this.isEmpty()) {
            throw new Error("Stack underflow error. Stack is empty.");
        }
        this.size -= 1;
        return this.stack.removeHeadNode();
    }

    //Check if more items can still be added to the stack
    hasRoom() {
        //return this.size < this.maxSize;
        if (this.size < this.maxSize) {
            return true;
        }
        return false;
    }

    //check if stack is empty
    isEmpty() {
        //return this.size === 0;
        if (this.size === 0) {
            return true;
        }
        return false;
    }

    //Look at the front of the stack
    peek() {
        if (this.size > 0) {
            return this.stack.headNode.data;
        }
            return null;
    }
}

module.exports = BoundedStack;

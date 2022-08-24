const { SingleLinkedList } = require("./singly-linked-list.js");

class Stack {
    constructor() {
        this.queue = new SingleLinkedList();
        this.size = 0;
    }

    //Add item to the stack
    push(data) {
        this.stack.addHeadNode(data);
        this.size += 1;
    }

    //Remove item from the stack
    pop() {
        if (this.isEmpty()) {
            throw new Error("Underflow error. Stack is empty");
        }
        this.size -= 1;
        return this.stack.removeHeadNode();
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

module.exports = Stack;

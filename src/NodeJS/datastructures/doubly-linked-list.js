class Node {
    constructor(data) {
        this.data = data;
        this.nextNode = null;
        this.previousNode = null;
    }

    setNextNode(node) {
        //Make sure the given parameter is node or null
        if (node instanceof Node || node === null) {
            this.nextNode = node;
        } else {
            console.error(`${node} Paremeter is not a Node instance or null`)
            throw new Error("Paremeter is not a Node instance or null");
            
        }
    }

    setPreviousNode(node) {
        //Make sure the given parameter is node or null
        if (node instanceof Node || node === null) {
            this.previousNode = node;
        } else {
            console.error(`${node} Paremeter is not a Node instance or null`)
            throw new Error("Paremeter is not a Node instance or null");
        }
    }
}

class DoubleLinkedList {
    constructor() {
        this.headNode = null;
        this.tailNode = null;
    }

    //Add a new node in front of the root. 
    //The new node becoomes the new root.
    //the old root becomes the 2nd node.
    addHeadNode(data) {
        const newHeadNode = new Node(data);
        const originalHeadNode = this.headNode;
        //If there already is a head node
        if (originalHeadNode !== null) {
            originalHeadNode.setPreviousNode(newHeadNode);
            newHeadNode.setNextNode(originalHeadNode);
        }
        //set the head of the list to the new added node
        this.headNode = newHeadNode;
        //If the list has no tail, the tail also becomes the head
        if (this.tailNode === null) {
            this.tailNode = newHeadNode;
        }
    }

    //Add a new node to the end of the list
    addTailNode(data) {
        const newTailNode = new Node(data);
        const originalTailNode = this.tailNode;
        //If there already is a tail node
        if (originalTailNode !== null) {
            originalTailNode.setNextNode(newTailNode);
            newTailNode.setPreviousNode(originalTailNode);
        }
        //set the tail of the list to the new added node
        this.tailNode = newTailNode;
        //If the list has no head, the head also becomes the tail
        if (this.headNode === null) {
            this.headNode = newTailNode;
        }
    }

    removeHeadNode() {
        const removedHead = this.headNode;
        //If the list is empty there is nothing to do
        if (removedHead === null) {
            return null;
        }
        //change the currenthead to be the 2nd node
        this.headNode = this.headNode.nextNode;
        //If the 2nd node exists
        if (this.headNode !== null) {
            //The previous node of the head becomes null
            //Because heads never have a previous node
            this.headNode.setPreviousNode(null);
        }
        if (removedHead === this.tailNode) {
            this.removeTailNode();
        }
        return removedHead.data;
    }

    removeTailNode() {
        const removedTail = this.tailNode;
        //If the list is empty there is nothing to do
        if (removedTail === null) {
            return null;
        }
        //change the currenthead to be the 2nd node
        this.tailNode = this.tailNode.previousNode;
         //If the list has more than 1 element
        if (this.tailNode !== null) {
            //Remove the next node of the tail, because tails have no next node
            this.tailNode.setNextNode(null);
        }
        if (removedTail === this.headNode) {
            this.removeHeadNode();
        }
        return removedTail.data;
    }

    //Find which node has this data
    removeNodeByData(data) {
        let nodeToRemove;
        let currentNode = this.headNode;
        //Loop over the list to find which node belongs to data
        while (currentNode !== null) {
            //Node is found
            if (currentNode.data === data) {
                nodeToRemove = currentNode;
                break;
            }
            //Go to the next node in the list
            currentNode = currentNode.nextNode;
        }
        //Node does not exist in the list, nothing to do
        if (nodeToRemove === null) {
            return null;
        }
        //If the node to remove is the head node we remove the head node
        if (nodeToRemove === this.headNode) {
            this.removeHeadNode();
        }
        //If the node to remove is the tail node we remove the tail node
        else if (nodeToRemove === this.tailNode) {
            this.removeTailNode();
        }
        //The node to be removed is in the middle (neither head nor tail)
        else {
            const nextNode = nodeToRemove.nextNode;
            const prevNode = nodeToRemove.previousNode;
            nextNode.setPreviousNode(prevNode);
            prevNode.setNextNode(nextNode);
        }
        return nodeToRemove;
    }

    //Gets the nth number of node in the list
    getNodeByNumber(number) {
        //the 0th node and negative nodes do not exist
        if (number <= 0) {
            throw new Error(`Node ${number} does not exist`);
        }
        let current = null;
        let tailSeeker = this.headNode;
        let count = 0;
        while (tailSeeker) 
        {
            tailSeeker = tailSeeker.nextNode;
            if (count >= number) 
            {
                if (!current) 
                {
                    current = this.headNode;
                }
            current = current.nextNode;
            }
            count++
        }
        
        return current;
    }

    //Find the node in the middle of the list
    //The fastpointer moves through 2 nodes for every loop cycle
    //While the slowPointer moves through 1 node for every cycle
    //When the fastPointer reaches the end of the list then
    //the slowPointeri is always at the middle node
    findMiddleNode() {
        let fastPointer = this.headNode;
        let slowPointer = this.headNode;
        // Loop through the list
        while (fastPointer !== null) 
        {
            // Move fast pointer 1 node
            fastPointer = fastPointer.nextNode;
            // If fastPointer is not at the end of the list
            if (fastPointer !== null) 
            {
                //Move both pointers 1 node
                fastPointer = fastPointer.nextNode;
                slowPointer = slowPointer.nextNode;
            }
        }
        // slowPointer is now at the middle node
        return slowPointer;
    };

    //Return the data attribute of every node in the list as a string
    printList() {
        let currentNode = this.headNode;
        let output = "<head>";
        //Loop over the list
        while (currentNode !== null) {
            output += " " + currentNode.data;
            //Go to the next node
            currentNode = currentNode.nextNode;
        }
        output += " <tail>";
        return output;
    }
}

module.exports = { DoubleLinkedList, Node };

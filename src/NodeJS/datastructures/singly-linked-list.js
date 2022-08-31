class Node {
    constructor(data, nextNode = null) {
        this.data = data;
        this.nextNode = null;
        this.setNextNode(nextNode);
    }

    setNextNode(node) {
        //Make sure the given parameter is node or null
        if (node instanceof Node || node === null) {
            this.nextNode = node;
        } else {
            throw new Error("Paremeter is not a Node instance or null");
        }
    }
}

class SingleLinkedList {
    constructor() {
        this.headNode = null;
    }

    //Add a new node in front of the root. 
    //The new node becoomes the new root.
    //the old root becomes the 2nd node.
    addHeadNode(data) {
        const newheadNode = new Node(data);
        const originalheadNode = this.headNode;
        this.headNode = newheadNode;
        //If there already was a root node then nextNode the new root node to the original root node
        //So that the original root node becomes the 2nd node
        if (originalheadNode !== null) {
            this.headNode.setnextNode(originalheadNode);
        }
    }

    //Add a new node to the end of the list
    addTailNode(data) {
        let tailNode = this.headNode;
        //If the tailNode (which is not the headNode) is empty that means the List is empty too (contains no headNode)
        //Then set the tailNode to the headNode
        if(tailNode === null) {
            this.headNode = new Node(data);
        }
        else {
            //If the headNode already exists
            //Then loop through the list to find the last node
            while (tailNode.nextNode !== null) {
                //Go to the next node in the list
                tailNode = tailNode.nextNode;   
            }
            //Finally add the node as the new tail node
            tailNode.nextNode = new Node(data);
        }
    }

    removeHeadNode() {
        const removedheadNode = this.headNode;
        //If the root node is null then the list is empty
        //And there is nothing to do
        if (removedheadNode === null) {
            return 1;
        }
        //The 2nd node becomes the new headNode
        if (removedheadNode.nextNode !== null) {
            this.headNode = removedheadNode.nextNode;
        }
        return removedheadNode.data;
    }

    //Swap two nodes with each other
    swapNodes(data1, data2) {
        //If both data are the same its pointless to perform a swap as nothing would change
        if (data1 === data2) {
            console.log('Elements are the same - no swap needed.');
            return 1;
        }

        let node1 = this.headNode;
        let node2 = this.headNode;
        let previousNode1 = null;
        let previousNode2 = null;

        //Loop over the list to find which node belongs to data1
        while (node1 !== null) {
            if (node1.data === data1) {
                break;
            }
            previousNode1 = node1;
            node1 = node1.nextNode;
        }

        //Loop over the list to find which node belongs to data2
        while (node2 !== null) {
            if (node2.data === data2) {
                break;
            }
            previousNode2 = node1;
            node2 = node2.nextNode;
        }
        //Check if node1 or node2 does not exist in the list
        if (node1 === null || node2 === null) {
            console.log('Swap not possible - one or more element is not in the list');
            return 1;
        }

        //If the previousNode1 is null that means node1 is the headNode
        if (previousNode1 === null) {
            //headNode becomes node2
            this.headNode = node2;
        } else {
            previousNode1.nextNode = node2;
        }
        //If the previousNode2 is null that means node2 is the headNode
        if (previousNode2 === null) {
            //headNode becomes node1
            this.headNode = node1;
        } else {
            previousNode2.nextNode = node1;
        }
        //Swap the nodes. (similar to swapping array values)
        let tempNode = node1.nextNode;
        node1.nextNode = node2.nextNode;
        node2.nextNode = tempNode;

        //Nodes are swapped correctly
        return 0;
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
        console.log(output);
        return output;
    }
}

module.exports = { SingleLinkedList, Node };

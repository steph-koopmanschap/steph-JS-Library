const { SingleLinkedList, Node} = require("./singly-linked-list.js");

class HashMap {
    constructor(size = 0) {
        this.hashmap = new Array(size).fill(null).map( () => new SingleLinkedList());
    }
    //Hash the key (turn the key into an integer)
    #hash(key) {
        let hashCode = 0;
        for (let i = 0; i < key.length; i++) {
            //Turn the character at index into a UTF16 character code
            hashCode += hashCode + key.charCodeAt(i);
        }
        //Commpress the hash value and return it
        //The retuned value will be the index in the array where the value will be stored
        return hashCode % this.hashmap.length;
    }

    assign(key, value) {
        const arrayIndex = this.#hash(key);
        const linkedList = this.hashmap[arrayIndex];
        if (linkedList.headNode === null) {
            //Data is stored in the node as an array:
            //index 0 = key
            //index 1 = value
            linkedList.addHeadNode([key, value]);
            return 0;
        }
        //loop over the linked list
        let currentNode = linkedList.headNode;
        while (currentNode !== null) {
            //The node with the correct key is found (key already exists)
            //Overwrite the key with a new value
            if (currentNode.data[0] === key) {
                currentNode.data[1] = value;
            }
            //The node with the key is not found. (key does not exist, yet)
            if (currentNode.nextNode === null) {
                //Add a new node to the list with the key-value
                const newNode = new Node([key, value]);
                currentNode.setNextNode(newNode);
                break;
            }
            //go to next node in the linked list
            currentNode = currentNode.nextNode;
        }
                //this.hashmap[arrayIndex] = value;
    }

    retrieve(key) {
        const arrayIndex = this.#hash(key);
        let currentNode = this.hashmap[arrayIndex].headNode;
        //loop over the linked list
        while (currentNode !== null) {
            //We found the node that contains the key, so we return its value
            if (currentNode.data[0] === key) {
                return currentNode.data[1];
            }
            //go to next node in the linked list
            currentNode = currentNode.nextNode;
        }
        //The key is not found in the hashmap
        return null;
                //return this.hashmap[arrayIndex];
    }   
}

module.exports = HashMap;

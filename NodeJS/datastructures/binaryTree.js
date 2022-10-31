class BinaryTree {
    constructor(value, depth = 1) {
        this.value = value;
        this.depth = depth;
        this.left = null;
        this.right = null;
    }
    
    //Insert a new value into the binary tree
    insert(value) {
        //Check the left side
        if (value < this.value) {
            //If the left side has no branch/tree
            if (!this.left) 
            {
                //Create a new left branch
                this.left = new BinaryTree(value, this.depth + 1);
            } 
            else 
            {
                //put the value in the left branch
                this.left.insert(value);
            }
        } 
        //Check the right side
        else 
        {
            //If the right side has no branch/tree
            if (!this.right) 
            {
                //Create a new right branch
                this.right = new BinaryTree(value, this.depth + 1);
            } 
            else 
            {
                //put the value in the right branch
                this.right.insert(value);
            }
        }
    }

    //Find a node in the binary tree by value
    getNodeByValue(value) {
        //return the node if value is already in the current root node of the current branch
        if (this.value === value) {
            return this;
        } 
        //Search the left branch
        else if ((this.left) && (value < this.value)) 
        {
            return this.left.getNodeByValue(value);
        } 
        //Search the right branch
        else if (this.right) 
        {
            return this.right.getNodeByValue(value);
        } 
        //Value not found
        else 
        {
            return null;
        }
    }

    //Inorder depth first traversal
    //Shows all tree values in an ordered way
    depthFirstTraversal() {
        if (this.left) {
            this.left.depthFirstTraversal();
        }
        console.log("VALUE: " + this.value);
        console.log("DEPTH: " + this.depth);
        if (this.right) {
            this.right.depthFirstTraversal();
        }
    }
}

module.exports = BinaryTree;

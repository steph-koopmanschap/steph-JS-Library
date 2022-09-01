class TreeNode {
    constructor(data) {
        this.data = data;
        this.children = [];
    }

    addChild(child) {
        if(child instanceof TreeNode) {
            this.children.push(child);
        } 
        else {
            this.children.push(new TreeNode(child));
        }
    }

    removeChild(childToRemove) {
        const Oldlength = this.children.length;
        this.children = this.children.filter( (child) => {
            if (childToRemove instanceof TreeNode) {
                return childToRemove !== child;
            }
            else {
                return child.data !== childToRemove;
            }
        });

        if (Oldlength === this.children.length) {
            //Recursively remove each child of from the tree.
            for (let i = 0; i < this.children.length; i++)
            {
                const child = this.children[i];
                child.removeChild(childToRemove);
            }
        }
    }

    //Traverse the tree downwards per child
    depthFirstTraversal() {
        console.log(this.data);
        this.children.forEach( (child) => child.depthFirstTraversal());
    }

    //Traverse the tree down per level
    breadthFirstTraversal() {
        let queue = [this];
        while(queue.length !== 0) {
            const current = queue.shift();
            console.log(current.data);
            queue = queue.concat(current.children);
        }
    }

    //Returns the tree structure in string format
    print(level = 0) {
        let result = '';
        for (let i = 0; i < level; i++) 
        {
            result += '-- ';
        }
        console.log(`${result}${this.data}`);
        this.children.forEach(child => child.print(level + 1));
    }
}

module.exports = TreeNode;

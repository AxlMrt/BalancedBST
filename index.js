//This const is given by Odin Project
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

// Project starts here
class Node{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree{
    constructor(array){
        //Define the root by calling buildTree function
        this.root = this.buildTree(array, 0, array.length - 1);
        //print the tree with given function
        prettyPrint(this.root);
    }

    /**
     * Construct the Balanced Binary Search Tree from Sorted Array
     * @param {*} array Sorted Array
     * @param {number} start Start of the array
     * @param {number} end End of the array
     * @returns Root Node
     */
    buildTree(array, start, end){
        if(start > end){
            return null;
        }

        //Set the middle element of the array as the Root
        const mid = parseInt((start + end) / 2);
        let root = new Node(array[mid]);

        //Recursively construct the left subtree and make it left child of root
        root.left = this.buildTree(array, start, mid -1);
        //Recursively construct the right subtree and make it right child of root
        root.right = this.buildTree(array, mid + 1, end);
        return root;
    }

    /**
     * Insert a new Node in the BST
     * @param {number} value to add
     * @returns Node with given value
     */
    insert(value){
        let newNode = new Node(value);
        let root = this.root;

        if(root === null){
           root = newNode;
           return this;
        }

        let current = root;

        while(current){
            if(value === current.data) return undefined;

            if(value < current.data){
                if(current.left === null){
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            }else{
                if(current.right === null){
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }

    /**
     * This function calls removeNode
     * @param {number} value The value to remove
     */
    remove(value){
        this.root = this.removeNode(this.root, value);
    }

    /**
     * Recursive function to delete an existing key
     * @param {*} current Is the actual Node
     * @param {*} value Value of remove() function
     * @returns The node that contains the value and delete it
     */
    removeNode(current, value){
        let root = this.root;

        if(current === null) return current;

        if(value < current.data){
           current.left = this.removeNode(current.left, value)
        }else if(value > current.data){
            current.right = this.removeNode(current.right, value)
        }else{
            if(current.left === null){
                return current.right;
            }else if(current.right === null){
                return current.left;
            }

            root.data = minValue(current.right);
            current.right = this.removeNode(current.right, root.data);
        }
        return current;
    }

    /**
     * Helper function to find the smallest node
     * @param {number} node to check for
     * @returns smallest Node
     */
     minValue(node){
        let minv = this.root.data;
        while (node.left !== null)
        {
            minv = node.left.data;
            this.root = node.left;
        }
        return minv;
    }

    /**
     * Search if the given value is in
     * @param {number} value - the value to check for
     * @returns true if the value is in the tree, false otherwise
     */
    find(value){
        let root = this.root;

        if(!root) return false;
        
        let current = root;
        let found = false;

        while(current && !found){
            if(value < current.data){
                current = current.left;
            } else if(value > current.data) {
                current = current.right;
            }else {
                found = current;
            }
        }

        if(!found) return undefined;
        return found;
    }

    levelOrder(root){ // Not sure about this one

        if (root === null) return;

        let queue = [];
        let result = [];
        
        queue.push(root);

        while(queue.length > 0){
            let current = queue.shift(root);
            result.push(current.data);

            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
            }

        return result;
    }

    /**
     * inOrder traversal Function
     * @param {Root} root call this.root
     * @returns arr of inOrder traversal
     */
    inOrder(root = this.root){
        const stack = [];
        let traversed = [];
        let curr = root;

        while(stack.length || curr){
            while(curr){
                stack.push(curr);
                curr = curr.left;
            }
            curr = stack.pop();
            traversed.push(curr.data);
            curr = curr.right;
        }
        return traversed;
    }

    /**
     * PreOrder traversal Function
     * @param {Root} root Call this.root
     * @returns Array of preOrder Traversal
     */
    preOrder(root = this.root){
        const stack = [root];
        let traversed = [];
        let curr;

        while(stack.length){
            curr = stack.pop();
            traversed.push(curr.data);
            if(curr.right) stack.push(curr.right);
            if(curr.left) stack.push(curr.left);
        }

        return traversed;
    }

    postOrder(root = this.root){
        const s1 = [root];
        let s2 = [];
        let traversed = [];
        let curr;

        while(s1.length){
            curr = s1.pop();
            if (curr.left) s1.push(curr.left);
            if (curr.right) s1.push(curr.right);
            s2.push(curr);
        }

        while(s2.length){
            curr = s2.pop();
            traversed.push(curr.data);
        }
        return traversed;
    }

    findDepth(value){
        if (value === null) return -1;

        let dist = -1;

        if(this.root.data == value || 
            (dist = findDepth(this.root.left, value)) >= 0 ||
                (dist = this.findDepth(this.root.right, value)) >= 0){
            return dist + 1;
        }

        return dist;
    }

    /**
     * Function to check is the Tree is balanced
     * @param {Root} root call this.root
     * @returns The difference between height of nodes
     */
    checkBalance(root = this.root){
        if (root === null){
            return -1;
        } else{
            let leftN = this.checkBalance(root.left);
            let rightN = this.checkBalance(root.right);

            return Math.max(leftN, rightN) + 1;
        }
        
    }

    /**
     * Function calls checkHeight
     * @param {Root} root call this.root
     * @returns If the tree is balanced
     */
    isBalanced(root = this.root){
        if (root == null) return false;

        let leftHalf = root.left;
        let rightHalf = root.right;
    
        if (Math.abs(this.checkBalance(leftHalf) - this.checkBalance(rightHalf)) > 1) {
          return false;
        } else {
          return true;
        }
    }

}



const dataArray =  [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
console.log(dataArray.length);
const balancedBST = new Tree(dataArray);
balancedBST.insert(10)
console.log(balancedBST.find(10));
balancedBST.remove(23);
console.log(balancedBST.find(23));
console.log(balancedBST.isBalanced());
console.log(balancedBST.preOrder());
console.log(balancedBST.inOrder());
console.log(balancedBST.postOrder());

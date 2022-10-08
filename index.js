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

    levelOrder(root){

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
     * Function to check is the Tree is balanced
     * @param {Number} root The root node
     * @returns Height of node
     */
    checkBalance(root){
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
     * @param {Number} root The root value to check
     * @returns If the tree is balanced
     */
    isBalanced(root){
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

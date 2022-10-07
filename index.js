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

    //Construct the Balanced Binary Search Tree from Sorted Array
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

    insert(value){
        let newNode = new Node(value);

        //If there is no root
        if(this.root === null){
            //Then newNode is the root
           this.root = newNode;
           return this;
        }

        let current = this.root;

        while(current){
            if(value === current.data) return undefined;

            //If the adding value if lesser than the actual node value
            if(value < current.data){
                //check if there is a node at left
                if(current.left === null){
                    //If not, newNode is added
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            //If the adding value if greater than the actual node value
            }else{
                //check if there is a node at right
                if(current.right === null){
                    //If not, newNode is added
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }

    find(value){
        //Check if there is a Root. If not, return false
        if(!this.root) return false;
        
        let current = this.root;
        let found = false;

        while(current && !found){
            //If the searching value is lesser than the actual node value
            if(value < current.data){
                //search left
                current = current.left;
            //If the searching value is greater than the actual node value
            } else if(value > current.data) {
                //search right
                current = current.right;
            }else {
                //else, Value is found
                found = current;
            }
        }
        //If value is not found
        if(!found) return undefined;
        return found;
    }
}

const dataArray =  [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
console.log(dataArray.length);
const balancedBST = new Tree(dataArray, 1, 14);
balancedBST.insert(10)
console.log(balancedBST.find(10));
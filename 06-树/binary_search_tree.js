/**
 *
 * javascript手动实现二叉搜索树：binary search tree
 *
 * 需求：手动输入一个数组，然后输出二叉树，然后 实现前中后序遍历
 * */


//创建二叉树
function BinarySearchTree (keys) {
    let Node = function (key) {
        this.key = key;
        this.left = null;
        this.right = null;
    };
    let root = null;
    //向指定节点下面插入子节点
    function insertNode (node, newNode) {
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                arguments.callee(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                arguments.callee(node.right, newNode);
            }
        }
    }

    //插入值，然后生成node节点，然后再调用insertNode插入节点
    function insert (key) {
        let node = new Node(key);
        if (root === null) {
            root = node;
        } else {
            insertNode(root, node);
        }
    }

    //遍历数组，依此将每个元素插入二叉树中
    keys.forEach(key => {
        insert(key);
    });
    return root;
}


//中序遍历
function inOrderTraversalTree (node, callback) {
    if (node !== null) {
        inOrderTraversalTree(node.left, callback);
        callback(node.key);
        inOrderTraversalTree(node.right, callback);
    }
}
//前序遍历
function preOrderTraversalTree (node, callback) {
    if (node !== null) {
        callback(node.key);
        preOrderTraversalTree(node.left, callback);
        preOrderTraversalTree(node.right, callback);
    }
}
//后序遍历
function postOrderTraversalTree (node, callback) {
    if (node !== null) {
        preOrderTraversalTree(node.left, callback);
        preOrderTraversalTree(node.right, callback);
        callback(node.key);
    }
}




/**
 * 测试用例
 * */

let keys = [8,3,10,1,6,14,4,7,13];

let tree = BinarySearchTree(keys);

console.log(tree); //此时结果为一个树状结构，即变成了一个二叉搜索树

inOrderTraversalTree(tree, function (key) {
    // console.log(key);
});
//此时依此输出为：
// 1
// 3
// 4
// 6
// 7
// 8
// 10
// 13
// 14

//由此可以得出：二叉搜索树，通过中序遍历，其实是升序遍历，得出的结果是依此递增的。


preOrderTraversalTree(tree, function (key) {
    // console.log(key);
});

//此时依此输出为：
// 8
// 3
// 1
// 6
// 4
// 7
// 10
// 14
// 13

postOrderTraversalTree(tree, function (key) {
    console.log(key);
});
//此时依此输出为：
// 3
// 1
// 6
// 4
// 7
// 10
// 14
// 13
// 8

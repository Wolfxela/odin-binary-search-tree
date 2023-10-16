
const nodeMaker = function(inputdata)
{
    const data = inputdata
    let left = null
    let right = null

    return {data,left,right}
}
const tree = function(inputArray)
{
    const array = inputArray
    let BTS = treeMaker(array,0,array.length -1)

    const insert = function(number,tree = BTS)
    {
      if(tree == null)
      {
        tree = nodeMaker(number)
        return tree
      }
      if(number < tree.data)
      {
        tree.left = insert(number,tree.left)
      }
      else if(number > tree.data)
      {
        tree.right = insert(number,tree.right)
      }
      return tree
    }
    const deleteLeaf = function(number,tree = BTS)
    {
      if(tree == null)
      {
        return tree
      }
      if(number < tree.data)
      {
       
        tree.left = deleteLeaf(number,tree.left)
        return tree
      }
      else if(number > tree.data)
      {
        tree.right = deleteLeaf(number,tree.right)
        return tree
      }

      if(tree.left == null)
      {
        let temp = tree.right
        tree = null
        tree = temp
      }
      else if(tree.right == null)
      {
        let temp = tree.left
        tree = null
        tree = temp
      }
      else
      {
        let rootParent  = tree
        let rightTree = tree.right;
        while(rightTree.left !== null)
        {
          rootParent = rightTree
          rightTree = rightTree.left

        }

        if(rootParent !== tree)
        {
          rootParent.left = rightTree.right
        }
        else if(rootParent == tree)
        {
          rootParent.right  = rightTree.right
        }

        tree.data = rightTree.data
        delete rightTree
        return tree
      }
      return tree
    }
    const find = function(value,tree = BTS)
    {
      if(tree == null)
      {
        return "no number here"
      }
      if(value < tree.data)
      {
        return find(value,tree.left)
      }
      else if(value > tree.data)
      {
        return find(value,tree.right)
      }

      return tree
    }
    const levelOrder = function(fn)
    {
      let queue = [BTS]
      let extraArray = []
      while(queue[0] != null)
      {
        if(fn != null)
        {
          fn(queue[0].data)
        }else{
          extraArray.push(queue[0].data)
        }
        if(queue[0].left !== null)
        {
          queue.push(queue[0].left)
        }
        if(queue[0].right !== null)
        {
          queue.push(queue[0].right)
        }
        queue.shift()
      }
      if(fn == null)
      {
        return extraArray
      }
    }
    const recursiveLevelOrder = function(fn,queue = [BTS])
    {
      let extraArray = []
      if(queue[0] == null)
      {
        return []
      }
      else
      {
        if(fn != null)
        {
          fn(queue[0].data)
        }else{
          extraArray.push(queue[0].data)
        }
        if(queue[0].left !== null)
        {
          queue.push(queue[0].left)
        }
        if(queue[0].right !== null)
        {
          queue.push(queue[0].right)
        }
        queue.shift()
        extraArray = extraArray.concat(recursiveLevelOrder(fn,queue))
        return extraArray
      }
    }
    const inorder = function(fn,node = BTS)
    {
      let extraArray = []
      if(node == null)
      {
        return []
      }
      else
      {
        if(fn != null)
        {
          fn(node.data)
          inorder(fn,node.left)
          inorder(fn,node.right)
        }
        else{
          extraArray.push(node.data)
          extraArray = extraArray.concat(inorder(fn,node.left))
          extraArray = extraArray.concat(inorder(fn,node.right))
          return extraArray
        }
      }
      
    }
    const preorder = function(fn,node = BTS)
    {
      let extraArray = []
      if(node == null)
      {
        return []
      }
      else
      {
        if(fn != null)
        {
         
          preorder(fn,node.left)
          fn(node.data)
          preorder(fn,node.right)
        }
        else{
          extraArray = extraArray.concat(preorder(fn,node.left))
          extraArray.push(node.data)
          extraArray = extraArray.concat(preorder(fn,node.right))
          return extraArray
        }
      }
    }
    const postorder = function(fn,node = BTS)
    {
      let extraArray = []
      if(node == null)
      {
        return []
      }
      else
      {
        if(fn != null)
        {
         
          postorder(fn,node.left)
          postorder(fn,node.right)
          fn(node.data)
        }
        else{
          extraArray = extraArray.concat(postorder(fn,node.left))
          extraArray = extraArray.concat(postorder(fn,node.right))
          extraArray.push(node.data)
          return extraArray
        }
      }
    }
    const height = function(node = BTS)
    {
      let number = 1
      if(node == null)
      {
        return 0
      }
      else
      {
        return number += height(node.right)
      }
    }
    const depth = function(value,node = BTS)
    {
      let number = 1
      if(node == null)
      {
        return "no node found with that value"
      }
      else if(node == value)
      {
        return 0
      }
      else
      {
        return number += depth(value,node.right)
      }
    }
    const isbalanced = function(node = BTS)
    {
      let rightheight = height()
      let leftheight = height(node.left);
      leftheight += 1
      if(rightheight-leftheight >= 2)
      {
        return false
      }
      else
      {
        return true
      }
    }
    const rebalance = function()
    {
      const newarray = preorder()
      let newBts = treeMaker(newarray,0,newarray.length -1)
      BTS.data = newBts.data
      BTS.left = newBts.left
      BTS.right = newBts.right

    }
    return{BTS,insert,deleteLeaf,find,levelOrder,recursiveLevelOrder,inorder,preorder,postorder,height,depth,isbalanced,rebalance}
  }
  
  

const treeMaker = function(array,start,end)
{
    
    if(start>end)
    {
        return null
    }

    let mid = parseInt((start+end)/2)
    let root = nodeMaker(array[mid])

    root.left = treeMaker(array,start,mid-1)
    root.right = treeMaker(array,mid+1,end)
    return root
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
function foxes(number)
{
   console.log(number)
}
const fox = [1,2,3,4,5,6,7,8,9,10]
//   1,  2,  3,   4,  5,  6,  7,  8,  9, 10, 11, 12,
//   13, 14, 15,  16, 17, 18, 19, 20, 21, 22, 23, 24,
//   25, 26, 27,  28, 29, 30, 31, 32, 33, 34, 35, 36,
//   37, 38, 39,  40, 41, 42, 43, 44, 45, 46, 47, 48,
//   49, 50, 51,  52, 53, 54, 55, 56, 57, 58, 59, 60,
//   61, 62, 63,  64, 65, 66, 67, 68, 69, 70, 71, 72,
//   73, 74, 75,  76, 77, 78, 79, 80, 81, 82, 83, 84,
//   85, 86, 87,  88, 89, 90, 91, 92, 93, 94, 95, 96,
//   97, 98, 99, 100
// ]
const firstTree = tree(fox)
firstTree.insert(7)
firstTree.insert(49)
firstTree.insert(16)
firstTree.insert(52)
firstTree.insert(41)
firstTree.insert(41)
firstTree.insert(84)
firstTree.insert(92)
firstTree.insert(116)
firstTree.insert(2)
console.log(firstTree.isbalanced())
console.log(firstTree.levelOrder())
console.log(firstTree.inorder())
console.log(firstTree.preorder())
console.log(firstTree.postorder())
console.log(prettyPrint(firstTree.BTS))





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
    return{BTS,insert}
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

const fox = [1,2,3,4,5,6,7,8,9,10,11]
const firstTree = tree(fox)
firstTree.insert(7)
console.log(prettyPrint(firstTree.BTS))




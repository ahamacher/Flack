// problem //

// Linked list cycle

// (head given)
// head
// head.next => next node
// head.value => value

// head => calling next and check repeat

// from head to tail -> head.next = null or undefined //

// loop through //

const linkedListCycle = function(head) {
  let nodeList = new Set();
  let currentNode = head;

  while (currentNode) {
    if (nodeList.has(currentNode)){
      return false;
    }
    nodeList.add(currentNode);
    currentNode = currentNode.next();
  }

  return true;
};

const linkedListCycle = function(head) {
  let slowNode = head;
  let fastNode = head.next;

  while (fastNode) {
    if (fastNode === slowNode){
      return false;
    }
    slowNode = slowNode.next();
    if (fastNode.next()){
      fastNode = fastNode.next().next();
    } else {
      return true;
    }
  }

  return true;
};


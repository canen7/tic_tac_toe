// class for creating a node
function Node(value) {
	this.value = value;
	this.parent = undefined;
	this.child = undefined;
}
// class for creating a linked list
function Doubly_linked_node(first_value) {
	// sstore instance of this Doubly_linked_node to "self" var
	// now we can use 'this' inside private functions
	var self = this;
	// private function for retrieving a node using a specific index
	var getNode = function(index) {
		var node = self.head;
		for(var i=1; i<index; i++) {
			node = node.child;
		}
		return node;
	};
	//first node
	this.head = new Node(first_value);
	// the last node
	this.tail = undefined;

	this.addNode = function(value) {
		var node = new Node(value);
		// if node has a tail
		if(this.tail !== undefined){
			// set the current tail node's child to the new node
			this.tail.child = node;
			// set the new node's parent to the current tail node
			node.parent = this.tail;
		}
		// if this node has no tail
		else{
			// set the head's child node to be the newly added node
			this.head.child = node;
			// set the new node's parent to the head node
			node.parent = this.head;
		}
		// set the newly added node to be the tail node
		this.tail = node;
	}

	this.removeNode = function(index) {
		// store the current tail to var current_node for iteration
		var current_node = this.tail;
		// get the node to be deleted
		var delete_node = getNode(index);
		// loop from the tail up to the head while the parent is not equal to undefined
		while(current_node.parent !== undefined) {
			// if the current node is the same as the node to be deleted
			if(current_node === delete_node){
				// remove the node from the linked list
				current_node.parent.child = current_node.child;
				current_node.child.parent = current_node.parent;
			}
			// set the current node to its parent
			current_node = current_node.parent;
		}
		// set this linked list's head to the last node that was iterated
		this.head = current_node;
	}
	// insert node on a specific position in the linked list
	this.insertNode = function(value, index) {
		// store the current tail to var current_node for iteration
		var current_node = this.tail;

		// get the a specific node from a position in the linked list
		var node_position = getNode(index);

		// create a new node object
		var new_node = new Node(value);

		// loop from the tail up to the head while the parent is not equal to undefined
		while(current_node.parent !== undefined) {
			// if the current_node matches the node_position that we are searching for
			if(current_node === node_position){
				// set up the child/parent properties of the new node to be added
				new_node.child = current_node;
				new_node.parent = current_node.parent;
				// set up the properties of the nodes beside the new node
				current_node.parent.child = new_node;
				current_node.parent = new_node;
			}
			// set the current node to its parent
			current_node = current_node.parent;
		}
		// set this linked list's head to the last node that was iterated
		this.head = current_node;
	}
	this.displayContents = function(type) {
		// store the current head to var current_node for iteration
		var current_node = this.head;

		// how would you print the values in the linked list backward?
		if(type == 'backwards') 
			current_node = this.tail;
		
		// loop from the head down to the tail while the current_node is not equal to undefined 
		while(current_node !== undefined) {
			// logs all the nodes in the console
			console.log('value', current_node.value);
			console.log('parent', current_node.parent);
			console.log('child', current_node.child);
			console.log('\n---\n');

			// determine if the nodes should be displayed backwards (descending) or normal (ascending) order
			if(type == 'backwards')
				current_node = current_node.parent;
			else
				current_node = current_node.child;
		}
	}
	// Let's say we want you to create a method that deletes any duplicate value in the linked list
	this.deleteDuplicate = function() {
		// store the current tail to current_node variable for iteration
		var current_node = this.tail;

		// store the current_node to var current_node2 for the 2nd iteration
		// the 2nd iteration is for checking each value in the nodes if its match the current_value (initially = this.tail)
		var current_node2 = current_node;

		// store the current_node's value to the current_value variable for comparison on each node value later
		var current_value = current_node.value;
 
		// 1st iteration: 
		// loop from the tail up to the head while the parent is not equal to undefined
		while(current_node.parent !== undefined) {

			// 2nd iteration: 
			// loop from the tail up to the head while the parent is not equal to undefined
			while(current_node2.parent !== undefined) {

				// set the current_node2 to its parent
				current_node2 = current_node2.parent;

				// if the current_node2's value matches the current_value
				if(current_node2.value == current_value)
				{
					// remove duplicated nodes
					current_node2.parent.child = current_node2.child;
					current_node2.child.parent = current_node2.parent;
				}
			} // end of 2nd iteration

			// set current_node and current_node2 to its parent
			current_node = current_node2 = current_node.parent;
			current_value = current_node.value;
		} // end of 1st iteration

		// set this linked list's head to the last node that was iterated
		this.head = current_node;
	}
	this.getMiddleNode = function() {
		// store the current head to var current_node for iteration
		var current_node = this.head;

		// create an empty array to store nodes
		var nodes = [];

		// loop from the head down to the tail while the current_node is not equal to undefined
		while(current_node !== undefined) {

			// push node object to the nodes array
			nodes.push(current_node);

			// set the current_node to its child
			current_node = current_node.child;
		}

		// find the middle index from the nodes array length
		var middle_index = Math.floor(nodes.length / 2);

		// check if the nodes length is not divisble by 2
		if(nodes.length % 2 != 0)
			console.log('The middle node has a value of ' + nodes[middle_index].value); // log the middle value in the nodes array
		else
			console.log('There is no middle node.'); // log message if there is no middle value in the nodes array
	}
	// merge linked list
	this.mergeList = function(linked_list) {
		// set this instance's tail to get the head of the list to be merged (linked_list)
		this.tail.child = linked_list.head;

		// return this linked list's head
		return this.head;
	}
}

var manager = new Doubly_linked_node(5); 

manager.addNode(3);
manager.addNode(18);
manager.addNode(20);
manager.addNode(10);

manager.displayContents();
manager.getMiddleNode();
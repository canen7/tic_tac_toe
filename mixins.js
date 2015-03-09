
// CLASSIC MIXINS

//circle mixin, closest to a traditional class
var Circle = function(){}
Circle.prototype = {
	area: function() {
		return Math.PI * this.radius * this.radius	
	},
	grow: function() {
		this.radius++;
	},
	shrink: function() {
		this.radius--;
	}
};

//in practice such a heavyweight mixin is unnecesary. 
//A simple object literal will suffice

var circleFns = {
	area: function() {
		return Math.PI * this.radius * this.radius;
	},
	grow: function() {
		this.radius++;
	},
	shrink: function() {
		this.radius--;	
	}

}

//to get the mixin object mixed into my object 
//we use the extend (or augment) function
//there are variations of the implementation
//this is a safe and flexible option

function extend(destination, source) {
	for (var k in source) {
		if (source.hasOwnProperty(k)) {
			destination[k] = source[k];
		}
	}
	return destination;
}

//which we can call to extend our prototype

var RoundButton = function(radius, label) {
	this.radius = radius;
	this.label = label;
};

extend(RoundButton.prototype, circleFns);
extend(RoundButton.prototype, buttonFns);
//etc...


// FUNCTIONAL MIXINS


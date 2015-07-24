/* Pseudoclassical Inheritance */

var Car = function(loc) {
  this.loc = loc;
};
Car.prototype.move = function() {
  this.loc++;
};

var Van = function(loc) {
  Car.call(this, loc);
  this.weight = 0;
};
Van.prototype = Object.create(Car.prototype);
Van.prototype.constructor = Van;

Van.prototype.load = function() {
  this.weight++;
};

var car = new Car(5);
var van = new Van(4);
car.move();
van.move();
van.load();

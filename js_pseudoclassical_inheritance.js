/*******************************/
/* Pseudoclassical Inheritance */
/*******************************/
var Car = function(loc) { this.loc = loc; };
Car.prototype.move = function() { this.loc++; };
var Van = function(loc) {
  Car.call(this, loc);
  this.weight = 0;
};
Van.prototype = Object.create(Car.prototype);
Van.prototype.constructor = Van;
Van.prototype.load = function() { this.weight++; };
var car = new Car(5);
var van = new Van(4);
car.move();
van.move();
van.load();

car.__proto__ === Car.prototype; // true
van.__proto__ === Van.prototype; // true
Car.prototype === Van.prototype; // false
van.__proto__ === car.__proto__; // false

/**************************/
/* Prototypal Inheritance */
/**************************/
/* Example 1 */
var person = {
  firstName: 'Joe',
  lastName: 'Doe'
};
Object.defineProperty(person, 'fullName', {
  get: function() {
    return [this.firstName, this.lastName].join(' ');
  }
});
person.sayHi = function() { return 'hi there'; }

employee = Object.create(
  person,                                  // use person object as a prototype for new object
  {                                        // optional to assign extra properties on create
    sayHi: {                               // over-write method
      value: function() { return this.__proto__.sayHi.call(this) + ' ' + this.fullName; }
    }
  }
);
employee.firstName = 'Jack';               // does not affect person object
employee.hasOwnProperty('fullName');       // false
employee.__proto__;                        // object's prototype (supported in Nodejs and almost every browser)
employee.__proto__ === person;             // true
employee.__proto__.hasOwnProperty('sayHi') // true

/* Example 2 */
var Person = function(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
};
Object.defineProperties(Person.prototype, {
  sayHi: {                                 // define function
    value: function() { return 'hi there'; },
    enumerable: true
  },
  fullName: {                              // define attribute
    get: function() { return this.firstName + ' ' + this.lastName; },
    enumerable: true
  }
});

var Employee = function(firstName, lastName, position) {
  Person.call(this, firstName, lastName);
  this.position = position;
};
Employee.prototype = Object.create(Person.prototype, {
  sayHi: {
    value: function() { return Person.prototype.sayHi.call(this) + ' ' + this.fullName; },
    enumerable: true
  },
  fullName: {
    get: function() {
      var descriptor = Object.getOwnPropertyDescriptor(Person.prototype, 'fullName').get;
      return descriptor.call(this) + ', ' + this.position;
    },
    enumerable: true
  }
});
var johnDoe = new Employee('John', 'Doe', 'manager');
johnDoe.__proto__ === Employee.prototype; // true

/*******************/
/* Prototype Chain */
/*******************/

/*
 * Property Lookup
 * 1. look on the object itself for that property
 * 2. look on object.__proto__ which is Employee.prototype for example
 * 3. look on chain of prototypes Employee.prototype->Person.prototype->Object.prototype
 *    Employee.prototype.__proto__ === Person.prototype ->
 *    Person.prototype.__proto__ === Object.prototype
 *    or object.__proto__.__proto__
 * 4. performance tip: overwrite properties in the object to keep the lookup path short
 */
johnDoe.__proto__.__proto__.__proto__ === Object.prototype;                   // true
johnDoe.__proto__.__proto__.__proto__.toString === Object.prototype.toString; // true
johnDoe.__proto__.__proto__.__proto__.hasOwnProperty('toString');             // true

/* Example: property lookup */
var lookupPropertyName = 'toString',
  currentLookupTarget = johnDoe;
while (!currentLookupTarget.hasOwnProperty('toString')) {
  if (currentLookupTarget.__proto__ === undefined) { break; }
  currentLookupTarget = currentLookupTarget.__proto__;
}
console.info(currentLookupTarget);
console.info(currentLookupTarget.hasOwnProperty('toString'));

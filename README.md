# Bobject 1.0

Bobject is a helper for creating classes in JavaScript.  It cleans up the prototype mess a bit and leaves you with simpler, more readable code.

## Basic Usage

```javascript
var Animal = new Bobject( {
  constructor: function ( type ) {
    this.type = type;
  },
  getType: function () {
    return this.type;
  }
} );
var donkey = new Animal( 'donkey' );
var type = donkey.getType(); // 'donkey'
```

This isn't doing a whole lot, but it shows the basic setup.  This is the same as if you had done:

```javascript
function Animal ( type ) {
  this.type = type;
}
Animal.prototype = {
  getType: function () {
    return this.type;
  }
};
var donkey = new Animal( 'donkey' );
var type = donkey.getType(); // 'donkey'
```

Along with just cleaning up the syntax a little, Bobject adds some nice features to your classes.

### Inheritance

```javascript
var Animal = new Bobject( {
  constructor: function () {
    this.animal = true;
  }
} );

var Donkey = new Bobject( {
  Extends: Animal,
  constructor: function () {
    this.Super(); // calls the Animal constructor
    this.type = 'donkey';
  }
} );

var donkey = new Donkey();
donkey.animal;  // evaluates to true
donkey.type;    // evaluates to 'donkey'
```

### Bind

One of the problems with OOP in JavaScript is maintaining the 'this' keyword.  This is solved by using $.proxy() in jQuery, or _.bind() in underscore.js.

Bobject provides you with a few options using the ```Bind``` property.

```Boolean (true)```: Binds all functions in the prototype to the object.  
```String```: Binds a single function  
```Array```: An array of strings identifying which functions to bind

```javascript
var Animal = new Bobject( {
  Bind: 'get_type',
  constructor: function ( type ) {
    this.type = type;
  },
  get_type: function () {
    return this.type;
  }
} );
var moose = new Animal( 'moose' );
var get_type_copy = moose.get_type; // Won't work without Bind
get_type_copy();                    // Thanks to Bind, returns 'moose' as expected
```

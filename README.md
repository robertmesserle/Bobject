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

You can


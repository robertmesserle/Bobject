( function () {

  'use strict';

  function BaseObject () {}

  function Args () { this.val = arguments; }
  Args.prototype.constructor = Args;

  function ExtendedArgs () {}
  ExtendedArgs.prototype = new Args();
  ExtendedArgs.prototype.constructor = ExtendedArgs;

  //-- core object

  function Bobject ( obj ) {
    this.Class = function () {
      handle_bind.call( this );
      handle_super.call( this );
      if ( typeof obj.initialize === 'function' ) obj.initialize.apply( this, arguments );
    };
    this.Class.prototype              = this.get_prototype( obj );
    this.Class.prototype.Static       = this.Class.prototype;
    this.Class.prototype.bind         = this.bind;
    this.Class.prototype.constructor  = this.Class;
    this.Class.create                 = this.create;

    each.call( this, obj, function ( key, val ) {
      this.Class.prototype[ key ] = val;
    } );

    if ( obj.Extends ) this.extend( obj.Extends );

    return this.Class;
  };

  Bobject.prototype = {
    get_prototype: function ( obj ) {
      if ( !obj.Extends ) return new BaseObject();
      else if ( obj.Extends instanceof BaseObject ) return new obj.Extends( new ExtendedArgs() );
      else if ( obj.Extends.prototype ) return new obj.Extends();
      else return Object.create( obj.Extends );
    },
    create: function () {
      var obj = new this( new ExtendedArgs() );
      this.apply( obj, arguments );
      return obj;
    },
    bind: function ( method ) {
      return bind( this, method );
    },
    extend: function ( Super ) {
      Super = Super.prototype || Super;
      this.Class.prototype.Super = function () { Super.initialize && Super.initialize.apply( this, arguments ); };
      each.call( this, Super, function ( key, val ) {
        this.Class.prototype.Super[ key ] = val;
      } );
    }
  };

  //-- make object globally accessible

  window.Bobject = Bobject;

  //-- utility functions

  Object.create || ( Object.create = ( function () {
    function Obj () {}
    return function ( proto ) {
      Obj.prototype = proto;
      return new Obj;
    };
  } )() );

  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function forEach(fun /*, thisp*/) {
      var self = toObject(this),
        thisp = arguments[1],
        i = -1,
        length = self.length >>> 0;

      // If no callback function or if callback is not a callable function
      if (_toString(fun) != "[object Function]") {
        throw new TypeError(); // TODO message
      }

      while (++i < length) {
        if (i in self) {
          // Invoke the callback function with call, passing arguments:
          // context, property value, property key, thisArg object context
          fun.call(thisp, self[i], i, self);
        }
      }
    };
  }

  function handle_super () {
    each.call( this, this.Super, function ( key, val ) { this.Super[ key ] = this.bind( val ) } );
  }

  function handle_bind () {
    var methods = [];
    //-- set list of methods
    if ( this.Bind === true )                 methods = this.Static;
    else if ( this.Bind instanceof Array )    methods = this.Bind;
    else if ( typeof this.Bind === 'string' ) methods = [ this.Bind ];
    else return;
    //-- bind methods
    each.call( this, methods, function ( key, val ) {
      if ( methods instanceof Array ) this[ val ] = this.bind( val );
      else this[ key ] = this.bind( val );
    } );
  }

  function bind ( context, method ) {
    switch ( typeof method ) {
      case 'string':    return bind( context, context[ method ] );
      case 'function':  return function () { return method.apply( context, arguments ); };
      default:          return method;
    }
  }

  function each ( obj, callback ) {
    if ( obj instanceof Array ) for ( var i = 0, len = obj.length; i < len; i++ ) callback.call( this, i, obj[ i ] );
    else for ( var key in obj ) if ( obj.hasOwnProperty( key ) ) callback.call( this, key, obj[ key ] );
  }

} )();

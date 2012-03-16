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
    this.Class.prototype        = clone( obj );
    this.Class.prototype.Static = this.Class.prototype;
    this.Class.prototype.bind   = this.bind;
    this.Class.prototype.constructor = this.Class;

    if ( obj.Extends ) this.extend( obj.Extends );

    return this.Class;
  };

  Bobject.prototype = {
    bind: function ( method ) {
      return bind( this, method );
    },
    extend: function ( Super ) {
      Super = Super.prototype || Super;
      this.Class.prototype.Super = function () { Super.initialize && Super.initialize.apply( this, arguments ); };
      each.call( this, Super, function ( key, val ) {
        if ( !this.Class.prototype.hasOwnProperty( key ) ) this.Class.prototype[ key ] = val;
        else this.Class.prototype.Super[ key ] = val;
      } );
    }
  };

  //-- make object globally accessible

  window.Bobject = Bobject;

  //-- utility functions

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

  function clone ( obj ) {
    return typeof obj === 'object' ? clone_object( obj ) : obj;
  }

  function clone_object ( obj ) {
    var ret = obj instanceof Array ? [] : {};
    each( obj, function ( key, val ) {
      if ( typeof val === 'object' ) ret[ key ] = clone( val );
      else ret[ key ] = val;
    } );
    return ret;
  }

} )();

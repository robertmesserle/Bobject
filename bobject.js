( function () {

  window.Bobject = function Bobject ( obj ) {
    this.Class = function () {
      handle_bind.call( this );
      if ( typeof obj.constructor === 'function' ) obj.constructor.apply( this, arguments );
    };
    this.Class.prototype        = clone( obj );
    this.Class.prototype.Static = this.Class.prototype;
    this.Class.prototype.bind   = this.bind;

    if ( obj.Extends ) this.extend( obj.Extends );

    return this.Class;
  };

  Bobject.prototype = {
    bind: function ( method ) {
      return bind( this, method );
    },
    extend: function ( Super ) {
      Super = Super.prototype || Super;
      this.Class.prototype.Super = Super.constructor || {};
      this.each( Super, function ( key, val ) {
        this.Class.prototype.Super[ key ] = val;
        if ( !this.Class.prototype.hasOwnProperty( key ) ) this.Class.prototype[ key ] = val;
      } );
    }
  };

  function handle_bind () {
    console.log( this.Bind );
    var methods = [];
    //-- set list of methods
    if ( this.Bind === true || this.Bind === 'all' )  methods = this.Static;
    else if ( this.Bind instanceof Array )            methods = this.Bind;
    else if ( typeof this.Bind === 'string' )         methods = [ this.Bind ];
    else return;
    console.log( methods, methods instanceof Array );
    //bind methods
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
    var i;
    if ( obj instanceof Array ) for ( i = 0, len = obj.length; i < len; i++ ) callback.call( this, i, obj[ i ] );
    else for ( i in obj ) if ( obj.hasOwnProperty( i ) ) callback.call( this, i, obj[ i ] );
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
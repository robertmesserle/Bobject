describe( 'Bobjects', function () {

  describe( 'Basic Functionality', function () {

    var Animal = new Bobject( {
      constructor: function ( type ) {
        this.type = type;
      }
    } );
    var moose = new Animal( 'moose' );

    it ( 'should have a type of "moose"', function () {
      expect( moose.type ).toBe( 'moose' );
    } );

  } );

  describe( 'Bind', function () {

    describe( 'Bind: true', function () {

      var Animal = new Bobject( {
        Bind: true,
        constructor: function ( type ) { this.type = type; },
        get_type: function () { return this.type; }
      } );
      var moose = new Animal( 'moose' );

      it( 'should have a type of "moose"', function () {
        expect( moose.type ).toBe( 'moose' );
      } );

      it( 'should allow get_type to work out of context', function () {
        var get_type = moose.get_type;
        expect( get_type() ).toBe( 'moose' );
      } );

    } );

    describe( 'Bind: string', function () {

      var Animal = new Bobject( {
        Bind: 'get_type',
        constructor: function ( type ) { this.type = type; },
        get_type: function () { return this.type; }
      } );
      var moose = new Animal( 'moose' );

      it( 'should have a type of "moose"', function () {
        expect( moose.type ).toBe( 'moose' );
      } );

      it( 'should allow get_type to work out of context', function () {
        var get_type = moose.get_type;
        expect( get_type() ).toBe( 'moose' );
      } );

    } );

    describe( 'Bind: [ string ]', function () {

      var Animal = new Bobject( {
        Bind: [ 'get_type' ],
        constructor: function ( type ) { this.type = type; },
        get_type: function () { return this.type; }
      } );
      var moose = new Animal( 'moose' );

      it( 'should have a type of "moose"', function () {
        expect( moose.type ).toBe( 'moose' );
      } );

      it( 'should allow get_type to work out of context', function () {
        var get_type = moose.get_type;
        expect( get_type() ).toBe( 'moose' );
      } );

    } );

  } );

  describe( 'Extends', function () {

    var Animal = new Bobject( {
      constructor: function () {
        this.animal = true;
      },
      set_type: function ( type ) {
        this.type = type;
      },
      get_type: function ( type ) {
        return this.type;
      }
    } );

    var Moose = new Bobject( {
      Extends: Animal,
      constructor: function () {
        this.Super();
        this.type = 'moose';
      },
      get_type: function () {
        return this.Super.get_type();
      }
    } );

    var moose = new Moose();

    it( 'should have a property "animal" set to true', function () {
      expect( moose.animal ).toBe( true );
    } );

    it( 'should have a property "type" set to "moose"', function () {
      expect( moose.type ).toBe( 'moose' );
    } );

    it( 'should allow you to update the type', function () {
      moose.set_type( 'mouse' );
      expect( moose.type ).toBe( 'mouse' );
    } );

    it( 'should allow you to get the type through the Super function', function () {
      expect( moose.get_type() ).toBe( 'mouse' );
    } );

  } );

  describe( 'Static', function () {} );

} );

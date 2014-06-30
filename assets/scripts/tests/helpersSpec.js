define( [ '../modules/helpers' ], function( Helpers ) {

	/**
	 * Helpers::check_null()
	 */
	describe( "Helpers::check_null tests", function() {

		var helpers;

		beforeEach( function() {
			helpers = new Helpers();
		});

		it( "Testing variable with a value", function() {
			var hello = 'World';
			expect( helpers.check_null( hello ) ).toBe( false );
		});

		it( "Testing variable without a value", function() {
			var hello = '';
			expect( helpers.check_null( hello ) ).toBe( true );
		});

		it( "Testing a null variable", function() {
			var hello = null;
			expect( helpers.check_null( hello ) ).toBe( true );
		});

		it( "Testing a false variable", function() {
			var hello = false;
			expect( helpers.check_null( hello ) ).toBe( true );
		});

		it( "Testing a undefined variable", function() {
			var hello;
			expect( helpers.check_null( hello ) ).toBe( true );
		});
	});

	/**
	 * Helpers::rounder()
	 */	
	describe( "Helpers::rounder tests", function() {

		var helpers,
			number,
			decimals;

		beforeEach( function() {
			helpers = new Helpers(),
			number = 1.123456789,
			decimals = 5;
		});

		it( "Testing rounding with the expected output", function() {
			expect( helpers.rounder( number, decimals ) ).toBe( 1.12346 );
		});

		it( "Testing rounding with the unexpected output", function() {
			expect( helpers.rounder( number, decimals ) ).not.toBe( 1.12345 );
		});
	});

	/**
	 * Helpers::ucfirst()
	 */
	describe( "Helpers::ucfirst() tests", function() {

		var helper,
			string = 'hello world';

		beforeEach( function() {
			helper = new Helpers();
		});

		it( "Testing ucfirst with the expected output", function() {
			expect( helper.ucfirst( string ) ).toBe( 'Hello world' );
		});

		it( "Testing ucfirst with the original string", function() {
			expect( helper.ucfirst( string ) ).not.toBe( string );
		});
	});
});
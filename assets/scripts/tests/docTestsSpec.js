define( [ '../modules/doc-test' ], function( Doc_test ) {

	var doc_test;

	describe( 'Testing a ajax call with mock data', function() {

		beforeEach( function() {
			doc_test = new Doc_test();
		});

		it( 'Test our results are returned successfully', function() {

			spyOn( $, 'ajax' ).andCallFake( function( params ) {
				params.success( { results: [{ 'id': '1', 'title': 'Test' }, { 'id': '2', 'title': 'Test 1' }] } );
			});

			doc_test.run_ajax();
			expect( doc_test.result_count ).toBe( 2 );
		});
	});
});

/**
describe( 'This are some test cases', function() {

	var doc_test;

	beforeEach( function() {
		doc_test = new Doc_test();
	});

	it( 'Lets shout', function() {
		expect( doc_test.shout() ).toBe( 'HELLO WORLD!' );
	});

	it( 'Whisper', function() {
		expect( doc_test.whisper() ).toBe( 'hello world!' );
	});

	it( 'Dont say anything', function() {
		expect( doc_test.silent() ).toBe( false );
	});
});

define( 'Toggle tests', function() {

	beforeEach( function() {

		$container = affix( 'div' );

		var elements = [ 'a[href="#"][class="js-toggle"][data-area="to-toggle"]',
						 'div[class="js-to-toggle"][style="display: none;"]' ],
			l = elements.length;

		for( var i = 0; i < l; i++ ) {

			$container.affix( elements[ i ] );
		}

		doc_test = new Doc_test();
	});

	it( 'Test the link is clicked', function() {

		var spy = spyOnEvent( '.js-toggle', 'click' );

		$( '.js-toggle' ).click();

		expect( 'click' ).toHaveBeenTriggeredOn( '.js-toggle' );
	});

	it( 'The target area should now be visible', function() {

		interactions.toggle( { target: $( '.js-toggle' ), preventDefault: function() {} } );

		expect( $( '.js-to-toggle' ) ).toBeVisible();
	});
});
*/
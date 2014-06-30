define( [ '../modules/pagination', '../utils/jquery', '../utils/jasmine-fixture', '../utils/jasmine-jquery' ], function( Pagination ) {

	var pagination,
		$container;

	describe( 'The pagination tests', function() {

		describe( 'Normal pagination calls', function() {

			beforeEach( function() {
				pagination = new Pagination();

				$container = affix( 'div' );
				$container = $container.affix( 'ul#js-pagination' );

				var elements = [ 'li',
								 'li',
								 'li[style="display: none;"]',
								 'li[style="display: none;"]',
								 'li[style="display: none;"]',
								 'li[style="display: none;"]' ],
					l = elements.length;

				for( var i = 0; i < l; i++ ) {
					$container.affix( elements[ i ] );
				}
			});

			it( 'Check the pagination library is instantiated correctly', function() {
				expect( pagination ).toBeDefined();
			});

			it( 'Check the defaults are correctly defined', function() {
				expect( pagination.cache.length ).toBe( 0 );
				expect( pagination.current_page ).toBe( 1 );
				expect( pagination.target_page ).not.toBeDefined();
				expect( pagination.method_type ).toBe( 'ajax' );
			});

			it( 'Check the setter method successfully sets the type to normal', function() {
				pagination.setter( 'method_type', 'normal' );
				expect( pagination.method_type ).toBe( 'normal' );
			});

			it( 'Starting on page one checking the correct items are hid / shown and the current page is incremented by one', function() {
				pagination.setter( 'method_type', 'normal' );
				pagination.move( 2 );

				expect( $( '#js-pagination li:nth-child( 3 )' ) ).toBeVisible();
				expect( $( '#js-pagination li:nth-child( 4 )' ) ).toBeVisible();

				expect( pagination.current_page ).toBe( 2 );
			});

			it( 'Starting on page one checking the correct items are hid / shown and the current page is incremented by two', function() {
				pagination.setter( 'method_type', 'normal' );
				pagination.move( 3 );

				expect( $( '#js-pagination li:nth-child( 5 )' ) ).toBeVisible();
				expect( $( '#js-pagination li:nth-child( 6 )' ) ).toBeVisible();

				expect( pagination.current_page ).toBe( 3 );
			});

			it( 'Starting on page two checking the correct items are hid / shown and the current page is set back to 1', function() {
				pagination.setter( 'method_type', 'normal' );
				pagination.setter( 'current_page', 2 );
				pagination.move( 1 );

				expect( $( '#js-pagination li:nth-child( 1 )' ) ).toBeVisible();
				expect( $( '#js-pagination li:nth-child( 2 )' ) ).toBeVisible();

				expect( pagination.current_page ).toBe( 1 );
			});

			it( 'Try to access a page that does not exist because there are not enough items in the list', function() {
				pagination.setter( 'method_type', 'normal' );
				pagination.move( 5 );

				expect( pagination.error ).toBe( true );
			});
		});

		describe( 'Test AJAX pagination', function() {

			beforeEach( function() {
				pagination = new Pagination();

				$container = affix( 'div' );
				$container = $container.affix( 'ul#js-pagination' );

				var elements = [ 'li',
								 'li' ],
					l = elements.length;

				for( var i = 0; i < l; i++ ) {
					$container.affix( elements[ i ] );
				}
			});

			it( 'Test the second page from AJAX gets loaded correctly', function() {

				spyOn( $, 'ajax' ).andCallFake( function( params ) { 
					if( params.type != 'GET' ) {
						params.success( { status: 200, results: { 'stuff': [{ "id": "1", "title": "Test" }, { "id": "2", "title": "Test 2" }] } } ); 
					}
				});

				pagination.setter( 'template', '{{#stuff}}<li id="id-{{id}}">{{title}}</li>{{/stuff}}' );
				pagination.move( 2 );

				expect( pagination.current_page ).toBe( 2 );
				expect( $( '#js-pagination' ).html() ).toBe( '<li id="id-1">Test</li><li id="id-2">Test 2</li>' );
			});

			it( 'Test the fifth page loads correctly', function() {

				spyOn( $, 'ajax' ).andCallFake( function( params ) {
					if( params.type != 'GET' ) {
						params.success( { status: 200, results: { 'stuff': [ { 'id': '9', 'title': 'Test 9' }, { 'id': '10', 'title': 'Test 10' } ] } } );
					}
				});

				pagination.setter( 'template', '{{#stuff}}<li id="id-{{id}}">{{title}}</li>{{/stuff}}' );
				pagination.move( 5 );

				expect( pagination.current_page ).toBe( 5 );
				expect( $( '#js-pagination' ).html() ).toBe( '<li id="id-9">Test 9</li><li id="id-10">Test 10</li>' );
			});

			it( 'Test that nothing gets returned from the ajax call so the container will be empty but the current page should still increment', function() {

				spyOn( $, 'ajax' ).andCallFake( function( params ) {
					if( params.type != 'GET' ) {
						params.success( { status: 200, results: {} } );
					}
				});

				pagination.setter( 'template', '{{#stuff}}<li id="id-{{id}}">{{title}}</li>{{/stuff}}' );
				pagination.move( 10 );

				expect( pagination.current_page ).toBe( 10 );
				expect( $( '#js-pagination' ).html() ).toBe( '' );
			});
		});
	});
});
define( [ '../modules/infinite_scroll' ], function( Infinity_scroll ) {

	var infinity_scroll,
		$container;

	describe( 'Tests for the infinity scroll module, normal method', function() {

		beforeEach( function() {
			var elements = [ 'li[class="js-list-item-1"]',
							 'li[class="js-list-item-2"]',
							 'li[class="js-list-item-3"][style="display: none;"]',
							 'li[class="js-list-item-4"][style="display: none;"]',
							 'li[class="js-list-item-5"][style="display: none;"]',
							 'li[class="js-list-item-6"][style="display: none;"]' ],
				l = elements.length;

			$container = affix( 'ul[id="js-infinite-scroll"][data-total="6"][data-per-page="2"]' );

			for( var i = 0; i < l; i++ ) {
				$container.affix( elements[ i ] );
			}

			infinity_scroll = new Infinity_scroll();
		});

		describe( 'Trigger the infinity scroll and make sure the list has the correct number of items in it, for the normal method', function() {

			it( 'The number of items in the list should be 4', function() {
				infinity_scroll.more_normal();
				var $items = $( '#js-infinite-scroll' ).children();
				expect( $items.filter( ':visible' ).length ).toBe( 4 );
			});

			it( 'The number of items in the list should be 6', function() {

				//Trigger it twice as it would be in practice
				infinity_scroll.more_normal();
				infinity_scroll.more_normal();
				var $items = $( '#js-infinite-scroll' ).children();
				expect( $items.filter( ':visible' ).length ).toBe( 6 );
			});
		});
	});

	describe( 'Tests for the infinity scroll module, ajax method', function() {

		beforeEach( function() {
			var elements = [ 'li[class="js-list-item-1"]',
							 'li[class="js-list-item-2"]' ],
				l = elements.length;

			$container = affix( 'ul[id="js-infinite-scroll"][data-total="6"][data-per-page="2"][data-template="infinity-scroll-test"]' );

			for( var i = 0; i < l; i++ ) {
				$container.affix( elements[ i ] );
			}

			infinity_scroll = new Infinity_scroll();
		});

		describe( 'Trigger the infinity scroll and make sure the list has the correct number if items in it, for the ajax method', function() {

			it( 'The number of items in the list should be 4', function() {

				spyOn( $, 'ajax' ).andCallFake( function( params ) { 
					if( params.type != 'GET' ) {
						params.success( { status: 200, results: { "results" : [{ "id": "3", "title": "Test 3" }, { "id": "4", "title": "Test 4" }] } } ); 
					}
					else if( params.type == 'GET' ) {
						params.success( '{{#results}}<li class="js-list-item-{{id}}">{{title}}</li>{{/results}}' );
					}
				});

				infinity_scroll.more_ajax();
				expect( $( '#js-infinite-scroll' ).children().length ).toBe( 4 );
			});

			it( 'The number of items in the list should be 6', function() {

				spyOn( $, 'ajax' ).andCallFake( function( params ) { 
					if( params.type != 'GET' ) {
						params.success( { status: 200, results: { "results" : [{ "id": "5", "title": "Test 5" }, { "id": "6", "title": "Test 6" }] } } ); 
					}
					else if( params.type == 'GET' ) {
						params.success( '{{#results}}<li class="js-list-item-{{id}}">{{title}}</li>{{/results}}' );
					}
				});

				infinity_scroll.more_ajax();
				infinity_scroll.more_ajax();
				expect( $( '#js-infinite-scroll' ).children().length ).toBe( 6 );
			});
		});
	});

});
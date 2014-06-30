define( [ '../modules/Interactions', '../utils/jquery', '../utils/jasmine-fixture', '../utils/jasmine-jquery' ], function( Interactions ) {

	var interactions,
		$container;

	describe( 'Container for the interaction tests', function() {

		beforeEach( function() {
			interactions = new Interactions();
		});

		/**
		 * Tests a successful toggle method
		 */
		describe( 'Tests for the toggle method', function() {

			beforeEach( function() {

				$container = affix( 'div' );
				var elements = [ 'a[href="#"][class="js-toggle"][data-area="to-toggle"]',
								 'div[class="js-to-toggle"][style="display: none;"]' ],
					l = elements.length;

				for( var i = 0; i < l; i++ ) {
					$container.affix( elements[ i ] );
				}
			});

			it( 'Test the link is clicked', function() {

				var spy = spyOnEvent( '.js-toggle', 'click' );
				$( '.js-toggle' ).click();
				expect( 'click' ).toHaveBeenTriggeredOn( '.js-toggle' );
			});

			/**
			 * We can't get the click event information for some reason
			 * So I well pass through a object containing only the info we need
			 * Mainly it will be the target
			 */
			it( 'The target area should now be visible', function() {

				interactions.toggle( { target: $( '.js-toggle' ), preventDefault: function() {} } );
				expect( $( '.js-to-toggle' ) ).toBeVisible();
			});

			it( 'If the click event doesnt have a data-area attribute, also expect the hidden div is still hidden', function() {
				$( '.js-toggle' ).removeAttr( 'data-area' );
				interactions.toggle( { target: $( '.js-toggle' ), preventDefault: function() {}} );

				expect( interactions.error ).toBe( true );
				expect( $( '.js-to-toggle' ) ).not.toBeVisible();
			});

			it( 'If the area to toggle isnt in the DOM then the interaction error should be true', function() {
				$( '.js-to-toggle' ).remove();
				interactions.toggle( { target: $( '.js-toggle' ), preventDefault: function() {} } );

				expect( interactions.error ).toBe( true );
			});
		});

		/**
		 * Tests for a successful slideToggle method
		 *
		 * We cant actually test the slide animation is being run successfully but
		 * we can determine if the target div is visible.
		 */
		describe( 'Tests for a successful slideToggle method', function() {

			var $container;

			beforeEach( function() {

				$container = affix( 'div' );
				var elements = [ 'a[href="#"][class="js-slide-toggle"][data-area="to-slide-toggle"]',
								 'div[class="js-to-slide-toggle"][style="display: none;"]' ],
					l = elements.length;
				for( var i = 0; i < l; i++ ) {
					$container.affix( elements[ i ] );
				}
			});

			it( 'Test the link is clicked', function() {
				var spy = spyOnEvent( '.js-slide-toggle', 'click' );
				$( '.js-slide-toggle' ).click();

				expect( 'click' ).toHaveBeenTriggeredOn( '.js-slide-toggle' );
			});

			it( 'Test the slide toggle area is visible', function() {
				interactions.slide_toggle( { target: $( '.js-slide-toggle' ) } );

				expect( interactions.error ).toBe( false );
				expect( $( '.js-to-slide-toggle' ) ).toBeVisible();
			});

			it( 'Test the interaction error is true if the button does not have target area', function() {
				$( '.js-slide-toggle' ).removeAttr( 'data-area' );
				interactions.slide_toggle( { target: $( '.js-slide-toggle' ) } );

				expect( interactions.error ).toBe( true );
			});

			it( 'Test the interaction error is true if the target area is not present on the DOM', function() {
				$( '.js-to-slide-toggle' ).remove();
				interactions.slide_toggle( { target: $( '.js-slide-toggle' ) } );

				expect( interactions.error ).toBe( true );
			});
		});
	});
});
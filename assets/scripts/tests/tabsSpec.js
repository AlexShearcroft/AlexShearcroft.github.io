define( [ '../modules/tabs' ], function( Tabs ) {

	var tabs,
		$container;

	describe( 'Testing the tabs class', function() {

		beforeEach( function() {
			$container = affix( 'div[id="container"]' );

			var elements = [ 'a[class="js-tabs"][data-area="online"]',
							 'div[id="js-tab-online"][style="display: none;"]',
							 'a[class="js-tabs"][data-area="offline"]',
							 'div[id="js-tab-offline"][style="display: none;"]',
							 'a[class="js-tabs"][data-area="pending"]',
							 'div[id="js-tab-pending"][style="display: none;"]' ],
				l = elements.length;

			for( var i = 0; i < l; i++ ) {
				$container.affix( elements[ i ] );
			}

			tabs = new Tabs();
		});

		describe( 'Testing the first tab is shown by default on page load', function() {

			it( 'The first tab should be visible', function() {
				expect( $( '#js-tab-online' ) ).toBeVisible();
			});
		});

		describe( 'Testing various scenarios that a error could occur', function() {

			it( 'The tabs error property should be true if we try and change the tab to one that doesnt exist', function() {
				tabs.current_tab = 'unknown';
				tabs.change();

				expect( tabs.error ).toBe( true );
			});

			it( 'If there is not a current tab we should get an error and the original tab should still be visible', function() {
				tabs.current_tab = '';
				tabs.change();

				expect( tabs.error ).toBe( true );
				expect( $( '#js-tab-online' ) ).toBeVisible();
			});
		});

		describe( 'Changing tabs', function() {

			it( 'Make sure changing tabs hides the old tab and displays the new one, error should also be false', function() {

				tabs.current_tab = 'pending';
				tabs.change();

				expect( tabs.error ).toBe( false );
				expect( $( '#js-tab-pending' ) ).toBeVisible();
				expect( $( '#js-tab-online' ) ).not.toBeVisible();
			});
		});
	});

});
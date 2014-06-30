define( [ '../modules/templates', '../utils/jquery', '../utils/jasmine-fixture', '../utils/jasmine-jquery' ], function( Templates ) {

	var templates;

	describe( 'The templates tests', function() {

		beforeEach( function() {
			templates = new Templates();
		});

		it( 'Testing the object can actually be instantiated', function() {
			expect( templates ).toBeDefined();
		});

		describe( 'Make sure template can be called in', function() {

			/**
			 * To test AJAX calls that we need to actually test the return
			 * we need to do in the following manner.
			 *
			 * We need to spy on the AJAX call and then pass in the expected data.
			 * I don't think we can actually run the actual AJAX request.
			 *
			 * This technique requires no modification of the AJAX call.
			 */
			it( 'Getting a test template and testing if it is defined', function() {

				spyOn( $, 'ajax' ).andCallFake( function( params ) { 
					params.success( '<div><p>{{test}}</p></div>' ); 
				});
				templates.get( 'test' );

				expect( templates.template ).toBeDefined();
			});
		});

		describe( 'Make sure the template can be compiled correctly with different data types', function() {

			it( 'Single string', function() {
				//Mock the template
				templates.template = '<div><p>{{test}}</p></div>';
				expect( templates.compile( 'test', { test: 'Hello World!' } ) ).toBe( '<div><p>Hello World!</p></div>' );
			});

			it( 'Multiple string', function() {
				templates.template = '<div><p>{{foo}}</p><p>{{bar}}</p></div>';
				expect( templates.compile( 'test', { foo: 'Hello', bar: 'World' } ) ).toBe( '<div><p>Hello</p><p>World</p></div>' );
			});

			it( 'Array loop', function() {
				templates.template = '<div>{{#stuff}}<p>{{item}}</p>{{/stuff}}</div>';
				expect( templates.compile( 'test', { 'stuff': [ { item: 'This' }, { item: 'is' }, { item: 'a' }, { item: 'test' } ] } ) ).toBe( '<div><p>This</p><p>is</p><p>a</p><p>test</p></div>' );
			});

			it( 'If statement', function() {
				templates.template = '<div>{{#name}}<p>{{name}}</p>{{/name}}</div>';
				expect( templates.compile( 'test', { name: 'Dave' } ) ).toBe( '<div><p>Dave</p></div>' );
			});

			it( 'If not exists', function() {
				templates.template = '<div>{{^name}}<p>This should be visible.</p>{{/name}}</div>';
				expect( templates.compile( 'test', {} ) ).toBe( '<div><p>This should be visible.</p></div>' );
			});

			it( 'A string with a comment', function() {
				templates.template = '<div><p>{{name}}</p>{{! this should not be visible}}</div>';
				expect( templates.compile( 'test', { name: 'Dave' } ) ).toBe( '<div><p>Dave</p></div>' );
			});
		});
	});
});